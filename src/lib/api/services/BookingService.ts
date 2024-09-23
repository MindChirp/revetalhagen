/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BookingStatus } from '../models/BookingStatus';
import type { ChangeBookingStateDto } from '../models/ChangeBookingStateDto';
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
     * @param fromDate
     * @param toDate
     * @param status
     * @param itemId
     * @param title
     * @param sortBy
     * @param pageNumber
     * @param pageSize
     * @returns SimpleBookingDto Success
     * @throws ApiError
     */
    public static getApiBooking(
        fromDate?: string,
        toDate?: string,
        status?: BookingStatus,
        itemId?: number,
        title?: string,
        sortBy?: string,
        pageNumber?: number,
        pageSize?: number,
    ): CancelablePromise<Array<SimpleBookingDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Booking',
            query: {
                'FromDate': fromDate,
                'ToDate': toDate,
                'Status': status,
                'ItemId': itemId,
                'Title': title,
                'SortBy': sortBy,
                'PageNumber': pageNumber,
                'PageSize': pageSize,
            },
        });
    }
    /**
     * @param bookingId
     * @param requestBody
     * @returns any Success
     * @throws ApiError
     */
    public static postApiBookingState(
        bookingId: number,
        requestBody?: ChangeBookingStateDto,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/Booking/state/{bookingId}',
            path: {
                'bookingId': bookingId,
            },
            body: requestBody,
            mediaType: 'application/json-patch+json',
        });
    }
}
