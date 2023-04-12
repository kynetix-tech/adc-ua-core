/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CarMakeResponse } from './CarMakeResponse';
import type { CarModelResponse } from './CarModelResponse';
import type { ContentItem } from './ContentItem';
import type { UserResponse } from './UserResponse';

export type PostResponse = {
    title: string;
    content: Array<ContentItem>;
    carYear: number;
    carMake: CarMakeResponse;
    carModel: CarModelResponse;
    user: UserResponse;
    createdAt: string;
    updatedAt: string;
    likes: number;
    id: number;
};

