/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateBookableItemCategoryDto } from '../models/CreateBookableItemCategoryDto';
import type { DetailedBookableItemCategoryDto } from '../models/DetailedBookableItemCategoryDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class BookableItemCategoryService {
    /**
     * @param requestBody
     * @returns DetailedBookableItemCategoryDto Success
     * @throws ApiError
     */
    public static postApiBookableItemCategory(
        requestBody?: CreateBookableItemCategoryDto,
    ): CancelablePromise<DetailedBookableItemCategoryDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/BookableItemCategory',
            body: requestBody,
            mediaType: 'application/json-patch+json',
        });
    }
    /**
     * @returns DetailedBookableItemCategoryDto Success
     * @throws ApiError
     */
    public static getApiBookableItemCategory(): CancelablePromise<Array<DetailedBookableItemCategoryDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/BookableItemCategory',
        });
    }
    /**
     * @param id
     * @returns DetailedBookableItemCategoryDto Success
     * @throws ApiError
     */
    public static deleteApiBookableItemCategory(
        id: number,
    ): CancelablePromise<DetailedBookableItemCategoryDto> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/BookableItemCategory/{id}',
            path: {
                'id': id,
            },
        });
    }
}
