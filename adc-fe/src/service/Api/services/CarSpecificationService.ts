/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CarMakeResponse } from '../models/CarMakeResponse';
import type { CarModelResponse } from '../models/CarModelResponse';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class CarSpecificationService {

    /**
     * @param limit
     * @param searchStr
     * @returns CarMakeResponse
     * @throws ApiError
     */
    public static getCarMakesBySearchStr(
        limit?: number,
        searchStr?: any,
    ): CancelablePromise<Array<CarMakeResponse>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/car-specification/makes',
            query: {
                'limit': limit,
                'searchStr': searchStr,
            },
        });
    }

    /**
     * @param makeId
     * @param searchStr
     * @returns CarModelResponse
     * @throws ApiError
     */
    public static getCarModelByMake(
        makeId: number,
        searchStr?: any,
    ): CancelablePromise<Array<CarModelResponse>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/car-specification/models',
            query: {
                'makeId': makeId,
                'searchStr': searchStr,
            },
        });
    }

}
