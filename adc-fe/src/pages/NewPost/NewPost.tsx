import AddIcon from '@mui/icons-material/Add';
import { Autocomplete, Menu } from '@mui/material';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import React from 'react';
import { useQuery } from 'react-query';

import { Entity } from '../../interface/api-interface';
import { AutocompleteOption } from '../../interface/common';
import { CarSpecificationService, ContentItem } from '../../service/Api';
import {
  CenteredTextBox,
  PageContainer,
  StyledButton,
} from '../../styled-global/global-styled-components';
import {
  FlexBoxCarSpecify,
  FlexItem,
  PostPaperBackground,
  TitleField,
} from './NewPost.style';

type AutocompleteType = AutocompleteOption | null;

export default function NewPost() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [inputMake, setInputMake] = React.useState<AutocompleteType>(null);
  const [inputModel, setInputModel] = React.useState<AutocompleteType>(null);
  const [carYear, setCarYear] = React.useState<Date | null>();
  const [content, setContent] = React.useState<ContentItem[]>([]);

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { data: makes, isLoading: isLoadingMakes } = useQuery(
    [Entity.CarMake],
    () => CarSpecificationService.getCarMakesBySearchStr(),
    { onError: console.log, refetchOnWindowFocus: false, refetchOnMount: false },
  );

  const { data: models, isLoading: isLoadingModels } = useQuery(
    [Entity.CarModel, inputMake],
    () => (inputMake ? CarSpecificationService.getCarModelByMake(inputMake.id) : []),
    { onError: console.log, refetchOnWindowFocus: false, refetchOnMount: false },
  );

  console.log({
    inputMake,
    inputModel,
    carYear: carYear?.getFullYear(),
  });

  return (
    <PageContainer>
      <PostPaperBackground>
        <Typography variant='h5'>Create new post</Typography>
        <TitleField required label='Title' variant='outlined' />
        <FlexBoxCarSpecify>
          <FlexItem>
            <Autocomplete
              value={inputMake}
              onChange={(event: React.SyntheticEvent, newValue: any) => {
                setInputMake((prevState) => {
                  if (prevState?.id != newValue.id) setInputModel(null);
                  return newValue;
                });
              }}
              disablePortal
              options={
                makes ? makes.map((item) => ({ id: item.id, label: item.title })) : []
              }
              renderInput={(params) => <TextField {...params} label='Car make' />}
            />
          </FlexItem>

          <FlexItem>
            <Autocomplete
              value={inputModel}
              onChange={(event: React.SyntheticEvent, newValue: any) => {
                setInputModel(newValue);
              }}
              disablePortal
              options={
                models ? models.map((item) => ({ id: item.id, label: item.title })) : []
              }
              renderInput={(params) => <TextField {...params} label='Car model' />}
            />
          </FlexItem>

          <FlexItem>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                value={carYear}
                onChange={setCarYear}
                label='Car year'
                views={['year']}
                maxDate={new Date()}
              />
            </LocalizationProvider>
          </FlexItem>
        </FlexBoxCarSpecify>

        <CenteredTextBox>
          <StyledButton
            id='plus-btn'
            aria-controls={open ? 'plus-btn' : undefined}
            aria-haspopup='true'
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
            startIcon={<AddIcon />}
          >
            Add new item
          </StyledButton>
          <Menu
            id='plus-btn'
            aria-labelledby='plus-btn'
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'center',
              horizontal: 'center',
            }}
          >
            <MenuItem onClick={handleClose}>Text</MenuItem>
            <MenuItem onClick={handleClose}>Image</MenuItem>
          </Menu>
        </CenteredTextBox>
      </PostPaperBackground>
    </PageContainer>
  );
}
