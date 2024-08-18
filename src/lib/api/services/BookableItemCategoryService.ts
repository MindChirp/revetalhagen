/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateBookableItemCategoryDto } from '../models/CreateBookableItemCategoryDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class BookableItemCategoryService {
    /**
     * @param requestBody
     * @returns any Success
     * @throws ApiError
     */
    public static postApiBookableItemCategory(
        requestBody?: CreateBookableItemCategoryDto,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/BookableItemCategory',
            body: requestBody,
            mediaType: 'application/json-patch+json',
        });
    }
    /**
     * @returns any Success
     * @throws ApiError
     */
    public static getApiBookableItemCategory(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/BookableItemCategory',
        });
    }
}
