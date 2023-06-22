/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ContentItem } from './ContentItem';

export type PostCreateUpdateRequest = {
    title: string;
    content: Array<ContentItem>;
    carYear: number;
    carMakeId: number;
    carModelId: number;
    id?: number;
};

