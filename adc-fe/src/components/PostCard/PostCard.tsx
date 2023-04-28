import path from 'node:path';

import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import PersonIcon from '@mui/icons-material/Person';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import { Stack } from '@mui/material';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import React, { useMemo } from 'react';
import { useNavigate } from 'react-router';

import { paths } from '../../App.router';
import { TEXT_PREVIEW_MAX_LEN } from '../../common/const';
import { ContentTypes } from '../../interface/common';
import { PostResponse } from '../../service/Api';
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
}

export default function PostCard({ post, userSub }: PostCardProps) {
  const contentPreviewImg = post.content.find((item) => item.type === ContentTypes.Img);
  const navigate = useNavigate();

  const cardMediaPreview = contentPreviewImg
    ? contentPreviewImg.content
    : path.join('src', 'assets', 'img', 'no-image.png');

  const postContentTextPreview = post.content.find(
    (item) => item.type === ContentTypes.Text,
  );

  const postLastTime = useMemo(
    () => new Date(post.updatedAt ? post.updatedAt : post.createdAt),
    [post],
  );
  const isOwner = useMemo(() => userSub === post.user.id, [userSub, post]);

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
          <Typography variant='h6'>{`${postLastTime.toDateString()} ${postLastTime.toLocaleTimeString()}`}</Typography>
        </Stack>

        <Divider />

        <CardTextBox>
          <Typography variant='h4'>{post.title}</Typography>
          <Typography variant='subtitle1'>
            {postContentTextPreview?.content.slice(0, TEXT_PREVIEW_MAX_LEN) + '...'}
          </Typography>
        </CardTextBox>

        <CardControlsFlexBox>
          <IconButton onClick={(event) => event.stopPropagation()}>
            <FavoriteBorderIcon />
          </IconButton>
          <IconButton onClick={(event) => event.stopPropagation()}>
            <ModeCommentOutlinedIcon />
          </IconButton>
          {isOwner && (
            <IconButton onClick={(event) => event.stopPropagation()}>
              <EditOutlinedIcon />
            </IconButton>
          )}
        </CardControlsFlexBox>
      </CardContentRel>
      <CardMediaImg image={cardMediaPreview} />
    </FlexCard>
  );
}
