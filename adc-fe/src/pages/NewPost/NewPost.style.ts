import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import styled from 'styled-components';

export const PostPaperBackground = styled(Box)`
  background: ${({ theme }) => theme.palette.grey['800']};
  border-radius: 1rem;
  padding: 1rem;
  min-height: 85vh;
  border-color: ${({ theme }) => theme.palette.grey['A700']};
`;

export const FlexBoxCarSpecify = styled(Box)`
  margin-top: 1rem;
  display: flex;
  margin-bottom: 2rem;
`;

export const FlexItem = styled(Box)`
  margin-right: 1rem;
  min-width: 9.5vw;
`;

export const TitleField = styled(TextField).attrs({})`
  margin-top: 1rem;
  min-width: 30vw;
`;
