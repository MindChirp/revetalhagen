import PageWrapper from "@/components/layout/page-wrapper";
import ArticleImage from "@/components/ui/article-image";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import PageCard from "@/components/ui/page-card";
import SquigglyDivider from "@/components/ui/sqiggly-divider";
import Typography from "@/components/ui/typography";
import Image from "next/image";

const WhoAreWe = () => {
  return (
    <PageWrapper>
      <PageCard>
        <CardHeader className="flex flex-col md:items-start items-center">
          <Typography variant="h1">Hvem er vi?</Typography>
          <SquigglyDivider />
        </CardHeader>
        <CardContent>
          <Typography variant="p">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi ut
            vero voluptatibus accusamus perspiciatis reiciendis deleniti
            veritatis quia nemo et. Voluptatum, expedita exercitationem. Ullam,
            saepe? Incidunt eaque dicta consequatur saepe!
          </Typography>
          <ArticleImage src="/bryggerhuset.jpg" alt="Bryggerhuset" displayAlt />
          <Typography variant="p">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure
            asperiores odio incidunt facilis odit magnam consectetur quae
            deleniti recusandae illo consequuntur, obcaecati blanditiis cum ex
            pariatur? Tempore commodi dolore architecto.
          </Typography>
        </CardContent>
      </PageCard>
    </PageWrapper>
  );
};

export default WhoAreWe;
