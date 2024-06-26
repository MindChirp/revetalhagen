import PageWrapper from "@/components/layout/page-wrapper";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import PageCard from "@/components/ui/page-card";
import SquigglyDivider from "@/components/ui/sqiggly-divider";
import Typography from "@/components/ui/typography";

const AboutNaKuHel = () => {
  return (
    <PageWrapper>
      <PageCard>
        <CardHeader className="flex flex-col md:items-start items-center">
          <Typography>Om NaKuHel</Typography>
          <SquigglyDivider />
        </CardHeader>
        <CardContent>
          <Typography variant="p">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus
            minima veniam, ad praesentium recusandae dolor ipsa excepturi
            aperiam vero consectetur, voluptatum debitis optio quasi autem
            repudiandae nobis officiis magnam laborum.
          </Typography>
        </CardContent>
      </PageCard>
    </PageWrapper>
  );
};

export default AboutNaKuHel;
