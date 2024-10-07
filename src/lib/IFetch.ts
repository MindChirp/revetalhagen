"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

type CustomConfig = {
  revalidateTags?: string[];
  queryParams?: Record<string, unknown>;
  // Add a new property to handle file uploads
  formData?: FormData;
};

interface IFetchProps {
  url: string;
  config?: RequestInit & CustomConfig;
}

export interface ErrorType {
  status?: number;
  statusText?: string;
  response?: Record<string, unknown>;
}

const TOKEN_HEADER_NAME = "Authorization";
const ACCESS_TOKEN = "__session";

export const IFetch = <T extends unknown>({ url, config }: IFetchProps) => {
  let headers: Record<string, string> = {};
  if (!config?.formData) {
    // Only set the Authorization header if not uploading files
    headers[TOKEN_HEADER_NAME] = ("Bearer " +
      cookies().get(ACCESS_TOKEN)?.value) as string;
  }

  headers = {
    ...headers,
    ...(config?.headers as Record<string, string>),
  };

  let qParamString = "?";
  if (config?.queryParams) {
    for (const [key, value] of Object.entries(config.queryParams)) {
      if (qParamString !== "?") {
        qParamString += "&";
      }
      qParamString += `${encodeURIComponent(key)}=${encodeURIComponent(
        value + ""
      )}`;
    }
  }

  const body = config?.formData ? config.formData : undefined;

  // Adjust headers if uploading files
  if (config?.formData) {
    if (headers["Content-Type"]) {
      delete headers["Content-Type"];
    }
  }

  return fetch(process.env.NEXT_PUBLIC_API_URL + url + qParamString, {
    ...config,
    headers,
    body, // Use the FormData object directly as the body
  })
    .then(async (response) => {
      const contentType = response.headers.get("content-type");
      if (
        !contentType ||
        !contentType.includes("application/json") ||
        !response.ok ||
        response.json === undefined
      ) {
        if (response.json) {
          return response.json().then((responseData: RequestResponse) => {
            throw responseData;
          });
        } else {
          throw { statusText: response.statusText } as RequestResponse;
        }
      }
      return response.json().then((responseData: T) => responseData);
    })
    .catch((error) => {
      return {
        status: error.status || 500,
        response: error,
        statusText: error.statusText || "Unknown error",
      } as RequestResponse;
    });
};

export type RequestResponse = {
  status: number;
  statusText: string;
  response: Record<string, unknown>;
};
