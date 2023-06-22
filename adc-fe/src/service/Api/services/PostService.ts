/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ImageUploadResponse } from '../models/ImageUploadResponse';
import type { PostCreateUpdateRequest } from '../models/PostCreateUpdateRequest';
import type { PostCreateUpdateResponse } from '../models/PostCreateUpdateResponse';
import type { PostResponse } from '../models/PostResponse';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class PostService {

    /**
     * @param userId
     * @param limit
     * @param offset
     * @returns PostResponse
     * @throws ApiError
     */
    public static getAllByUserId(
        userId: string,
        limit?: number,
        offset?: number,
    ): CancelablePromise<Array<PostResponse>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/post/user/{userId}',
            path: {
                'userId': userId,
            },
            query: {
                'limit': limit,
                'offset': offset,
            },
        });
    }

    /**
     * @param requestBody
     * @returns PostCreateUpdateResponse
     * @throws ApiError
     */
    public static createPost(
        requestBody: PostCreateUpdateRequest,
    ): CancelablePromise<PostCreateUpdateResponse> {
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
     * @param carMakeId
     * @param carModelId
     * @param limit
     * @param offset
     * @param searchStr
     * @returns PostResponse
     * @throws ApiError
     */
    public static getNewest(
        carMakeId?: number,
        carModelId?: number,
        limit?: number,
        offset?: number,
        searchStr?: string,
    ): CancelablePromise<Array<PostResponse>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/post/newest',
            query: {
                'carMakeId': carMakeId,
                'carModelId': carModelId,
                'limit': limit,
                'offset': offset,
                'searchStr': searchStr,
            },
        });
    }

    /**
     * @param id
     * @returns PostResponse
     * @throws ApiError
     */
    public static getPostById(
        id: number,
    ): CancelablePromise<PostResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/post/{id}',
            path: {
                'id': id,
            },
        });
    }

    /**
     * @param id
     * @returns void
     * @throws ApiError
     */
    public static deletePost(
        id: number,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/post/{id}',
            path: {
                'id': id,
            },
        });
    }

    /**
     * @param requestBody
     * @returns PostCreateUpdateResponse
     * @throws ApiError
     */
    public static updatePost(
        requestBody: PostCreateUpdateRequest,
    ): CancelablePromise<PostCreateUpdateResponse> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/post/update',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

}
