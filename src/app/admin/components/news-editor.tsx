"use client";

import "@blocknote/core/fonts/inter.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";

export default function NewsEditor() {
  // Creates a new editor instance.
  const editor = useCreateBlockNote();

  return (
    <div className="border-2 border-solid border-accent rounded-3xl p-3">
      <BlockNoteView editor={editor} lang="no-nb" />
    </div>
  );
}
