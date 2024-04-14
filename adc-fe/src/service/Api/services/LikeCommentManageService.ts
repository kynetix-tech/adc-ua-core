/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CommentCreateResponse } from '../models/CommentCreateResponse';
import type { CommentDeleteRequest } from '../models/CommentDeleteRequest';
import type { CommentGetCreateRequest } from '../models/CommentGetCreateRequest';
import type { CommentViewResponse } from '../models/CommentViewResponse';
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

    /**
     * @param requestBody
     * @returns CommentCreateResponse
     * @throws ApiError
     */
    public static createComment(
        requestBody: CommentGetCreateRequest,
    ): CancelablePromise<CommentCreateResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/like-comment-manage/comment',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param requestBody
     * @returns void
     * @throws ApiError
     */
    public static deleteComment(
        requestBody: CommentDeleteRequest,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/like-comment-manage/comment',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param postId
     * @param limit
     * @param offset
     * @returns CommentViewResponse
     * @throws ApiError
     */
    public static getNewestComments(
        postId: string,
        limit?: number,
        offset?: number,
    ): CancelablePromise<Array<CommentViewResponse>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/like-comment-manage/comment/newest',
            query: {
                'postId': postId,
                'limit': limit,
                'offset': offset,
            },
        });
    }

}
