/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DetailedUserDto } from '../models/DetailedUserDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class UserService {
    /**
     * @returns any Success
     * @throws ApiError
     */
    public static postApiUser(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/User',
        });
    }
    /**
     * @param id
     * @returns DetailedUserDto Success
     * @throws ApiError
     */
    public static getApiUser(
        id: number,
    ): CancelablePromise<DetailedUserDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/User/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `Not Found`,
            },
        });
    }
}
