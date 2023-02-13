import { Auth0Provider } from '@auth0/auth0-react';
import {
  StyledEngineProvider,
  ThemeProvider as MuiThemeProvider,
} from '@mui/material/styles';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';

import { AppRouter } from './App.router';
import theme from './themes';

function App() {
  return (
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
  );
}

export default App;
