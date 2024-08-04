import PageWrapper from "@/components/layout/page-wrapper";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import PageCard from "@/components/ui/page-card";
import SquigglyDivider from "@/components/ui/sqiggly-divider";
import Typography from "@/components/ui/typography";

const OurGarden = () => {
  return (
    <PageWrapper>
      <PageCard>
        <CardHeader className="flex flex-col md:items-start items-center">
          <Typography variant="h1">Hagen vår</Typography>
          <SquigglyDivider />
        </CardHeader>
        <CardContent>
          <Typography variant="p">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veniam
            neque nostrum tempora animi facere amet? Ipsa eos alias tenetur,
            quae vel, nostrum officia reprehenderit, optio ducimus molestias
            iste laboriosam qui!
          </Typography>
        </CardContent>
      </PageCard>
    </PageWrapper>
  );
};

export default OurGarden;
