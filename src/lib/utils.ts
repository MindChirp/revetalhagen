import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type PathParams<T> = { params: T };

export interface ParamsProps<T extends { [key: string]: string }> {
  searchParams?: T;
}

export function hasPermissions(
  permissions: string[],
  requiredPermissions: string[],
  requiresAll: boolean = true
) {
  if (requiresAll) {
    if (permissions) {
      return requiredPermissions.every((permission) =>
        permissions?.includes(permission)
      );
    }
  } else {
    if (permissions) {
      return requiredPermissions.some((permission) =>
        permissions?.includes(permission)
      );
    }
  }
  return false;
}

export const PERMISSIONS = {
  createArticle: "create:article",
  editArticle: "update:article",
  deleteArticle: "delete:article",
  updateItem: "update:bookable_item",
  createItem: "create:bookable_item",
  deleteItem: "delete:bookable_item",
  createItemCategory: "create:bookable_item_category",
  deleteItemCategory: "delete:bookable_item_category",
  getPermissions: "get:permissions",
  getRoles: "get:roles",
  updateUserPermissions: "update:user_permissions",
  viewUsers: "view:users",
};
