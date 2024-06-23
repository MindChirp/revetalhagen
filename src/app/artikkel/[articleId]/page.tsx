import PageWrapper from "@/components/layout/page-wrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import UserAvatar from "@/components/ui/header/user-avatar";
import { Separator } from "@/components/ui/separator";
import Typography from "@/components/ui/typography";
import { PathParams } from "@/lib/utils";
import { ClockIcon } from "lucide-react";
import Image from "next/image";
import { format } from "date-fns";
import BackButton from "@/components/ui/back-button";

const ArticlePage = ({ params }: PathParams<{ articleId: string }>) => {
  const { articleId } = params;
  // Fetch news info
  return (
    <PageWrapper>
      <div className="flex flex-col gap-5 relative w-fit mx-auto">
        <BackButton className="absolute -top-5 -translate-y-full" />
        <Card className="mx-auto md:w-fit w-full md:min-w-[700px]">
          <CardHeader>
            <div className="relative px-5 w-full h-56">
              <Image
                src="/roar-holt-gard.jpg"
                alt="Roat på Holt Gård"
                fill
                objectFit="cover"
                objectPosition="center"
                className="w-full h-full rounded-2xl"
              />
            </div>
          </CardHeader>
          <CardContent>
            <div className="w-full flex gap-5 items-center justify-center flex-col">
              <Typography className="text-center">Nye grønnsaker!</Typography>
              <div className="flex gap-5 w-fit items-center">
                <div className="flex gap-2.5 items-center">
                  <UserAvatar src={"/bryggerhuset.jpg"} />
                  <Typography
                    variant="small"
                    className="text-primary-foreground"
                  >
                    Ola Nordmann
                  </Typography>
                </div>
                <div className="h-5 w-[1px] bg-primary-foreground md:block hidden" />
                <div className="flex gap-2.5 items-center">
                  <ClockIcon size={16} className="text-primary-foreground" />
                  <Typography
                    variant="small"
                    className="text-primary-foreground"
                  >
                    {format(new Date() as Date, "dd.MM.yyyy")}
                  </Typography>
                </div>
              </div>
              <Typography
                variant="p"
                className="md:max-w-[600px] w-fit md:mx-20"
              >
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Neque
                in impedit aliquam magnam cumque vitae magni a commodi
                voluptatem. Numquam tenetur minima ex quod similique fuga
                dignissimos vero sed officiis. Lorem ipsum, dolor sit amet
                consectetur adipisicing elit. Neque in impedit aliquam magnam
                cumque vitae magni a commodi voluptatem. Numquam tenetur minima
                ex quod similique fuga dignissimos vero sed officiis.
              </Typography>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageWrapper>
  );
};

export default ArticlePage;
