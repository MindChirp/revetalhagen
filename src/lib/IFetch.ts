"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

type CustomConfig = {
  revalidateTags?: string[];
  queryParams?: Record<string, unknown>;
  formData?: FormData;
};

interface IFetchProps {
  url: string;
  config?: RequestInit & CustomConfig;
}

export interface ErrorType {
  status?: number;
  statusText?: string;
  response?: any;
}

const TOKEN_HEADER_NAME = "Authorization";
const ACCESS_TOKEN = "__session";

export const IFetch = async <T extends unknown>({
  url,
  config,
}: IFetchProps) => {
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

  let qParamString = "";
  if (config?.queryParams) {
    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(config.queryParams)) {
      params.append(key, String(value));
    }
    qParamString = "?" + params.toString();
  }

  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_API_URL + url + qParamString,
      {
        ...config,
        headers,
      }
    );

    const contentType = response.headers.get("content-type");

    for (const tag of config?.revalidateTags ?? []) {
      console.log("REVALIDATING: ", tag);
      revalidateTag(tag);
    }

    let data: any;
    if (contentType && contentType.includes("application/json")) {
      data = await response.json();
    } else {
      data = await response.text();
    }

    if (!response.ok) {
      throw {
        status: response.status,
        statusText: response.statusText,
        response: data,
      } as RequestResponse;
    }

    return data as T;
  } catch (error) {
    console.error(error);
    return {
      status: (error as any).status || 500,
      response: error,
      statusText: (error as any).statusText || "Unknown error",
    } as RequestResponse;
  }
};

export type RequestResponse = {
  status: number;
  statusText: string;
  response: any;
};
