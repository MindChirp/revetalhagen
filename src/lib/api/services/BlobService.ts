/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class BlobService {
    /**
     * @param formData
     * @returns string Success
     * @throws ApiError
     */
    public static postApiBlob(
        formData?: {
            ContentType?: string;
            ContentDisposition?: string;
            Headers?: Record<string, Array<string>>;
            Length?: number;
            Name?: string;
            FileName?: string;
        },
    ): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/Blob',
            formData: formData,
            mediaType: 'multipart/form-data',
        });
    }
}
