import { IFetch } from "@/lib/IFetch";
import ItemsList from "./items-list";
import {
  DetailedBookableItemCategoryDto,
  SimpleBookableItemDto,
} from "@/lib/api";
import ItemForm from "./item-form";

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
      <ItemsList items={items} />
      <ItemForm className="mt-10" categories={categories} />
    </div>
  );
}
