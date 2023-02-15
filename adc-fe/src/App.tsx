import { Auth0Provider } from '@auth0/auth0-react';
import {
  StyledEngineProvider,
  ThemeProvider as MuiThemeProvider,
} from '@mui/material/styles';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';

import { AppRouter } from './App.router';
import { OpenAPI } from './service/Api';
import theme from './themes';

OpenAPI.BASE = import.meta.env.VITE_APP_CORE_URL as string;

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
                redirect_uri: window.location.origin,
                audience: import.meta.env.VITE_AUTH0_AUDIENCE,
                scope: 'openid profile email',
              }}
            >
              <AppRouter />
            </Auth0Provider>
          </MuiThemeProvider>
        </StyledEngineProvider>
      </StyledThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
