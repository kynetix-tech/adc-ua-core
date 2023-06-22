import { AppState, Auth0Provider, useAuth0 } from '@auth0/auth0-react';
import {
  StyledEngineProvider,
  ThemeProvider as MuiThemeProvider,
} from '@mui/material/styles';
import Editor, { Plugins } from 'react-markdown-editor-lite';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';

import { AppRouter } from './App.router';
import { NotificationProvider } from './hooks/notification/Notification.provider';
import { OpenAPI } from './service/Api';
import theme from './themes';

OpenAPI.BASE = import.meta.env.VITE_APP_CORE_URL as string;

Editor.unuse(Plugins.Image);
Editor.unuse(Plugins.BlockCodeBlock);
Editor.unuse(Plugins.BlockCodeInline);

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <StyledThemeProvider theme={theme}>
        <StyledEngineProvider injectFirst>
          <MuiThemeProvider theme={theme}>
            <Auth0Provider
              domain={import.meta.env.VITE_AUTH0_DOMAIN}
              clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
              cacheLocation='localstorage'
              authorizationParams={{
                redirect_uri: `${window.location.origin}/login`,
                audience: import.meta.env.VITE_AUTH0_AUDIENCE,
                scope: 'openid profile email',
              }}
            >
              <NotificationProvider>
                <AppRouter />
              </NotificationProvider>
            </Auth0Provider>
          </MuiThemeProvider>
        </StyledEngineProvider>
      </StyledThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
