import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import styled from 'styled-components';

export const ColoredTabs = styled(Tabs).attrs((props) => ({
  TabIndicatorProps: { style: { backgroundColor: props.theme.palette.secondary.main } },
  textColor: 'secondary',
}))``;

export const PostsContainer = styled(Box)`
  margin: 1rem 0;
`;
