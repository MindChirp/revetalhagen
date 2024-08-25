import {
  DetailedBookableItemCategoryDto,
  SimpleBookableItemDto,
} from "@/lib/api";
import { IFetch } from "@/lib/IFetch";
import ItemFormWrapper from "./item-form/form-wrapper";
import ItemsList from "./items-list";

export default async function ItemsTab() {
  const items = await IFetch<SimpleBookableItemDto[]>({
    url: "/api/BookableItem",
    config: {
      method: "GET",
      next: {
        tags: ["bookableitems"],
      },
    },
  });
  const categories = await IFetch<DetailedBookableItemCategoryDto[]>({
    url: "/api/BookableItemCategory",
    config: {
      method: "GET",
      next: {
        tags: ["bookableitemcategories"],
      },
    },
  });

  return (
    <div>
      <ItemsList items={items} categories={categories} />
      <ItemFormWrapper categories={categories} />
    </div>
  );
}
