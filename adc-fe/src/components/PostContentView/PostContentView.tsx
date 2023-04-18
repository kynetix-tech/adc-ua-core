import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { Menu } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import React from 'react';
import { useMutation, useQueryClient } from 'react-query';

import { Entity } from '../../interface/api-interface';
import { ContentTypes } from '../../interface/common';
import { ContentItem, PostService } from '../../service/Api';
import { StyledButton } from '../../styled-global/global-styled-components';
import {
  AbsoluteIconButton,
  ContentDivider,
  Image,
  ItemContainer,
  Label,
  PostContentTextField,
} from './PostContentView.style';

const MEDIA_PATH = import.meta.env.VITE_APP_MEDIA_PATH;

export interface PostContentViewProps {
  content: Array<ContentItem>;
  setContent: React.Dispatch<React.SetStateAction<ContentItem[]>>;
}

export default function PostContentView({ content, setContent }: PostContentViewProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const queryClient = useQueryClient();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { mutate: uploadImg } = useMutation(
    [Entity.PostContent],
    async (files: Array<File>) => {
      if (files.length) {
        return PostService.uploadImage({ file: files[0] });
      }
    },
    {
      onError: console.log,
      onSuccess: (data) => {
        if (data) {
          setContent((prevState) => [
            ...prevState,
            {
              type: ContentTypes.Img,
              content: `${MEDIA_PATH}/${data.filename}`,
            },
          ]);
        }

        return queryClient.invalidateQueries(Entity.PostContent);
      },
    },
  );

  return (
    <>
      {content.map((item, key) => (
        <ItemContainer key={key}>
          {item.type === ContentTypes.Text ? (
            <PostContentTextField
              value={content[key].content}
              onChange={(event) => {
                setContent((prevState) => {
                  prevState[key].content = event.target.value;
                  return [...prevState];
                });
              }}
              label='Write something'
              multiline
            />
          ) : (
            <Image alt='' src={item.content} />
          )}
          <AbsoluteIconButton
            onClick={() =>
              setContent((prevState) => prevState.filter((item, index) => index !== key))
            }
          >
            <DeleteIcon />
          </AbsoluteIconButton>
        </ItemContainer>
      ))}

      <ContentDivider />

      <input
        type='file'
        accept='image/*'
        id='upload-img-btn'
        hidden
        multiple={false}
        onChange={(event) => {
          event.stopPropagation();
          uploadImg(Array.from(event.target.files || []));
        }}
      />
      <StyledButton
        id='plus-btn'
        aria-controls={open ? 'plus-btn' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        startIcon={<AddIcon />}
      >
        Add text/image
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
        <MenuItem
          onClick={() => {
            setContent((prevState) => [
              ...prevState,
              {
                type: ContentTypes.Text,
                content: '',
              },
            ]);
            handleClose();
          }}
        >
          Text
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Label htmlFor={'upload-img-btn'}>Image</Label>
        </MenuItem>
      </Menu>
    </>
  );
}
