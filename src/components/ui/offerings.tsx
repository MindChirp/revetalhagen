import {
  BedIcon,
  CalendarIcon,
  ClockIcon,
  PersonStandingIcon,
} from "lucide-react";
import { MenuLink } from "./header/about";

export default function Offerings() {
  return (
    <div className="min-w-80 p-4 flex w-full flex-col">
      <MenuLink href="/utleie">
        <BedIcon size={16} />
        Utleie
      </MenuLink>
      <MenuLink href="/arrangementer">
        <CalendarIcon size={16} />
        Arrangementer
      </MenuLink>
      <MenuLink href="/aktiviteter">
        <PersonStandingIcon size={16} />
        Aktiviteter
      </MenuLink>
    </div>
  );
}
