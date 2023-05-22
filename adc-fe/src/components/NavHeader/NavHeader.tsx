import { useAuth0 } from '@auth0/auth0-react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import LogoutIcon from '@mui/icons-material/Logout';
import ViewCompactIcon from '@mui/icons-material/ViewCompact';
import { Divider } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { join } from 'path';
import React from 'react';
import { useNavigate } from 'react-router';

import { paths } from '../../App.router';
import { StyledButton } from '../../styled-global/global-styled-components';
import {
  FlexBox,
  NavAppBar,
  NavContainer,
  NavLogoBox,
  NavLogoText,
  PopoverContainer,
  VerticalPopover,
} from './NavHeader.style';

export default function NavHeader() {
  const { isAuthenticated, logout, user } = useAuth0();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <NavAppBar $isAuthenticated={true}>
      <Toolbar>
        <NavContainer>
          <FlexBox>
            <FlexBox>
              <NavLogoBox />
              <NavLogoText>ADC.UA</NavLogoText>
            </FlexBox>
            {isAuthenticated && (
              <FlexBox>
                <IconButton onClick={() => navigate(join(paths.default))}>
                  <ViewCompactIcon />
                </IconButton>
                <IconButton
                  onClick={() =>
                    navigate(join(paths.default, paths.post.root, paths.post.new))
                  }
                >
                  <AddCircleOutlineIcon />
                </IconButton>
                <>
                  <IconButton aria-describedby={id} onClick={handleClick}>
                    <AccountCircleIcon />
                  </IconButton>
                  <VerticalPopover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                  >
                    <PopoverContainer>
                      <Typography variant='button'>{user?.email}</Typography>
                      <Divider orientation='horizontal' variant='middle' flexItem />
                      <StyledButton
                        startIcon={<LogoutIcon />}
                        onClick={() => {
                          logout({ logoutParams: { returnTo: window.location.origin } });
                        }}
                      >
                        Logout
                      </StyledButton>
                    </PopoverContainer>
                  </VerticalPopover>
                </>
              </FlexBox>
            )}
          </FlexBox>
        </NavContainer>
      </Toolbar>
    </NavAppBar>
  );
}
