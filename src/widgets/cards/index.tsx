import { useSearchParams } from "react-router-dom";
import { CardList, type CardItem } from "./card-list";
import { CardFilter } from "./filter";
import { useGetWorkspacesQuery } from "../../entities/workspaces/api";

export function CardsMain() {
  const { data: workspaces, isLoading } = useGetWorkspacesQuery({
    refetchOnMountOrArgChange: true,
  });
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search")?.toLowerCase().trim() || "";

  const filteredData = workspaces?.data?.filter((item: CardItem) => {
    if (!search) return true;
    return item.title?.toLowerCase().includes(search);
  });
  console.log(workspaces);
  

  return (
    <div className="w-full">
      <div className="flex justify-between items-center !m-0">
        <CardFilter />
      </div>
      <CardList
        items={{ data: filteredData }}
        isLoading={isLoading}
      />
    </div>
  );
}
