import Toolbar from '@mui/material/Toolbar';
import React from 'react';

import {
  FlexBox,
  NavAppBar,
  NavContainer,
  NavLogoBox,
  NavLogoText,
} from './NavHeader.style';

export default function NavHeader() {
  return (
    <NavContainer>
      <FlexBox>
        <NavAppBar>
          <Toolbar>
            <NavLogoBox />
            <NavLogoText>ADC.UA</NavLogoText>
          </Toolbar>
        </NavAppBar>
      </FlexBox>
    </NavContainer>
  );
}
