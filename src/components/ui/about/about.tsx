import { ContentDto } from "@/lib/api";
import { IFetch } from "@/lib/IFetch";
import { cn, hasPermissions, PERMISSIONS } from "@/lib/utils";
import AboutCard from "../about-card/about-card";
import ReactiveCarousel, { ImageType } from "../reactive-carousel";
import AboutDialog from "./components/about-dialog";
import { auth } from "@clerk/nextjs/server";
import Conditional from "../conditional";
import { Button } from "../button";
import { PlusIcon } from "lucide-react";
import Banner from "../banner";
import Typography from "../typography";

const images: ImageType[] = [
  // {
  //   alt: "Besøk",
  //   src: "/besok.jpg",
  // },
  // {
  //   alt: "Traktor",
  //   src: "/traktor.jpg",
  // },
  // {
  //   alt: "Humle",
  //   src: "/humle.jpg",
  // },
  {
    alt: "Hage",
    src: "/hage.jpg",
  },
  {
    alt: "Hage",
    src: "/hage2.jpg",
  },
  {
    alt: "Bygg",
    src: "/bygg.jpg",
  },
  {
    alt: "Bygg",
    src: "/bygg2.jpg",
  },
  {
    alt: "Stol",
    src: "/chair2.jpg",
  },
];

interface AboutProps extends React.HTMLProps<HTMLDivElement> {}

const About = async ({ className, ...props }: AboutProps) => {
  let error = false;

  const data = await IFetch<ContentDto[]>({
    url: `/api/Content/${encodeURIComponent("frontpage-about")}`,
    config: {
      method: "GET",
      next: {
        tags: ["frontpage-about"],
      },
    },
  })
    .then((res) => {
      if (Array.isArray(res)) return res;

      // If the response is not of type array, we have an error
      error = true;
    })
    .catch((err) => {
      console.error(err);
      error = true;
    });

  const session = await auth();
  const canModify = hasPermissions(
    session.sessionClaims?.metadata.permissions ?? [],
    [PERMISSIONS.updateContent],
    true
  );
  return (
    <div className={cn("w-full", className)} {...props}>
      <div
        style={{
          backgroundImage: "url('/wave3.svg')",
        }}
        className="w-full h-10 bg-cover bg-no-repeat"
      />

      <section className="bg-background py-20">
        <div className="w-fit flex mx-auto flex-col gap-20 px-10 md:px-20 max-w-[1050px] flex-0 items-center">
          <ReactiveCarousel images={images} />
          {(Array.isArray(data) ? data : [])?.map((content, index) => (
            <AboutCard
              pageContent={content}
              displayEditControls={canModify}
              key={index}
              mirrored={index % 2 === 1}
            />
          ))}

          <Conditional render={error}>
            <Banner>
              <Typography>
                En feil oppstod, og innholdet kunne ikke lastes inn
              </Typography>
            </Banner>
          </Conditional>

          <Conditional render={canModify}>
            <AboutDialog
              title="Legg til avsnitt"
              description="Legg til et nytt avsnitt i området"
            >
              <Button className="gap-2.5 items-center">
                <PlusIcon size={16} /> Legg til avsnitt
              </Button>
            </AboutDialog>
          </Conditional>
        </div>
      </section>
    </div>
  );
};

export default About;
