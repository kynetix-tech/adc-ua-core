import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import styled from 'styled-components';

export const CenteredContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 90vh;
  user-select: none;
`;

export const LoginButton = styled(Button).attrs({
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

export const TextContainer = styled(Box)`
  margin-top: 2rem;
  max-width: 25vw;
  text-align: center;
  font-family: ${({ theme }) => theme.typography.fontFamily};
  font-weight: ${({ theme }) => theme.typography.fontWeightBold};
`;

export const ImgLogo = styled.img`
  border-radius: 50%;
  margin: 1rem;
  width: 20rem;
  height: 20rem;
`;
