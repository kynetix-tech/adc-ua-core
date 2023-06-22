import Button from '@mui/material/Button';
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
