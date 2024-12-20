import { ContentDto, CreateContentDto } from "@/lib/api";
import { IFetch } from "@/lib/IFetch";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

export const usePageContent = (slug: string) => {
  return useSWR(slug, contentFetcher);
};

const contentFetcher = (slug: string) =>
  IFetch<ContentDto[]>({
    url: `/api/Content/${encodeURIComponent(slug)}`,
    config: {
      next: {
        tags: [slug],
      },
    },
  })
    .then((res) => {
      if (Array.isArray(res)) return res;

      // If the response is not of type array, we have an error
      throw new Error("Invalid response");
    })
    .catch((err) => {
      console.error(err);
      throw new Error("Invalid response");
    });

export const useMutatePageContent = (slug: string) => {
  return useSWRMutation(
    slug,
    (
      tag,
      {
        arg,
      }: {
        arg: {
          data: CreateContentDto;
          id?: number;
        };
      }
    ) =>
      IFetch({
        url: `/api/Content${arg?.id ? `/${arg?.id}` : ""}`,
        config: {
          revalidateTags: [tag],
          method: `${arg?.id ? "PUT" : "POST"}`,
          body: (() => {
            const formData = new FormData();
            Object.entries(arg.data).forEach(([key, value]) => {
              const capitalizedKey = key.charAt(0).toUpperCase() + key.slice(1);
              if (value instanceof File) {
                formData.append(capitalizedKey, value);
              } else {
                formData.append(capitalizedKey, value?.toString() ?? "");
              }
            });
            return formData;
          })(),
          next: {
            tags: [tag],
          },
        },
      })
  );
};
