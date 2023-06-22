import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import styled from 'styled-components';

export const CommentTextField = styled(TextField).attrs({
  variant: 'outlined',
  multiline: true,
  rows: 4,
  color: 'secondary',
})`
  min-width: 100%;
`;

export const CommentsPaper = styled(Paper)`
  margin-top: 2rem;
`;

export const CommentsContainer = styled(Box)`
  margin: 2rem 1rem;
`;

export const CommentDivider = styled(Divider)`
  margin: 1rem 2rem;
`;

export const CommentAvatar = styled(Avatar)`
  margin-left: 1rem;
  background-color: ${({ theme }) => theme.palette.primary.main};
`;
