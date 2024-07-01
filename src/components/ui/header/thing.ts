"use server";

import { NewsService, OpenAPI } from "@/lib/api";
import { getSession } from "@auth0/nextjs-auth0";

export const postNews = async (content: string, title: string) => {
  const session = await getSession();
  OpenAPI.BASE = process.env.NEXT_PUBLIC_API_URL ?? "";
  OpenAPI.TOKEN = session?.accessToken;
  return NewsService.postApiNews({
    content,
    title,
  }).catch((err) => console.log(err));
};
