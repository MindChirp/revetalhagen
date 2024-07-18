/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateNewsDto } from "../models/CreateNewsDto";
import type { DetailedNewsDto } from "../models/DetailedNewsDto";
import type { SimpleNewsDto } from "../models/SimpleNewsDto";
import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";
export class NewsService {
  /**
   * @param requestBody
   * @returns DetailedNewsDto Created
   * @throws ApiError
   */
  public static postApiNews(
    requestBody?: CreateNewsDto
  ): CancelablePromise<DetailedNewsDto> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/News",
      body: requestBody,
      mediaType: "application/json-patch+json",
      errors: {
        400: `Bad Request`,
        404: `Not Found`,
      },
    });
  }
  /**
   * @param title
   * @param sortBy
   * @param pageNumber
   * @param pageSize
   * @returns SimpleNewsDto Success
   * @throws ApiError
   */
  public static getApiNews(
    title?: string,
    sortBy?: string,
    pageNumber?: number,
    pageSize?: number
  ): CancelablePromise<Array<SimpleNewsDto>> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/News",
      query: {
        Title: title,
        SortBy: sortBy,
        PageNumber: pageNumber,
        PageSize: pageSize,
      },
    });
  }
  /**
   * @param id
   * @returns DetailedNewsDto Success
   * @throws ApiError
   */
  public static getApiNews1(id: number): CancelablePromise<DetailedNewsDto> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/News/{id}",
      path: {
        id: id,
      },
      errors: {
        404: `Not Found`,
      },
    });
  }
}
