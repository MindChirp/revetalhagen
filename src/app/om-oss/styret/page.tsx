import PageWrapper from "@/components/layout/page-wrapper";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import PageCard from "@/components/ui/page-card";
import SquigglyDivider from "@/components/ui/sqiggly-divider";
import Typography from "@/components/ui/typography";

const Board = () => {
  return (
    <PageWrapper>
      <PageCard className="mx-auto">
        <CardHeader className="flex flex-col">
          <Typography>Styret</Typography>
          <SquigglyDivider />
        </CardHeader>
        <CardContent>
          <Typography variant="p">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corporis
            illum, eum quod neque odio doloremque voluptatum repellendus
            accusamus tempora, veritatis animi ullam, optio sed dolorum. Atque
            quidem sit nihil distinctio.
          </Typography>
        </CardContent>
      </PageCard>
    </PageWrapper>
  );
};

export default Board;
