import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';

import { AnimatedText } from '../../components/AnimatedText';

export default function IntroLogin() {
  const { loginWithRedirect, logout, isAuthenticated, getAccessTokenSilently } =
    useAuth0();

  if (isAuthenticated) {
    (async () => {
      console.log(await getAccessTokenSilently());
    })();
  }

  return (
    <>
      <AnimatedText>ADC.UA</AnimatedText>
      <button onClick={() => loginWithRedirect()}>Log In</button>
      <button
        onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
      >
        Log Out
      </button>
    </>
  );
}
