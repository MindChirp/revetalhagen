"use client";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselProps,
} from "./carousel";
import { Card, CardContent } from "./card";
import Image from "next/image";
import { cn } from "@/lib/utils";
export type ImageType = {
  src: string;
  alt: string;
};

interface ReactiveCarouselProps
  extends React.HTMLProps<HTMLDivElement>,
    CarouselProps {
  images: ImageType[];
}

const ReactiveCarousel = ({
  className,
  images,
  ...props
}: ReactiveCarouselProps) => {
  return (
    <Carousel
      opts={{
        align: "start",
        active: true,
        loop: true,
      }}
      plugins={[
        Autoplay({
          delay: 2000,
          stopOnFocusIn: true,
        }),
      ]}
      className={cn("mx-auto md:w-full w-3/4", className)}
      {...props}
    >
      <CarouselContent>
        {images.map((item, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
            <div className="p-1">
              <Card>
                <CardContent className="relative flex aspect-square items-center justify-center p-0">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    className="rounded-3xl w-full h-full object-cover"
                  />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default ReactiveCarousel;
