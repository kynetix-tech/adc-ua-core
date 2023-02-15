import React from 'react';
import { useQuery } from 'react-query';

import { DefaultService } from '../../service/Api';

export default function Home() {
  const { data, isLoading } = useQuery(['p'], () => DefaultService.getPrivate(), {
    onError: console.log,
  });

  console.log(data);
  // (async () => {
  //   const res = await DefaultService.getHello();
  // })();

  return <>Home</>;
}
