import 'react-markdown-editor-lite/lib/index.css';

import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { Menu } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import MarkdownIt from 'markdown-it';
import React from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { text } from 'stream/consumers';

import { MEDIA_PATH } from '../../common/const';
import { useNotificationOnError } from '../../hooks/notification/useNotificationBar';
import { Entity } from '../../interface/api-interface';
import { ContentTypes } from '../../interface/common';
import { ContentItem, PostService } from '../../service/Api';
import { PostImage, StyledButton } from '../../styled-global/global-styled-components';
import {
  AbsoluteIconButton,
  ContentDivider,
  ItemContainer,
  Label,
  MarkdownEditorStyled,
} from './PostContentEdit.style';

export interface PostContentViewProps {
  content: Array<ContentItem>;
  setContent: React.Dispatch<React.SetStateAction<ContentItem[]>>;
}

const mdParser = new MarkdownIt(/* Markdown-it options */);

export default function PostContentEdit({ content, setContent }: PostContentViewProps) {
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
      onError: useNotificationOnError(),
      onSuccess: (data) => {
        if (data) {
          setContent((prevState) => [
            ...prevState,
            {
              type: ContentTypes.Img,
              content: data.filename,
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
            <MarkdownEditorStyled
              value={item.content}
              style={{ height: '400px' }}
              renderHTML={(text: string) => mdParser.render(text)}
              onChange={({ text }: { text: string }) => {
                setContent((prevState) => {
                  prevState[key].content = text;
                  return [...prevState];
                });
              }}
            />
          ) : (
            <PostImage alt='' src={`${MEDIA_PATH}/${item.content}`} />
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
