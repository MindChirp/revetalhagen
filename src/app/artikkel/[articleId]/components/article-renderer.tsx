"use client";
import { DetailedNewsDto } from "@/lib/api";
import { BlockNoteView } from "@blocknote/mantine";

import "@blocknote/mantine/style.css";
import { useCreateBlockNote } from "@blocknote/react";
import { useState } from "react";
interface ArticleRendererProps {
  article: DetailedNewsDto;
}

export default function ArticleRenderer({ article }: ArticleRendererProps) {
  const [htmlString, setHtmlString] = useState<string>("");
  const editor = useCreateBlockNote({
    initialContent: article.content && JSON.parse(article.content ?? ""),
  });
  editor;
  // editor.blocksToFullHTML(JSON.parse(article.content ?? "")).then((html) => {
  //   console.log(html);
  //   setHtmlString(html);
  // });

  return (
    <div className="w-full md:p-5">
      <div dangerouslySetInnerHTML={{ __html: htmlString }} />
      <BlockNoteView
        editable={false}
        editor={editor}
        lang="no-nb"
        theme={"light"}
      />
    </div>
  );
}
