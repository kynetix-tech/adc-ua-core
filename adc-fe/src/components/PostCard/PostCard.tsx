import path from 'node:path';

import { useAuth0 } from '@auth0/auth0-react';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PersonIcon from '@mui/icons-material/Person';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import { Stack, Tooltip } from '@mui/material';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import React, { useMemo } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router';
import TimeAgo from 'timeago-react';

import { paths } from '../../App.router';
import { MEDIA_PATH, TEXT_PREVIEW_MAX_LEN } from '../../common/const';
import { useNotificationOnError } from '../../hooks/notification/useNotificationBar';
import { Entity } from '../../interface/api-interface';
import { ContentTypes } from '../../interface/common';
import { PostResponse, PostService } from '../../service/Api';
import { StyledButton } from '../../styled-global/global-styled-components';
import {
  CardContentRel,
  CardControlsFlexBox,
  CardMediaImg,
  CardTextBox,
  FlexCard,
} from './PostCard.style';

export interface PostCardProps {
  post: PostResponse;
  userSub: string;
  togglePostLike: (postId: number) => void;
  onDeletedPost: (postId: number) => void;
}

export default function PostCard({
  post,
  userSub,
  togglePostLike,
  onDeletedPost,
}: PostCardProps) {
  const contentPreviewImg = post.content.find((item) => item.type === ContentTypes.Img);
  const navigate = useNavigate();
  const { user } = useAuth0();
  const queryClient = useQueryClient();

  const cardMediaPreview = contentPreviewImg
    ? `${MEDIA_PATH}/${contentPreviewImg.content}`
    : path.join('src', 'assets', 'img', 'no-image.png');

  const postContentTextPreview = post.content.find(
    (item) => item.type === ContentTypes.Text,
  );

  const postLastTime = useMemo(
    () => new Date(post.updatedAt ? post.updatedAt : post.createdAt),
    [post],
  );
  const isOwner = useMemo(() => userSub === post.user.id, [userSub, post]);

  const { mutate: deletePost } = useMutation(
    [Entity.PostView],
    () => PostService.deletePost(post.id),
    {
      onError: useNotificationOnError(),
      onSettled: () => onDeletedPost(post.id),
    },
  );

  return (
    <FlexCard
      onClick={() =>
        navigate(path.join(paths.post.root, paths.post.view.root, `${post.id}`))
      }
    >
      <CardContentRel>
        <Stack direction='row' gap={1}>
          <PersonIcon />
          <Typography variant='h6'>{`${post.user.lastName} ${post.user.firstName}`}</Typography>
          <QueryBuilderIcon />

          <Tooltip
            title={`${postLastTime.toDateString()} ${postLastTime.toLocaleTimeString()}`}
          >
            <Typography variant='h6'>
              <TimeAgo live={false} datetime={postLastTime} />
            </Typography>
          </Tooltip>
        </Stack>

        <Divider />

        <CardTextBox>
          <Typography variant='h4'>{post.title}</Typography>
          <Typography variant='subtitle1'>
            {(postContentTextPreview?.content.slice(0, TEXT_PREVIEW_MAX_LEN) || '') +
              '...'}
          </Typography>
        </CardTextBox>

        <CardControlsFlexBox>
          <StyledButton
            onClick={(event) => {
              event.stopPropagation();
              togglePostLike(post.id);
            }}
            startIcon={
              post.likes.find((item) => item.userId === user?.sub) ? (
                <FavoriteIcon />
              ) : (
                <FavoriteBorderIcon />
              )
            }
          >
            {post.likes.length}
          </StyledButton>

          {isOwner && (
            <>
              <IconButton
                onClick={(event) => {
                  event.stopPropagation();
                  navigate(
                    path.join(paths.post.root, paths.post.edit.root, `${post.id}`),
                  );
                }}
              >
                <EditOutlinedIcon />
              </IconButton>
              <IconButton
                onClick={(event) => {
                  event.stopPropagation();
                  deletePost();
                }}
              >
                <DeleteOutlineIcon />
              </IconButton>
            </>
          )}
        </CardControlsFlexBox>
      </CardContentRel>
      <CardMediaImg image={cardMediaPreview} />
    </FlexCard>
  );
}
