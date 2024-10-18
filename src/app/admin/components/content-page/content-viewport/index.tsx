"use client";

import { useAtomValue } from "jotai";
import { pageAtom } from "../navigation-graph";
import SubPages from "../navigation-graph/subpages";

export default function ContentViewport() {
  const page = useAtomValue(pageAtom);

  return (
    <div className="w-full">
      {page === "subpages" && <SubPages />}
      {page === "hero" && <div>Velkomst</div>}
      {page === "other" && <div>Andre ting</div>}
    </div>
  );
}
