import { useMemo } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router';

import { useNotificationOnError } from '../../hooks/notification/useNotificationBar';
import { Entity } from '../../interface/api-interface';
import { PostService } from '../../service/Api';
import PostCreateEdit from '../PostCreateEdit';

export default function PostEditWrapper() {
  const { postId } = useParams();

  const postIdInt = useMemo(() => parseInt(postId || ''), [postId]);
  const { data: post, isLoading: isLoadingPostForEdit } = useQuery(
    [Entity.PostView],
    () => (postIdInt ? PostService.getPostById(postIdInt) : undefined),
    {
      onError: useNotificationOnError(),
      refetchOnWindowFocus: false,
    },
  );

  return <PostCreateEdit post={post} />;
}
