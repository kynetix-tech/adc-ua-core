import { Autocomplete } from '@mui/material';
import TextField from '@mui/material/TextField';
import React from 'react';
import { useQuery } from 'react-query';

import { Entity } from '../../interface/api-interface';
import { AutocompleteOption } from '../../interface/common';
import { CarSpecificationService } from '../../service/Api';

type AutocompleteType = AutocompleteOption | null;
export default function NewPost() {
  const [inputMake, setInputMake] = React.useState<AutocompleteType>(null);
  const [inputModel, setInputModel] = React.useState<AutocompleteType>(null);

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
  });

  return (
    <div>
      <Autocomplete
        value={inputMake}
        onChange={(event: React.SyntheticEvent, newValue: any) => {
          setInputMake((prevState) => {
            if (prevState?.id != newValue.id) setInputModel(null);
            return newValue;
          });
        }}
        disablePortal
        options={makes ? makes.map((item) => ({ id: item.id, label: item.title })) : []}
        renderInput={(params) => <TextField {...params} label='Car make' />}
      />
      <Autocomplete
        value={inputModel}
        onChange={(event: React.SyntheticEvent, newValue: any) => {
          setInputModel(newValue);
        }}
        disablePortal
        options={models ? models.map((item) => ({ id: item.id, label: item.title })) : []}
        renderInput={(params) => <TextField {...params} label='Car model' />}
      />
    </div>
  );
}
