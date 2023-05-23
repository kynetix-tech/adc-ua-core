import { useAuth0 } from '@auth0/auth0-react';
import SearchIcon from '@mui/icons-material/Search';
import Divider from '@mui/material/Divider';
import InputAdornment from '@mui/material/InputAdornment';
import LinearProgress from '@mui/material/LinearProgress';
import Tab from '@mui/material/Tab';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React, { useCallback } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useMutation, useQuery, useQueryClient } from 'react-query';

import { POST_LIMIT_PER_PAGE } from '../../common/const';
import PostCard from '../../components/PostCard';
import { useNotificationOnError } from '../../hooks/notification/useNotificationBar';
import { Entity } from '../../interface/api-interface';
import { AutocompleteType, TabType } from '../../interface/common';
import {
  CarSpecificationService,
  LikeCommentManageService,
  PostResponse,
  PostService,
} from '../../service/Api';
import {
  PageContainer,
  StyledButton,
} from '../../styled-global/global-styled-components';
import {
  AutoCompleteFilter,
  ColoredTabs,
  PostsContainer,
  StickyContainer,
} from './PostList.style';

export default function PostList() {
  const [tabIndex, setTabIndex] = React.useState<TabType>(TabType.Newest);
  const [offset, setOffset] = React.useState<number>(0);
  const [currentPosts, setCurrentPosts] = React.useState<PostResponse[]>([]);
  const [filterMake, setFilterMake] = React.useState<AutocompleteType>(null);
  const [filterModel, setFilterModel] = React.useState<AutocompleteType>(null);
  const [searchStr, setSearchStr] = React.useState<string>('');
  const { user } = useAuth0();

  const { data: posts, isLoading: isPostsLoading } = useQuery(
    [Entity.PostView, offset],
    () =>
      PostService.getNewest(
        filterMake?.id,
        filterModel?.id,
        POST_LIMIT_PER_PAGE,
        offset,
        searchStr,
      ),
    {
      onError: useNotificationOnError(),
      onSuccess: (posts) =>
        setCurrentPosts((prevPosts) => [
          ...new Map([...prevPosts, ...posts].map((item) => [item.id, item])).values(),
        ]),
      refetchOnWindowFocus: false,
    },
  );

  const { mutate: addFilters } = useMutation(
    [Entity.PostView],
    () =>
      PostService.getNewest(
        filterMake?.id,
        filterModel?.id,
        POST_LIMIT_PER_PAGE,
        0,
        searchStr,
      ),
    {
      onError: useNotificationOnError(),
      onSettled: (posts) => {
        if (posts) {
          setCurrentPosts(posts);
          setOffset(0);
        }
      },
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

  const { data: makes, isLoading: isLoadingMakes } = useQuery(
    [Entity.CarMake],
    () => CarSpecificationService.getCarMakesBySearchStr(),
    {
      onError: useNotificationOnError(),
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    },
  );

  const { data: models, isLoading: isLoadingModels } = useQuery(
    [Entity.CarModel, filterMake],
    () => (filterMake ? CarSpecificationService.getCarModelByMake(filterMake.id) : []),
    {
      onError: useNotificationOnError(),
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    },
  );

  const togglePostLike = useCallback(
    (postId: number) => {
      setCurrentPosts((prevState) => {
        const post = prevState.find((post) => post.id === postId);
        if (post) {
          const likeIndex = post.likes.findIndex((like) => like.userId === user?.sub);
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

  const onDeletedPost = useCallback(
    (postId: number) => {
      setCurrentPosts((prevState) => prevState.filter((item) => item.id !== postId));
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
          hasMore={(posts || []).length >= POST_LIMIT_PER_PAGE - 1}
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
                onDeletedPost={onDeletedPost}
              />
            ))}
        </InfiniteScroll>

        <StickyContainer>
          <Typography variant={'h5'}>Filter</Typography>
          <Divider />

          <TextField
            value={searchStr}
            onChange={(event) => {
              setSearchStr(event.target.value);
            }}
            label='Search'
            variant='filled'
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />

          <AutoCompleteFilter
            value={filterMake}
            onChange={(event: React.SyntheticEvent, newValue: any) => {
              setFilterMake((prevState) => {
                if (!newValue || (newValue && prevState?.id != newValue.id))
                  setFilterModel(null);
                return newValue;
              });
            }}
            disablePortal
            options={
              makes ? makes.map((item) => ({ id: item.id, label: item.title })) : []
            }
            renderInput={(params) => (
              <TextField {...params} variant='filled' label='Car make' required={false} />
            )}
          />

          <AutoCompleteFilter
            value={filterModel}
            onChange={(event: React.SyntheticEvent, newValue: any) => {
              setFilterModel(newValue);
            }}
            disablePortal
            options={
              models ? models.map((item) => ({ id: item.id, label: item.title })) : []
            }
            renderInput={(params) => (
              <TextField {...params} variant='filled' label='Car model' />
            )}
          />

          <StyledButton onClick={() => addFilters()}>Submit</StyledButton>
          <StyledButton
            onClick={() => {
              setSearchStr('');
              setFilterMake(null);
              setFilterModel(null);
            }}
          >
            Reset
          </StyledButton>
        </StickyContainer>
      </PostsContainer>
    </PageContainer>
  );
}
