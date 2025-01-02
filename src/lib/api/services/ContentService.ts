/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ContentDto } from '../models/ContentDto';
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
     * @param formData
     * @returns ContentDto Success
     * @throws ApiError
     */
    public static postApiContent(
        formData?: {
            Title: string;
            Content: string;
            Slug: string;
            Image?: Blob;
        },
    ): CancelablePromise<ContentDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/Content',
            formData: formData,
            mediaType: 'multipart/form-data',
        });
    }
    /**
     * @param id
     * @param formData
     * @returns ContentDto Success
     * @throws ApiError
     */
    public static putApiContent(
        id: number,
        formData?: {
            Title: string;
            Content: string;
            Slug: string;
            Image?: Blob;
        },
    ): CancelablePromise<ContentDto> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/Content/{id}',
            path: {
                'id': id,
            },
            formData: formData,
            mediaType: 'multipart/form-data',
        });
    }
    /**
     * @param id
     * @returns ContentDto Success
     * @throws ApiError
     */
    public static deleteApiContent(
        id: number,
    ): CancelablePromise<ContentDto> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/Content/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param formData
     * @returns string Success
     * @throws ApiError
     */
    public static postBlobs(
        formData?: {
            files?: Array<Blob>;
        },
    ): CancelablePromise<Array<string>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/blobs',
            formData: formData,
            mediaType: 'multipart/form-data',
        });
    }
    /**
     * @param blobId
     * @returns any Success
     * @throws ApiError
     */
    public static deleteApiContentBlobs(
        blobId: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/Content/blobs/{blobId}',
            path: {
                'blobId': blobId,
            },
        });
    }
}
