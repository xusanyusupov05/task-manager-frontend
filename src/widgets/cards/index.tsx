import { CardList } from "./card-list";
import { CardFilter } from "./filter";
import { useGetWorkspacesQuery } from "../../entities/workspaces/api";
export function CardsMain() {
  const { data: workspaces, isLoading } = useGetWorkspacesQuery({ refetchOnMountOrArgChange: true });

  return (
    <div className="w-full">
      <div className="flex justify-between items-center !m-0">
        <CardFilter />
      </div>
      <CardList items={workspaces} isLoading={isLoading} />
    </div>
  );
}
