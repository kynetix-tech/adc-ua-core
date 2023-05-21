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

export const ItemContainer = styled(Box)`
  margin-top: 1rem;

  table {
    border-spacing: 0;
    border-collapse: collapse;
    margin: 0 auto;

    tr {
      border-top: 0.2rem solid;
    }

    th,
    td {
      padding: 0.5rem 1rem;
      border: 1px solid ${({ theme }) => theme.palette.primary.main};
    }

    tr:nth-child(2n) {
      background: ${({ theme }) => theme.palette.background.default};
    }
  }
`;

export const PostViewContainer = styled(Box)`
  padding: 0 1rem;
  margin-bottom: 2rem;
`;
