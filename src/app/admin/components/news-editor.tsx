"use client";

import "@blocknote/core/fonts/inter.css";
import { SideMenu, useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/shadcn/style.css";
interface NewsEditorProps {
  onChange?: (value: string) => void;
  value?: string;
}

export default function NewsEditor({ onChange, value }: NewsEditorProps) {
  // Creates a new editor instance.
  const editor = useCreateBlockNote({
    initialContent: value && JSON.parse(value ?? ""),
  });
  const changeHandler = () => {
    onChange?.(JSON.stringify(editor.document));
  };
  return (
    <div className="border-2 border-solid border-input rounded-3xl p-3">
      <BlockNoteView
        onClick={(e) => e.preventDefault()}
        className="min-h-52 px-4"
        editor={editor}
        lang="no-nb"
        onChange={changeHandler}
        theme={"light"}
        content={value}
      />
    </div>
  );
}
