import { useAuth0 } from '@auth0/auth0-react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router';

import { paths } from '../../App.router';
import logo from '../../assets/logos/adc-ua-logo.png';
import { useNotificationOnError } from '../../hooks/notification/useNotificationBar';
import { Entity, Gender } from '../../interface/api-interface';
import { UserRegisterRequest, UsersService } from '../../service/Api';
import { UniversalButton } from '../../styled-global/global-styled-components';
import {
  Form,
  ImgLogo,
  StyledFormContainer,
  StyledFormControl,
  StyledTextField,
} from './UserRegisterInfoForm.style';

export default function UserRegisterInfoForm() {
  const { user } = useAuth0();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [gender, setGender] = useState<Gender | string>('');

  const { mutate: registerUser } = useMutation(
    [Entity.User],
    (userRegisterInfo: UserRegisterRequest) => {
      return UsersService.register(userRegisterInfo);
    },
    {
      onError: useNotificationOnError(),
      onSuccess: () => queryClient.invalidateQueries(Entity.User),
      onSettled: () => navigate(paths.root),
    },
  );

  const handleFirstNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFirstName(event.target.value.trim());
  };

  const handleLastNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(event.target.value.trim());
  };

  const handleGenderChange = (event: SelectChangeEvent<unknown>) => {
    setGender(event.target.value as Gender);
  };

  const isNameValid = (name: string, count: number) => {
    const forbiddenCharacters = /[!@#$%^&*(),.?":{}|<>]/g;
    return !name || (name.trim().length >= count && !forbiddenCharacters.test(name));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const email = user?.email;
    if (isNameValid(firstName, 2) && isNameValid(lastName, 3) && email) {
      registerUser({
        email,
        firstName,
        lastName,
        gender,
      });
    }
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
          error={!isNameValid(firstName, 2)}
          helperText={
            !firstName || isNameValid(firstName, 2)
              ? ''
              : 'Name not valid (check length >= 2 & characters)'
          }
          required
        />
        <StyledTextField
          label='Last Name'
          value={lastName}
          onChange={handleLastNameChange}
          variant='outlined'
          error={!isNameValid(lastName, 3)}
          helperText={
            isNameValid(lastName, 3)
              ? ''
              : 'Last not valid (check length >= 2 & characters)'
          }
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
            <MenuItem value={Gender.Male}>{Gender.Male}</MenuItem>
            <MenuItem value={Gender.Female}>{Gender.Female}</MenuItem>
            <MenuItem value={Gender.Other}>{Gender.Other}</MenuItem>
          </Select>
        </StyledFormControl>
        <UniversalButton type='submit' variant='contained'>
          Send
        </UniversalButton>
      </Form>
    </StyledFormContainer>
  );
}
