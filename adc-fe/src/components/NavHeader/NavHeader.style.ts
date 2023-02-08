import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import styled from 'styled-components';

import Logo from '../../assets/logos/adc-ua-logo.png';

export const NavContainer = styled(Container).attrs({
  maxWidth: false,
})`
  max-width: 92vw;
  padding-left: 0;
  padding-right: 0;
`;

export const FlexBox = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export interface NavAppBarProps {
  isAuthenticated: boolean;
}

export const NavAppBar = styled(AppBar).attrs({
  position: 'static',
  elevation: 0,
})<NavAppBarProps>`
  background-color: ${(props) =>
    props.isAuthenticated ? 'rgba(211, 219, 238, 0.2)' : 'transparent'} !important;
`;

export const NavLogoBox = styled(Box).attrs({
  src: Logo,
  component: 'img',
})`
  height: 2rem;
  margin: 0.5rem;
`;

export const NavLogoText = styled(Typography).attrs({
  variant: 'h5',
})`
  color: ${({ theme }) => theme.palette.text.primary};
`;
