/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { UserResponse } from './UserResponse';

export type CommentViewResponse = {
    id: number;
    text: string;
    postId: number;
    createdAt: string;
    user: UserResponse;
};

