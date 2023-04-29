/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CarMakeResponse } from './CarMakeResponse';
import type { CarModelResponse } from './CarModelResponse';
import type { ContentItem } from './ContentItem';
import type { LikeResponse } from './LikeResponse';
import type { UserResponse } from './UserResponse';

export type PostResponse = {
    title: string;
    content: Array<ContentItem>;
    carYear: number;
    carMake: CarMakeResponse;
    carModel: CarModelResponse;
    user: UserResponse;
    likes: Array<LikeResponse>;
    createdAt: string;
    updatedAt: string;
    id: number;
};

