import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';
import { useQuery } from 'react-query';

import { UsersService } from '../../service/Api';

export default function Home() {
  const { data, isLoading } = useQuery(['p'], () => UsersService.getCurrentUser(), {
    onError: console.log,
  });

  console.log(data);
  return <>Home</>;
}
