/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SimpleBookableItemDto } from './SimpleBookableItemDto';
import type { SimpleUserDto } from './SimpleUserDto';
export type SimpleBookingDto = {
    id?: number;
    fromDate?: string;
    toDate?: string;
    bookableItem?: SimpleBookableItemDto;
    applicationText?: string | null;
    bookedBy?: SimpleUserDto;
};

