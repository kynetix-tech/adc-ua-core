import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import React from 'react';

import { FlexBox, NavContainer, NavToolbar } from './NavHeader.style';

export default function NavHeader() {
  return (
    <NavContainer>
      <FlexBox>
        <DirectionsCarIcon />
      </FlexBox>
    </NavContainer>
  );
}
