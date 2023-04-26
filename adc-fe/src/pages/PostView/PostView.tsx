import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router';

import { Entity } from '../../interface/api-interface';
import { PostService } from '../../service/Api';

export default function PostView() {
  const { postId } = useParams();

  const { data: post, isLoading: isLoadingPost } = useQuery(
    [Entity.PostView],
    () => PostService.getPostById(parseInt(postId || '0')),
    { onError: console.log, refetchOnWindowFocus: false, refetchOnMount: false },
  );

  console.log(post);

  return <></>;
}
