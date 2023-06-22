import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import styled from 'styled-components';

export const StyledFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 32px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const StyledTextField = styled(TextField)`
  margin-top: 1rem;
  min-width: 20rem;
`;

export const StyledFormControl = styled(FormControl)`
  margin-top: 1rem;
`;

export const ImgLogo = styled.img`
  height: 4rem;
  margin-bottom: 1rem;
`;
