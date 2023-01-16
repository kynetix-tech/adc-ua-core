import {
  StyledEngineProvider,
  ThemeProvider as MuiThemeProvider,
} from '@mui/material/styles';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';

import Login from './pages/Login';
import theme from './themes';

function App() {
  return (
    <StyledThemeProvider theme={theme}>
      <StyledEngineProvider injectFirst>
        <MuiThemeProvider theme={theme}>
          <Login />
        </MuiThemeProvider>
      </StyledEngineProvider>
    </StyledThemeProvider>
  );
}

export default App;
