import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';

import NavHeader from '../../components/NavHeader';

export default function Login() {
  const { loginWithRedirect, logout, isAuthenticated, getAccessTokenSilently } =
    useAuth0();

  if (isAuthenticated) {
    (async () => {
      console.log(await getAccessTokenSilently());
    })();
  }

  return (
    <>
      <NavHeader></NavHeader>
      <button onClick={() => loginWithRedirect()}>Log In</button>
      <button
        onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
      >
        Log Out
      </button>
    </>
  );
}
