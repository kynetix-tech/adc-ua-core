import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';

export default function Home() {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();

  if (isAuthenticated) {
    (async () => {
      console.log(await getAccessTokenSilently({ cacheMode: 'cache-only' }));
      console.log(await getAccessTokenSilently());
    })();
  }

  return <>Home</>;
}
