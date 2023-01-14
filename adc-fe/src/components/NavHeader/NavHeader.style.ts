import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import styled from 'styled-components';

export const NavContainer = styled(Container).attrs({
  maxWidth: false,
})`
  max-width: 95vw;
  padding-left: 0;
  padding-right: 0;
`;

export const FlexBox = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
