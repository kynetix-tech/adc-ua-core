/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { LikeRequest } from '../models/LikeRequest';
import type { LikeResponse } from '../models/LikeResponse';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class LikeCommentManageService {

    /**
     * @param requestBody
     * @returns LikeResponse
     * @throws ApiError
     */
    public static addLike(
        requestBody: LikeRequest,
    ): CancelablePromise<LikeResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/like-comment-manage/like',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param requestBody
     * @returns void
     * @throws ApiError
     */
    public static deleteLike(
        requestBody: LikeRequest,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/like-comment-manage/like',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

}
