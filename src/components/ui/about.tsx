"use client";
import { cn } from "@/lib/utils";
import AboutCard from "./about-card";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./carousel";
import { Card, CardContent } from "./card";
import ReactiveCarousel, { ImageType } from "./reactive-carousel";

const images: ImageType[] = [
  {
    alt: "Stol",
    src: "/chair.jpg",
  },
  {
    alt: "Natur",
    src: "/bg.jpg",
  },
  {
    alt: "Bryggerhuset",
    src: "/bryggerhuset.jpg",
  },
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

const About = ({ className, ...props }: AboutProps) => {
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
          <AboutCard
            img="/bryggerhuset.jpg"
            alt="Bryggerhuset"
            title="Hva vi gjør"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque a metus porttitor odio aliquam imperdiet at et augue. Cras nec aliquam orci. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Vivamus rutrum ipsum ut est tincidunt, eu imperdiet risus dapibus. Nunc imperdiet diam vitae felis maximus hendrerit. Praesent nunc eros, pellentesque sit amet mi eu, placerat viverra dui."
          />
          <AboutCard
            mirrored
            img="/roar-holt-gard.jpg"
            alt="Bryggerhuset"
            title="Hva vi står for"
            description="Etiam facilisis lorem leo, in auctor orci convallis vitae. Nunc blandit, sapien non interdum imperdiet, erat mauris ultrices est, at rutrum tortor diam ac lorem. Aliquam nec ultricies eros. Nulla in sollicitudin nibh, vitae venenatis nibh. Duis leo nisl, imperdiet sodales lacinia id, faucibus et nunc. Interdum et malesuada fames ac ante ipsum primis in faucibus. Curabitur convallis dolor sit amet sem viverra tincidunt."
          />
        </div>
      </section>
    </div>
  );
};

export default About;
