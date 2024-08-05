import ArticlePreview from "@/app/artikkel/[articleId]/components/article-preview";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DetailedNewsDto } from "@/lib/api";

interface PreviewModalProps {
  article: DetailedNewsDto;
  open?: boolean;
  onOpenChange?: (state: boolean) => void;
}
export default function PreviewModal({
  article,
  open,
  onOpenChange,
}: PreviewModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-screen w-fit block max-w-screen-xl">
        <ScrollArea className="w-fit h-[50vh]">
          <ArticlePreview
            article={
              article ?? {
                content: "",
                createdOn: new Date().toISOString(),
                id: "",
                lastEdited: new Date().toISOString(),
                publishedBy: {
                  avatarUri: "",
                  fullName: "",
                  id: "",
                },
                title: "",
              }
            }
          />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
