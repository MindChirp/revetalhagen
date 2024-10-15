/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ContentDto } from '../models/ContentDto';
import type { CreateContentDto } from '../models/CreateContentDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ContentService {
    /**
     * @param slugId
     * @returns ContentDto Success
     * @throws ApiError
     */
    public static getApiContent(
        slugId: string,
    ): CancelablePromise<Array<ContentDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Content/{slugId}',
            path: {
                'slugId': slugId,
            },
        });
    }
    /**
     * @param requestBody
     * @returns ContentDto Success
     * @throws ApiError
     */
    public static postApiContent(
        requestBody?: CreateContentDto,
    ): CancelablePromise<ContentDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/Content',
            body: requestBody,
            mediaType: 'application/json-patch+json',
        });
    }
    /**
     * @param id
     * @param requestBody
     * @returns ContentDto Success
     * @throws ApiError
     */
    public static putApiContent(
        id: number,
        requestBody?: CreateContentDto,
    ): CancelablePromise<ContentDto> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/Content/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json-patch+json',
        });
    }
}
