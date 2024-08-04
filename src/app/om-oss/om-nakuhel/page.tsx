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
          <Typography variant="h1">Om NaKuHel</Typography>
          <SquigglyDivider />
        </CardHeader>
        <CardContent>
          <Typography variant="p">
            NaKuHel er inspirert av salutogenese-teorien; en teori om hva som
            danner helse. Det innebærer en forståelse av helse som en ressurs på
            en skala snarere enn “enten frisk eller syk”. NaKuHel tilbyr ikke
            primært hjelpetiltak for spesifikke grupper, men er en aktør som
            tilrettelegger for at alle kan få bidra og utfolde seg med de
            ressursene og interessene de har i sitt eget nærmiljø. NaKuHel
            Vestfold er en forening, hvis formål er:
          </Typography>
          <div>
            <ul
              className="max-w-1/2"
              style={{
                listStyleType: "unset",
                paddingInlineStart: "40px",
              }}
            >
              <li>
                å arbeide for helhetstenkning og kreativitet innenfor natur,
                kultur og helse for derigjennom å bidra til å fremme helse,
                miljø og livskvalitet hvor ideelle organisasjoner, frivillige
                foreninger og lag, ildsjeler, offentlige etater, næringsliv,
                selvstendig næringsdrivende og andre samarbeider for å nå dette
                felles mål.
              </li>
              <li>
                å øke bevissthet om samspillet mellom natur, kultur og helse og
                om hvordan møte mellom natur og kultur kan være helsefremmende
                for både menneske og miljø lokalt og globalt.
              </li>
              <li>
                å etablere og drifte hagebruk på Revetal med mest mulig
                kretsløpbasert drift basert på økologiske prinsipper.
                Revetalhagen skal skape en grønn arena og et hagerom på Revetal
                der hele befolkningen kan delta og lære om helhetstenking og
                økologi i hagen
              </li>
              <li>
                å bidra til opprettelse av NaKuHel-møteplasser og etablering av
                et NaKuHel-nettverk i Vestfold.
              </li>
            </ul>
          </div>
        </CardContent>
      </PageCard>
    </PageWrapper>
  );
};

export default AboutNaKuHel;
