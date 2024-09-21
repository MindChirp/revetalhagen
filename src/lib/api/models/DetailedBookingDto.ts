/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BookingStatus } from './BookingStatus';
import type { DetailedBookableItemDto } from './DetailedBookableItemDto';
import type { SimpleUserDto } from './SimpleUserDto';
export type DetailedBookingDto = {
    id?: number;
    fromDate?: string;
    toDate?: string;
    bookableItem?: DetailedBookableItemDto;
    applicationText?: string | null;
    bookedBy?: SimpleUserDto;
    status?: BookingStatus;
};

