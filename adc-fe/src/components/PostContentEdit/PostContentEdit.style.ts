import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import styled from 'styled-components';

export const PostContentTextField = styled(TextField).attrs({
  variant: 'standard',
})`
  min-width: 80%;
`;

export const ItemContainer = styled(Box)`
  position: relative;
  margin-top: 1rem;
`;

export const AbsoluteIconButton = styled(IconButton)`
  position: absolute;
  top: 45%;
`;

export const ContentDivider = styled(Divider)`
  margin: 1rem;
`;

export const Label = styled.label`
  cursor: pointer;
`;

export const Image = styled.img`
  max-width: 45vw;
  max-height: 60vh;
`;
