/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ContentItem } from './ContentItem';

export type PostCreateRequest = {
    title: string;
    content: Array<ContentItem>;
    carYear: number;
    carMakeId: number;
    carModelId: number;
};

