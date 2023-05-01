import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MdEditor from 'react-markdown-editor-lite';
import styled from 'styled-components';

export const ItemContainer = styled(Box)`
  position: relative;
  margin-top: 1rem;
`;

export const MarkdownEditorStyled = styled(MdEditor)`
  max-width: 83vw;
  height: 10vh;
  text-align: left;
`;

export const AbsoluteIconButton = styled(IconButton)`
  position: absolute;
  top: 45%;
  right: 0;
`;

export const ContentDivider = styled(Divider)`
  margin: 1rem;
`;

export const Label = styled.label`
  cursor: pointer;
`;
