import { useState } from "react";
import { CardList } from "./card-list";
import { CardFilter } from "./filter";

export function CardsMain() {
  const [data, _setData] = useState<any[]>([]);
  const [loading, _setLoading] = useState(false);

  return (
    <div className="w-full">
      <div className="flex justify-between items-center !m-0">
        <CardFilter />
      </div>
      <CardList items={data} isLoading={loading} />
    </div>
  );
}
