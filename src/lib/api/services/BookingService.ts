/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateBookingDto } from '../models/CreateBookingDto';
import type { DetailedBookingDto } from '../models/DetailedBookingDto';
import type { SimpleBookingDto } from '../models/SimpleBookingDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class BookingService {
    /**
     * @param itemId
     * @param requestBody
     * @returns DetailedBookingDto Success
     * @throws ApiError
     */
    public static postApiBooking(
        itemId: number,
        requestBody?: CreateBookingDto,
    ): CancelablePromise<DetailedBookingDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/Booking/{itemId}',
            path: {
                'itemId': itemId,
            },
            body: requestBody,
            mediaType: 'application/json-patch+json',
        });
    }
    /**
     * @param title
     * @param sortBy
     * @param pageNumber
     * @param pageSize
     * @returns SimpleBookingDto Success
     * @throws ApiError
     */
    public static getApiBooking(
        title?: string,
        sortBy?: string,
        pageNumber?: number,
        pageSize?: number,
    ): CancelablePromise<Array<SimpleBookingDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Booking',
            query: {
                'Title': title,
                'SortBy': sortBy,
                'PageNumber': pageNumber,
                'PageSize': pageSize,
            },
        });
    }
}
