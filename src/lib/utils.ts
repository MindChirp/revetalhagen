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
  editArticle: "edit:article",
  deleteArticle: "delete:article",
  updateItem: "update:bookable_item",
  createItem: "create:bookable_item",
  deleteItem: "delete:bookable_item",
  createItemCategory: "create:bookable_item_category",
  deleteItemCategory: "delete:bookable_item_category",
  getPermissions: "get:permissions",
  getRoles: "get:roles",
  updateUserPermissions: "update:user-permissions",
  viewUsers: "view:users",
  updateContent: "update:content",
};

export const getDayProgressPercentage = (
  date: Date,
  /**
   * From what time of day should we start counting the percentage?
   */
  startBuffer: Date = new Date(new Date().setHours(0, 0, 0, 0)),
  /**
   * From what time of day should we stop counting the percentage?
   */
  endBuffer: Date = new Date(new Date().setHours(23, 59, 59, 999))
) => {
  const startBufferDuration =
    startBuffer.getTime() - new Date(new Date().setHours(0, 0, 0, 0)).getTime();

  const endBufferDuration =
    new Date(new Date().setHours(23, 59, 59, 999)).getTime() -
    endBuffer.getTime();

  const msSinceMidnight = date.getTime() - startBuffer.getTime();
  const msInDay =
    24 * 60 * 60 * 1000 - (startBufferDuration + endBufferDuration);
  const percentage = (msSinceMidnight / msInDay) * 100;
  return Math.min(Math.max(percentage, 0), 100).toFixed(2);
};
