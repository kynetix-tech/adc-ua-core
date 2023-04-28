import { useAuth0 } from '@auth0/auth0-react';
import Typography from '@mui/material/Typography';
import React, { useMemo } from 'react';
import { useQuery } from 'react-query';
import { Navigate } from 'react-router';

import { paths } from '../../App.router';
import logo from '../../assets/logos/ADC_ animated.gif';
import { AnimatedText } from '../../components/AnimatedText';
import UserRegisterInfoForm from '../../components/UserRegisterInfoForm';
import { Entity } from '../../interface/api-interface';
import { UsersService } from '../../service/Api';
import {
  CenteredContainer,
  ImgLogo,
  LoginButton,
  TextContainer,
} from './IntroLogin.style';

export default function IntroLogin() {
  const { loginWithRedirect, isAuthenticated, isLoading: isLoadingAuth0 } = useAuth0();
  const { data: user, isLoading: isLoadingServer } = useQuery(
    [Entity.User],
    () => UsersService.getCurrentUser(),
    {
      onError: console.log,
    },
  );

  const isRegisterUser = useMemo(
    () => !(isLoadingServer || isLoadingAuth0) && isAuthenticated && user,
    [isLoadingServer, isLoadingAuth0, isAuthenticated, user],
  );

  const isOnlyAuth0User = useMemo(
    () => !isLoadingAuth0 && isAuthenticated && !user,
    [isLoadingAuth0, isAuthenticated, user],
  );

  return (
    <>
      {isRegisterUser && <Navigate to={paths.default} />}
      {isOnlyAuth0User ? (
        <CenteredContainer>
          <UserRegisterInfoForm />
        </CenteredContainer>
      ) : (
        <CenteredContainer>
          <ImgLogo src={logo} alt='ADC' />
          <AnimatedText>ADC.UA</AnimatedText>
          <Typography variant='h4'>Advanced driver community 🇺🇦</Typography>
          <LoginButton onClick={() => loginWithRedirect()}>
            Join us or sign in
          </LoginButton>

          <TextContainer>
            <Typography variant='h6'>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias assumenda,
              debitis, doloribus expedita explicabo facilis iusto necessitatibus neque
              nisi praesentium quis repudiandae sint tempora ut.
            </Typography>
          </TextContainer>
        </CenteredContainer>
      )}
    </>
  );
}
