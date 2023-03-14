import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';

import logo from '../../assets/logos/adc-ua-logo.png';
import { UniversalButton } from '../../styled-global/global-styled-components';
import {
  Form,
  ImgLogo,
  StyledFormContainer,
  StyledFormControl,
  StyledTextField,
} from './UserRegisterInfoForm.style';

export default function UserRegisterInfoForm() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('');

  const handleFirstNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(event.target.value);
  };

  const handleGenderChange = (event: SelectChangeEvent<unknown>) => {
    setGender(event.target.value as string);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // handle form submission
  };

  return (
    <StyledFormContainer>
      <ImgLogo src={logo} alt='ADC' />
      <Typography variant='h6'>Please specify some information </Typography>
      <Form onSubmit={handleSubmit}>
        <StyledTextField
          label='First Name'
          value={firstName}
          onChange={handleFirstNameChange}
          variant='outlined'
          required
        />
        <StyledTextField
          label='Last Name'
          value={lastName}
          onChange={handleLastNameChange}
          variant='outlined'
          required
        />
        <StyledFormControl fullWidth>
          <InputLabel id='gender-select-label'>Gender</InputLabel>
          <Select
            labelId='gender-select-label'
            label='Gender'
            value={gender}
            onChange={handleGenderChange}
            variant='outlined'
            required
          >
            <MenuItem value='male'>Male</MenuItem>
            <MenuItem value='female'>Female</MenuItem>
            <MenuItem value='other'>Other</MenuItem>
          </Select>
        </StyledFormControl>
        <UniversalButton type='submit' variant='contained'>
          Send
        </UniversalButton>
      </Form>
    </StyledFormContainer>
  );
}
