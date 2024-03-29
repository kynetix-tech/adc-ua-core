import { useAuth0 } from '@auth0/auth0-react';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import LinearProgress from '@mui/material/LinearProgress';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import TimeAgo from 'timeago-react';

import { COMMENT_LIMIT_PER_PAGE } from '../../common/const';
import { useNotificationOnError } from '../../hooks/notification/useNotificationBar';
import { Entity } from '../../interface/api-interface';
import { CommentViewResponse, LikeCommentManageService } from '../../service/Api';
import { StyledButton } from '../../styled-global/global-styled-components';
import {
  CommentAvatar,
  CommentDivider,
  CommentsContainer,
  CommentsPaper,
  CommentTextField,
} from './CommentSection.style';

export interface CommentSectionProps {
  postId: number;
}

export default function CommentSection({ postId }: CommentSectionProps) {
  const [offset, setOffset] = React.useState<number>(0);
  const [currentComments, setCurrentComments] = React.useState<CommentViewResponse[]>([]);
  const [text, setText] = React.useState<string>('');
  const queryClient = useQueryClient();
  const { user } = useAuth0();

  const { data: comments, isLoading: isLoadingPost } = useQuery(
    [Entity.Comment, offset],
    () =>
      LikeCommentManageService.getNewestComments(postId, COMMENT_LIMIT_PER_PAGE, offset),
    {
      onError: useNotificationOnError(),
      onSuccess: (comments) => {
        setCurrentComments((prevState) =>
          [
            ...new Map(
              [...prevState, ...comments].map((item) => [item.id, item]),
            ).values(),
          ].sort((commA, commB) => commB.id - commA.id),
        );
      },
      refetchOnWindowFocus: false,
    },
  );

  const { mutate: createComment } = useMutation(
    [Entity.Comment],
    (postId: number) =>
      LikeCommentManageService.createComment({
        text,
        postId,
      }),
    {
      onError: useNotificationOnError(),
      onSettled: () => queryClient.invalidateQueries(Entity.Comment),
    },
  );

  const { mutate: deleteComment } = useMutation(
    [Entity.Comment],
    (commentId: number) =>
      LikeCommentManageService.deleteComment({
        commentId,
      }),
    {
      onError: useNotificationOnError(),
    },
  );

  return (
    <CommentsContainer>
      <Stack alignItems='end'>
        <CommentTextField
          value={text}
          onChange={(event) => setText(event.target.value)}
        />
        <StyledButton
          onClick={() => {
            if (text) {
              createComment(postId);
              setText('');
            }
          }}
        >
          Comment
        </StyledButton>
      </Stack>

      <Typography variant='h5'>Commentaries</Typography>

      <CommentsPaper>
        <InfiniteScroll
          next={() => setOffset((prevOffset) => prevOffset + COMMENT_LIMIT_PER_PAGE)}
          hasMore={(comments || []).length === COMMENT_LIMIT_PER_PAGE}
          endMessage={'No more comments :)'}
          loader={<LinearProgress />}
          dataLength={currentComments.length}
        >
          {currentComments.length > 0 &&
            currentComments.map((comment, key) => (
              <Box key={key}>
                <Grid container wrap='nowrap' spacing={2} alignItems='center'>
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
                      <TimeAgo live={false} datetime={comment.createdAt} />
                    </Typography>
                  </Grid>
                  {user?.sub === comment.user.id && (
                    <Grid item>
                      <IconButton
                        onClick={() => {
                          deleteComment(comment.id);
                          setCurrentComments((prevState) =>
                            prevState.filter((item) => item.id !== comment.id),
                          );
                        }}
                      >
                        <HighlightOffIcon />
                      </IconButton>
                    </Grid>
                  )}
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
