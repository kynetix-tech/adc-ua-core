import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import styled from 'styled-components';

export const ColoredTabs = styled(Tabs).attrs((props) => ({
  TabIndicatorProps: { style: { backgroundColor: props.theme.palette.secondary.main } },
  textColor: 'secondary',
}))``;

export const PostsContainer = styled(Box)`
  margin: 1rem 0;
  display: flex;
`;

export const StickyContainer = styled(Box)`
  position: sticky;
  top: 3rem;
  background-color: ${({ theme }) => theme.palette.background.paper};
  border-radius: 1rem;
  z-index: 999;
  padding: 1rem;
  margin-top: 1rem;
  max-height: 35vh;
  min-width: 10vw;
  text-align: center;
`;

export const AutoCompleteFilter = styled(Autocomplete)`
  margin-top: 1rem;
`;
