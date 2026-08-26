import { useState } from "react";
import { CardList } from "./card-list";
import { CardFilter } from "./filter";

export function CardsMain() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  return (
    <div className="w-full">
      <div className="flex justify-between items-center !m-0">
        <CardFilter />
      </div>
      <CardList items={data} isLoading={loading} />
    </div>
  );
}
