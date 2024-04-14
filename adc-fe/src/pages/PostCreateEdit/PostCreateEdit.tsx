import { useAuth0 } from '@auth0/auth0-react';
import PublishIcon from '@mui/icons-material/Publish';
import { Autocomplete } from '@mui/material';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import React, { useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Navigate, useNavigate } from 'react-router';

import { paths } from '../../App.router';
import PostContentEdit from '../../components/PostContentEdit';
import { useNotificationOnError } from '../../hooks/notification/useNotificationBar';
import { Entity } from '../../interface/api-interface';
import { AutocompleteType } from '../../interface/common';
import {
  CarSpecificationService,
  ContentItem,
  PostResponse,
  PostService,
} from '../../service/Api';
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
} from './PostCreateEdit.style';

export interface PostCreateEditProps {
  post?: PostResponse;
}

export default function PostCreateEdit({ post }: PostCreateEditProps) {
  const [title, setTitle] = React.useState<string>('');
  const [inputMake, setInputMake] = React.useState<AutocompleteType>(null);
  const [inputModel, setInputModel] = React.useState<AutocompleteType>(null);
  const [carYear, setCarYear] = React.useState<Date | null>(null);
  const [content, setContent] = React.useState<ContentItem[]>([]);
  const [isFormValid, setIsFormValid] = React.useState<boolean>(false);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { user } = useAuth0();

  useEffect(() => {
    if (post && post.user.id === user?.sub) {
      setTitle(post.title);
      setInputMake({ id: post.carMake.id, label: post.carMake.title });
      setInputModel({ id: post.carModel.id, label: post.carModel.title });
      setCarYear(new Date(`${post.carYear}`));
      setContent(post.content);
    }
  }, [post]);

  const { data: makes, isLoading: isLoadingMakes } = useQuery(
    [Entity.CarMake],
    () => CarSpecificationService.getCarMakesBySearchStr(),
    {
      onError: useNotificationOnError(),
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    },
  );

  console.log({ inputMake });
  const { data: models, isLoading: isLoadingModels } = useQuery(
    [Entity.CarModel, inputMake],
    () => (inputMake ? CarSpecificationService.getCarModelByMake(inputMake.id) : []),
    {
      onError: useNotificationOnError(),
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    },
  );

  const validateForm = () => {
    if (title && inputMake && inputModel && carYear && content.length) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  };

  const { mutate: createPost } = useMutation(
    [Entity.PostContent],
    async () => {
      if (inputMake && inputModel && carYear) {
        const body = {
          title,
          content,
          carYear: carYear.getFullYear(),
          carMakeId: inputMake.id,
          carModelId: inputModel.id,
        };

        if (post && post.id) {
          return PostService.updatePost({ ...body, id: post.id });
        } else {
          return PostService.createPost(body);
        }
      }
    },
    {
      onError: useNotificationOnError(),
      onSettled: () => queryClient.invalidateQueries(Entity.PostView),
      onSuccess: () => navigate(paths.default),
    },
  );

  useEffect(validateForm, [title, inputMake, inputModel, carYear, content]);

  return post && post.user.id !== user?.sub ? (
    <Navigate to={paths.default} />
  ) : (
    <PageContainer>
      <PostPaperBackground>
        <Typography variant='h5'>Your post</Typography>
        {!isFormValid && (
          <Typography>
            *You need to fill in all the required fields for publication
          </Typography>
        )}
        <TitleField
          required
          label='Title'
          variant='outlined'
          value={title}
          onChange={(event) => {
            setTitle(event.target.value);
          }}
        />
        <FlexBoxCarSpecify>
          <FlexItem>
            <Autocomplete
              value={inputMake}
              onChange={(event: React.SyntheticEvent, newValue: any) => {
                setInputMake((prevState) => {
                  if (!newValue || (newValue && prevState?.id != newValue.id))
                    setInputModel(null);
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
          <PostContentEdit content={content} setContent={setContent} />
          <StyledButton
            onClick={() => {
              createPost();
            }}
            disabled={!isFormValid}
            startIcon={<PublishIcon />}
          >
            Submit
          </StyledButton>
        </CenteredTextBox>
      </PostPaperBackground>
    </PageContainer>
  );
}
