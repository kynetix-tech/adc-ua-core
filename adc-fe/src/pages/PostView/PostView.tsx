import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DriveEtaOutlinedIcon from '@mui/icons-material/DriveEtaOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import { Divider, Stack } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { join } from 'path';
import React from 'react';
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router';

import { paths } from '../../App.router';
import { Entity } from '../../interface/api-interface';
import { PostService } from '../../service/Api';
import { PageContainer } from '../../styled-global/global-styled-components';
import {
  IconAbsoluteContainer,
  IconTypographyContainer,
  PostViewStack,
} from './PostView.style';

export default function PostView() {
  const { postId } = useParams();
  const navigate = useNavigate();

  const { data: post, isLoading: isLoadingPost } = useQuery(
    [Entity.PostView],
    () => PostService.getPostById(parseInt(postId || '0')),
    { onError: console.log, refetchOnWindowFocus: false },
  );

  console.log(post);

  return (
    <PageContainer>
      <PostViewStack direction='row'>
        <IconButton onClick={() => navigate(join(paths.default))}>
          <ArrowBackIcon />
        </IconButton>

        <Typography variant='h4'>{post?.title}</Typography>
      </PostViewStack>

      <Divider />
      <PostViewStack direction='row'>
        <IconTypographyContainer variant='h5'>
          <IconAbsoluteContainer>
            <PersonOutlineOutlinedIcon />
          </IconAbsoluteContainer>

          {`${post?.user.lastName} ${post?.user.firstName}`}
        </IconTypographyContainer>

        <IconTypographyContainer variant='h5'>
          <IconAbsoluteContainer>
            <DriveEtaOutlinedIcon />
          </IconAbsoluteContainer>

          {`${post?.carMake.title} ${post?.carModel.title} ${post?.carYear}`}
        </IconTypographyContainer>
      </PostViewStack>

      <Divider />
    </PageContainer>
  );
}
