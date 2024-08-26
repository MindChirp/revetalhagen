"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

type CustomConfig = {
  revalidateTags?: string[];
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

  return fetch(process.env.NEXT_PUBLIC_API_URL + url, {
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
