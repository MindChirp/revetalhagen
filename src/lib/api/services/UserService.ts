/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DetailedUserDto } from '../models/DetailedUserDto';
import type { SimpleUserDto } from '../models/SimpleUserDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class UserService {
    /**
     * @param username
     * @param requestBody
     * @returns any Success
     * @throws ApiError
     */
    public static putApiUserPermissions(
        username: string,
        requestBody?: Array<number>,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/User/{username}/permissions',
            path: {
                'username': username,
            },
            body: requestBody,
            mediaType: 'application/json-patch+json',
        });
    }
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
     * @param title
     * @param sortBy
     * @param pageNumber
     * @param pageSize
     * @returns SimpleUserDto Success
     * @throws ApiError
     */
    public static getApiUser(
        title?: string,
        sortBy?: string,
        pageNumber?: number,
        pageSize?: number,
    ): CancelablePromise<Array<SimpleUserDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/User',
            query: {
                'Title': title,
                'SortBy': sortBy,
                'PageNumber': pageNumber,
                'PageSize': pageSize,
            },
        });
    }
    /**
     * @param id
     * @returns DetailedUserDto Success
     * @throws ApiError
     */
    public static getApiUser1(
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
