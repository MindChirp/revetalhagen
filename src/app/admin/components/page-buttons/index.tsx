"use client";

import { Button, ButtonProps } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { routes } from "@/lib/routes";
import { hasPermissions, PERMISSIONS } from "@/lib/utils";
import {
  BedIcon,
  HandCoinsIcon,
  LightbulbIcon,
  NewspaperIcon,
  TextIcon,
  Users,
} from "lucide-react";
import { useRouter } from "next/navigation";

const Buttons: {
  label: string;
  icon: React.ReactNode;
  props?: ButtonProps;
  requiresPermissions?: {
    permissions: string[];
    requiresAll?: boolean;
  };
}[] = [
  {
    label: "Nyheter",
    icon: <NewspaperIcon size={16} />,
    requiresPermissions: {
      permissions: [PERMISSIONS.createArticle, PERMISSIONS.editArticle],
    },
  },
  {
    label: "Brukere",
    icon: <Users size={16} />,
    requiresPermissions: {
      permissions: [PERMISSIONS.viewUsers],
    },
  },
  { label: "Sponsorer", icon: <HandCoinsIcon size={16} /> },
  {
    label: "Utleie",
    icon: <BedIcon size={16} />,
    requiresPermissions: {
      permissions: [
        PERMISSIONS.createItem,
        PERMISSIONS.updateItem,
        PERMISSIONS.deleteItem,
      ],
    },
  },
  { label: "Innhold", icon: <TextIcon size={16} /> },
  {
    label: "Interessegrupper",
    icon: <LightbulbIcon size={16} />,
    props: { disabled: true, title: "Fremtidig funksjon!" },
  },
];

interface PageButtonsProps {
  currentPage?: string;
  userPermissions: string[];
}

export default function PageButtons({
  currentPage,
  userPermissions,
}: PageButtonsProps) {
  const router = useRouter();

  return (
    <Card className="order-1 md:order-2 h-fit sticky top-28">
      <div className="flex flex-col p-5 md:min-w-72 md:w-fit w-full gap-1">
        {Buttons.map((page, _i) => {
          if (page.requiresPermissions) {
            const shouldDisplay = hasPermissions(
              userPermissions,
              page.requiresPermissions.permissions,
              page.requiresPermissions.requiresAll ?? false
            );
            if (!shouldDisplay) return null;
          }

          return (
            <Button
              variant={
                page.label.toLowerCase() != currentPage?.toLowerCase()
                  ? "ghost"
                  : "default"
              }
              key={_i}
              className="justify-start gap-2.5 w-full"
              onClick={() =>
                router.replace(
                  `${routes.ADMIN}?page=${page.label.toLowerCase()}`
                )
              }
              {...page.props}
            >
              {page.icon}
              {page.label}
            </Button>
          );
        })}
      </div>
    </Card>
  );
}
