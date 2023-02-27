import { useAuth0 } from '@auth0/auth0-react';
import { useCallback, useEffect } from 'react';

import { OpenAPI } from '../../service/Api';

export const useApiTokenResolver = () => {
  const { getAccessTokenSilently } = useAuth0();

  const resolver = useCallback(async () => {
    try {
      return await getAccessTokenSilently();
    } catch {
      return '';
    }
  }, [getAccessTokenSilently]);

  useEffect(() => {
    OpenAPI.TOKEN = resolver;
  }, [resolver]);
};
