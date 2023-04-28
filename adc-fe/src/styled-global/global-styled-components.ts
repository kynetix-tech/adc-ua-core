import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import styled from 'styled-components';

export const UniversalButton = styled(Button).attrs({
  size: 'large',
  variant: 'contained',
})`
  margin-top: 2rem;
  border-radius: 1.5rem;
  background-color: ${({ theme }) => theme.palette.secondary.main};
  color: ${({ theme }) => theme.palette.grey[800]};
  &:hover {
    background-color: ${({ theme }) => theme.palette.grey[800]};
    color: ${({ theme }) => theme.palette.secondary.main};
  }
`;

export const PageContainer = styled(Container).attrs({
  maxWidth: false,
})`
  padding-top: 1rem;
  max-width: 88vw;
  padding-left: 0;
  padding-right: 0;
`;

export const CenteredTextBox = styled(Box)`
  text-align: center;
`;

export const StyledButton = styled(Button).attrs({
  variant: 'outlined',
})`
  color: ${({ theme }) => theme.palette.secondary.main};
  border-color: ${({ theme }) => theme.palette.secondary.main};
  border-radius: 2rem;
  margin: 0.5rem;

  &:hover {
    border-color: ${({ theme }) => theme.palette.secondary.main};
    background-color: ${({ theme }) => theme.palette.grey[700]};
  }
`;

export const PostImage = styled.img`
  max-width: 45vw;
  max-height: 60vh;
`;
