import { useAuth0 } from '@auth0/auth0-react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ViewCompactIcon from '@mui/icons-material/ViewCompact';
import IconButton from '@mui/material/IconButton';
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
  const { isAuthenticated } = useAuth0();

  return (
    <NavAppBar>
      <Toolbar>
        <NavContainer>
          <FlexBox>
            <FlexBox>
              <NavLogoBox />
              <NavLogoText>ADC.UA</NavLogoText>
            </FlexBox>
            {isAuthenticated && (
              <FlexBox>
                <IconButton>
                  <ViewCompactIcon />
                </IconButton>

                <IconButton>
                  <AddCircleOutlineIcon />
                </IconButton>
                <IconButton>
                  <AccountCircleIcon />
                </IconButton>
              </FlexBox>
            )}
          </FlexBox>
        </NavContainer>
      </Toolbar>
    </NavAppBar>
  );
}
