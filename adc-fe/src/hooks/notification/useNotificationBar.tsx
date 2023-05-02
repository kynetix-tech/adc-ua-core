import { useSnackbar } from 'notistack';
import { useCallback } from 'react';

import { ApiError } from '../../service/Api';

export const getErrorMessage = (error: any): string => {
  return error instanceof ApiError && error.body.message
    ? error.body.message
    : error instanceof Error
    ? error.message
    : 'Unable to perform operation';
};

export type variantTypes = 'error' | 'info' | 'default' | 'success' | 'warning';

export const useNotificationBar = (variant: variantTypes) => {
  const snackbar = useSnackbar();
  return useCallback(
    (error: any) => {
      snackbar.enqueueSnackbar(getErrorMessage(error), { variant });
    },
    [snackbar],
  );
};

export const useNotificationOnError = useNotificationBar.bind(null, 'error');
