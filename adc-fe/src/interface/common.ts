export interface AutocompleteOption {
  label: string;
  id: number;
}

export type ContentType = 'text' | 'img';

export type AutocompleteType = AutocompleteOption | null;

export enum ContentTypes {
  Text = 'text',
  Img = 'img',
}

export enum TabType {
  Newest,
  Popular,
}
