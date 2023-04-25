import Tab from '@mui/material/Tab';
import React from 'react';
import { useQuery } from 'react-query';

import PostCard from '../../components/PostCard';
import { Entity } from '../../interface/api-interface';
import { TabType } from '../../interface/common';
import { PostService } from '../../service/Api';
import { PageContainer } from '../../styled-global/global-styled-components';
import { ColoredTabs, PostsContainer } from './Home.style';

export default function Home() {
  const [tabIndex, setTabIndex] = React.useState<TabType>(TabType.Newest);

  const { data: posts, isLoading: isPostsLoading } = useQuery(
    [Entity.PostView],
    () => PostService.getNewest(40, 0),
    {
      onError: console.log,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    },
  );

  console.log(posts);

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
        {posts &&
          posts.map((post) => <PostCard post={post} key={post.id} admin={false} />)}
      </PostsContainer>
    </PageContainer>
  );
}
