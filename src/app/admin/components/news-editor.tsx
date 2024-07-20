"use client";

import "@blocknote/core/fonts/inter.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
interface NewsEditorProps {
  onChange?: (value: string) => void;
}

export default function NewsEditor({ onChange, ...props }: NewsEditorProps) {
  // Creates a new editor instance.
  const editor = useCreateBlockNote();

  const changeHandler = () => {
    onChange?.(JSON.stringify(editor.document));
  };
  return (
    <div className="border-2 border-solid border-accent rounded-3xl p-3">
      <BlockNoteView editor={editor} lang="no-nb" onChange={changeHandler} />
    </div>
  );
}
