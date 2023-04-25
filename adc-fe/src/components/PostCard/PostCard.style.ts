import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import styled from 'styled-components';

export const FlexCard = styled(Card)`
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  max-width: 50vw;
  margin: 1rem 0;
  background-color: ${({ theme }) => theme.palette.grey['800']};
`;

export const CardMediaImg = styled(CardMedia).attrs({
  component: 'img',
})`
  width: 12vw;
  height: 12vw;
`;

export const CardTextBox = styled(Box)`
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

export const CardControlsFlexBox = styled(Box)`
  position: absolute;
  bottom: 1rem;
  left: 0.5rem;
  display: flex;
`;

export const CardContentRel = styled(CardContent)`
  position: relative;
`;
