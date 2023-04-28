import { useAuth0 } from '@auth0/auth0-react';
import LinearProgress from '@mui/material/LinearProgress';
import Tab from '@mui/material/Tab';
import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useQuery } from 'react-query';

import { POST_LIMIT_PER_PAGE } from '../../common/const';
import PostCard from '../../components/PostCard';
import { Entity } from '../../interface/api-interface';
import { TabType } from '../../interface/common';
import { PostResponse, PostService } from '../../service/Api';
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
      onError: console.log,
      refetchOnWindowFocus: false,
      onSuccess: (posts) => setCurrentPosts((prevPosts) => [...prevPosts, ...posts]),
    },
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
          hasMore={(posts || []).length === POST_LIMIT_PER_PAGE}
          endMessage={'You have reached the bottom of the page :)'}
          loader={<LinearProgress />}
          dataLength={currentPosts.length}
        >
          {currentPosts.length > 0 &&
            currentPosts.map((post, key) => (
              <PostCard post={post} key={key} userSub={user?.sub || ''} />
            ))}
        </InfiniteScroll>
      </PostsContainer>
    </PageContainer>
  );
}
