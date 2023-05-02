import { useAuth0 } from '@auth0/auth0-react';
import LinearProgress from '@mui/material/LinearProgress';
import Tab from '@mui/material/Tab';
import React, { useCallback } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useMutation, useQuery } from 'react-query';

import { POST_LIMIT_PER_PAGE } from '../../common/const';
import PostCard from '../../components/PostCard';
import { useNotificationOnError } from '../../hooks/notification/useNotificationBar';
import { Entity } from '../../interface/api-interface';
import { TabType } from '../../interface/common';
import { LikeCommentManageService, PostResponse, PostService } from '../../service/Api';
import { PageContainer } from '../../styled-global/global-styled-components';
import { ColoredTabs, PostsContainer } from './PostList.style';

export default function PostList() {
  const [tabIndex, setTabIndex] = React.useState<TabType>(TabType.Newest);
  const [offset, setOffset] = React.useState<number>(0);
  const [currentPosts, setCurrentPosts] = React.useState<PostResponse[]>([]);
  const { user } = useAuth0();

  const { data: posts, isLoading: isPostsLoading } = useQuery(
    [Entity.PostView, offset],
    () => PostService.getNewest(POST_LIMIT_PER_PAGE, offset),
    {
      onError: useNotificationOnError(),
      onSuccess: (posts) => setCurrentPosts((prevPosts) => [...prevPosts, ...posts]),
      refetchOnWindowFocus: false,
    },
  );

  const { mutate: addLike, isLoading: isLoadingLikes } = useMutation(
    [Entity.Like],
    (postId: number) => LikeCommentManageService.addLike({ postId }),
    { onError: useNotificationOnError() },
  );

  const { mutate: deleteLike } = useMutation(
    [Entity.Like],
    (postId: number) => LikeCommentManageService.deleteLike({ postId }),
    { onError: useNotificationOnError() },
  );

  const togglePostLike = useCallback(
    (postId: number) => {
      setCurrentPosts((prevState) => {
        const post = prevState.find((post) => post.id === postId);
        if (post) {
          const likeIndex = post.likes.findIndex((like) => like.userId);
          if (likeIndex != -1) {
            deleteLike(postId);
            post.likes.splice(likeIndex, 1);
          } else {
            addLike(postId);
            post.likes.push({ id: 0, postId, userId: user?.sub || '' });
          }
        }
        return [...prevState];
      });
    },
    [currentPosts],
  );

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  return (
    <PageContainer>
      <ColoredTabs value={tabIndex} onChange={handleChange}>
        <Tab label='Newest' value={TabType.Newest} />
        <Tab label='Popular' value={TabType.Popular} />
      </ColoredTabs>

      <PostsContainer>
        <InfiniteScroll
          next={() => setOffset((prevOffset) => prevOffset + POST_LIMIT_PER_PAGE)}
          hasMore={(posts || []).length + 1 === POST_LIMIT_PER_PAGE}
          endMessage={'You have reached the bottom of the page :)'}
          loader={<LinearProgress />}
          dataLength={currentPosts.length}
        >
          {currentPosts.length > 0 &&
            currentPosts.map((post, key) => (
              <PostCard
                post={post}
                key={key}
                userSub={user?.sub || ''}
                togglePostLike={togglePostLike}
              />
            ))}
        </InfiniteScroll>
      </PostsContainer>
    </PageContainer>
  );
}
