/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CommentDto } from "../models/CommentDto";
import type { CreateCommentDto } from "../models/CreateCommentDto";
import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";
export class CommentService {
  /**
   * @param articleId
   * @param requestBody
   * @returns any Success
   * @throws ApiError
   */
  public static postApiCommentArticles(
    articleId: number,
    requestBody?: CreateCommentDto
  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/Comment/articles/{articleId}",
      path: {
        articleId: articleId,
      },
      body: requestBody,
      mediaType: "application/json-patch+json",
    });
  }
  /**
   * @param articleId
   * @returns CommentDto Success
   * @throws ApiError
   */
  public static getApiCommentArticles(
    articleId: number
  ): CancelablePromise<CommentDto> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/Comment/articles/{articleId}",
      path: {
        articleId: articleId,
      },
    });
  }
  /**
   * @param commentId
   * @returns any Success
   * @throws ApiError
   */
  public static deleteApiComment(commentId: number): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: "DELETE",
      url: "/api/Comment/{commentId}",
      path: {
        commentId: commentId,
      },
    });
  }
}
