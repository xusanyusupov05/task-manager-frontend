import { useState } from "react";
import { CardList } from "./card-list";
import { CardFilter } from "./filter";
import { Container } from "../shared/container/container";

export function CardsMain() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  return (
    <Container>
      <div className="flex justify-between items-center mb-4">
        <CardFilter />
      </div>
      <CardList items={data} isLoading={loading} />
    </Container>
  );
}
