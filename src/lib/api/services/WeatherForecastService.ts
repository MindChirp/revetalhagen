/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { WeatherForecast } from '../models/WeatherForecast';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class WeatherForecastService {
    /**
     * @returns WeatherForecast Success
     * @throws ApiError
     */
    public static getWeatherForecast(): CancelablePromise<Array<WeatherForecast>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/WeatherForecast',
        });
    }
}
