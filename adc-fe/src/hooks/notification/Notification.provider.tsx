import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import IconButton from '@mui/material/IconButton';
import { SnackbarProvider, useSnackbar } from 'notistack';
import React from 'react';

type CloseButtonId = string | number;

const CloseButton = ({ id }: { id: CloseButtonId }) => {
  const { closeSnackbar } = useSnackbar();
  return (
    <IconButton onClick={() => closeSnackbar(id)}>
      <HighlightOffIcon />
    </IconButton>
  );
};

export const NotificationProvider = ({ children }: { children: React.ReactNode }) => (
  <SnackbarProvider
    maxSnack={3}
    hideIconVariant
    preventDuplicate
    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    action={(key) => <CloseButton key={key} id={key} />}
  >
    {children}
  </SnackbarProvider>
);
