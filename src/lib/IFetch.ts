"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

type CustomConfig = {
  revalidateTags?: string[];
  queryParams?: Record<string, unknown>;
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
  let headers: HeadersInit = {};
  headers[TOKEN_HEADER_NAME] = ("Bearer " +
    cookies().get(ACCESS_TOKEN)?.value) as string;
  headers = {
    ...headers,
    ...config?.headers,
  };

  let qParamString = "?";
  if (config?.queryParams) {
    // Iterate throught each key-value pair in the queryParams object
    for (const [key, value] of Object.entries(config.queryParams)) {
      // If the key-value pair is not the first key-value pair, add an ampersand to the query parameter string
      if (qParamString !== "?") {
        qParamString += "&";
      }

      // Add the key-value pair to the query parameter string
      qParamString += `${encodeURIComponent(key)}=${encodeURIComponent(
        value + ""
      )}`;
    }
  }

  return fetch(process.env.NEXT_PUBLIC_API_URL + url + qParamString, {
    ...config,
    headers,
  })
    .then(async (res) => {
      if (!res.ok) {
        if (res.status === 500) {
          throw new Error("Internal server error");
        }

        const message = await res.json();
        const errorObject: ErrorType = {
          status: res.status,
          statusText: res.statusText,
          response: message,
        };
        throw new Error(JSON.stringify(errorObject));
      }

      for (const tag of config?.revalidateTags ?? []) {
        revalidateTag(tag);
      }

      let json;
      try {
        json = await res.json();
      } catch {
        return res.statusText;
      }
      return json;
    })
    .catch((err) => {
      console.log(err);
      return err;
    }) as Promise<T>;
};
