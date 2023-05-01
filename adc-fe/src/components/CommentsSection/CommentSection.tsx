import { useAuth0 } from '@auth0/auth0-react';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LinearProgress from '@mui/material/LinearProgress';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useMutation, useQuery } from 'react-query';
import TimeAgo from 'timeago-react';

import { COMMENT_LIMIT_PER_PAGE, POST_LIMIT_PER_PAGE } from '../../common/const';
import { Entity } from '../../interface/api-interface';
import {
  CommentViewResponse,
  LikeCommentManageService,
  PostResponse,
} from '../../service/Api';
import { StyledButton } from '../../styled-global/global-styled-components';
import {
  CommentAvatar,
  CommentDivider,
  CommentsContainer,
  CommentsPaper,
  CommentTextField,
} from './CommentSection.style';

export interface CommentSectionProps {
  post: PostResponse;
}

export default function CommentSection({ post }: CommentSectionProps) {
  const [offset, setOffset] = React.useState<number>(0);
  const [currentComments, setCurrentComments] = React.useState<CommentViewResponse[]>([]);
  const [text, setText] = React.useState<string>('');
  const { user } = useAuth0();

  const { data: comments, isLoading: isLoadingPost } = useQuery(
    [Entity.Comment, offset],
    () => LikeCommentManageService.getNewestComments(COMMENT_LIMIT_PER_PAGE, offset),
    {
      onError: console.log,
      onSuccess: (comments) =>
        setCurrentComments((prevState) => [...prevState, ...comments]),
      refetchOnWindowFocus: false,
    },
  );

  const { mutate } = useMutation(
    [Entity.Comment],
    (postId: number) =>
      LikeCommentManageService.createComment({
        text,
        postId,
      }),
    {
      onError: console.log,
    },
  );

  return (
    <CommentsContainer>
      <Stack alignItems='end'>
        <CommentTextField
          value={text}
          onChange={(event) => setText(event.target.value)}
        />
        <StyledButton>Comment</StyledButton>
      </Stack>

      <Typography variant='h5'>Commentaries</Typography>

      <CommentsPaper>
        <InfiniteScroll
          next={() => setOffset((prevOffset) => prevOffset + COMMENT_LIMIT_PER_PAGE)}
          hasMore={(comments || []).length === COMMENT_LIMIT_PER_PAGE}
          loader={<LinearProgress />}
          dataLength={currentComments.length}
        >
          {currentComments.length > 0 &&
            currentComments.map((comment, key) => (
              <Box key={key}>
                <Grid container wrap='nowrap' spacing={2}>
                  <Grid item>
                    <CommentAvatar>
                      <PermIdentityIcon />
                    </CommentAvatar>
                  </Grid>
                  <Grid justifyContent='left' item xs zeroMinWidth>
                    <Typography variant='h5'>
                      {comment.user.firstName} {comment.user.lastName}
                    </Typography>
                    <Typography variant='body1'>{comment.text}</Typography>
                    <Typography variant='subtitle1' color='secondary'>
                      <TimeAgo datetime={comment.createdAt} />
                    </Typography>
                  </Grid>
                </Grid>
                <CommentDivider />
              </Box>
            ))}
        </InfiniteScroll>
      </CommentsPaper>

      <Typography></Typography>
    </CommentsContainer>
  );
}
