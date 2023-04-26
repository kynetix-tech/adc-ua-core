import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import styled from 'styled-components';

export const PostViewStack = styled(Stack)`
  margin: 0.5rem 0;
`;

export const IconTypographyContainer = styled(Typography)`
  position: relative;
  margin: 0 2rem;
`;

export const IconAbsoluteContainer = styled(Box)`
  position: absolute;
  left: -2rem;
  top: 0.2rem;
`;
