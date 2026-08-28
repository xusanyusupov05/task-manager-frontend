import { useState } from "react";
import { CardList, type CardItem } from "./card-list";
import { CardFilter } from "./filter";

export function CardsMain() {
  const [data] = useState<CardItem[]>([]);
  const [loading] = useState(false);

  return (
    <div className="w-full">
      <div className="flex justify-between items-center !m-0">
        <CardFilter />
      </div>
      <CardList items={data} isLoading={loading} />
    </div>
  );
}
