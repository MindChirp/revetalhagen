/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateBookableItemDto } from '../models/CreateBookableItemDto';
import type { DetailedBookableItemDto } from '../models/DetailedBookableItemDto';
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
}
