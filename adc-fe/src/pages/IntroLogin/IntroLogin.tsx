import { useAuth0 } from '@auth0/auth0-react';
import Typography from '@mui/material/Typography';
import React from 'react';

import logo from '../../assets/logos/ADC_ animated.gif';
import { AnimatedText } from '../../components/AnimatedText';
import {
  CenteredContainer,
  ImgLogo,
  LoginButton,
  TextContainer,
} from './IntroLogin.style';

export default function IntroLogin() {
  const { loginWithRedirect, isAuthenticated, getAccessTokenSilently } = useAuth0();

  if (isAuthenticated) {
    (async () => {
      console.log(await getAccessTokenSilently());
    })();
  }

  return (
    <CenteredContainer>
      <ImgLogo src={logo} alt='ADC' />
      <AnimatedText>ADC.UA</AnimatedText>
      <Typography variant='h4'>Advanced driver community 🇺🇦</Typography>
      <LoginButton onClick={() => loginWithRedirect()}>Join us or sign in</LoginButton>

      <TextContainer>
        <Typography variant='h6'>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias assumenda,
          debitis, doloribus expedita explicabo facilis iusto necessitatibus neque nisi
          praesentium quis repudiandae sint tempora ut.
        </Typography>
      </TextContainer>
    </CenteredContainer>
  );
}
