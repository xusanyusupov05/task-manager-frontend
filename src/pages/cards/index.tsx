import { PageWrapper } from "@/shared/ui/pege-wrapper";
import { CardsMain } from "@/widgets/cards";
import { Container } from "@/shared/ui/container";

export default function CardsPage() {
  return (
    <Container>
      <PageWrapper title="Jami g'alvalar">
        <CardsMain />
      </PageWrapper>
    </Container>
  );
}
