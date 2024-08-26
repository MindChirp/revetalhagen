/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PermissionDto } from '../models/PermissionDto';
import type { RoleDto } from '../models/RoleDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class PermissionsService {
    /**
     * @returns PermissionDto Success
     * @throws ApiError
     */
    public static getApiPermissions(): CancelablePromise<Array<PermissionDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Permissions',
        });
    }
    /**
     * @returns RoleDto Success
     * @throws ApiError
     */
    public static getApiPermissionsRoles(): CancelablePromise<Array<RoleDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Permissions/roles',
        });
    }
}
