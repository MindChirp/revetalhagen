/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateBookableItemDto } from '../models/CreateBookableItemDto';
import type { DetailedBookableItemDto } from '../models/DetailedBookableItemDto';
import type { UpdateBookableItemDto } from '../models/UpdateBookableItemDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class BookableItemService {
    /**
     * @param requestBody
     * @returns DetailedBookableItemDto Success
     * @throws ApiError
     */
    public static postApiBookableItem(
        requestBody?: CreateBookableItemDto,
    ): CancelablePromise<DetailedBookableItemDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/BookableItem',
            body: requestBody,
            mediaType: 'application/json-patch+json',
        });
    }
    /**
     * @returns DetailedBookableItemDto Success
     * @throws ApiError
     */
    public static getApiBookableItem(): CancelablePromise<Array<DetailedBookableItemDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/BookableItem',
        });
    }
    /**
     * @param id
     * @returns DetailedBookableItemDto Success
     * @throws ApiError
     */
    public static getApiBookableItem1(
        id: number,
    ): CancelablePromise<DetailedBookableItemDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/BookableItem/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param id
     * @returns DetailedBookableItemDto Success
     * @throws ApiError
     */
    public static deleteApiBookableItem(
        id: number,
    ): CancelablePromise<DetailedBookableItemDto> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/BookableItem/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param id
     * @param requestBody
     * @returns any Success
     * @throws ApiError
     */
    public static putApiBookableItem(
        id: number,
        requestBody?: UpdateBookableItemDto,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/BookableItem/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json-patch+json',
        });
    }
}
