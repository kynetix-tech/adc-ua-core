/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ImageUploadResponse } from '../models/ImageUploadResponse';
import type { PostCreateRequest } from '../models/PostCreateRequest';
import type { PostCreationResponse } from '../models/PostCreationResponse';
import type { PostResponse } from '../models/PostResponse';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class PostService {

    /**
     * @param userId
     * @returns PostResponse
     * @throws ApiError
     */
    public static getAllByUserId(
        userId: string,
    ): CancelablePromise<Array<PostResponse>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/post/all/{userId}',
            path: {
                'userId': userId,
            },
        });
    }

    /**
     * @param requestBody
     * @returns PostCreationResponse
     * @throws ApiError
     */
    public static createPost(
        requestBody: PostCreateRequest,
    ): CancelablePromise<PostCreationResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/post/new',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param formData
     * @returns ImageUploadResponse
     * @throws ApiError
     */
    public static uploadImage(
        formData: {
            file?: Blob;
        },
    ): CancelablePromise<ImageUploadResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/post/upload-image',
            formData: formData,
            mediaType: 'multipart/form-data',
        });
    }

    /**
     * @param id
     * @returns any
     * @throws ApiError
     */
    public static deletePost(
        id: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/post/{id}',
            path: {
                'id': id,
            },
        });
    }

}
