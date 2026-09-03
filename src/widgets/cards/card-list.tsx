import { Col, Row, Typography } from "antd";
import { useSearchParams } from "react-router-dom";
import { CreateCard } from "./card";
import { Loader } from "@/shared/ui/loader";

export interface CardItem {
  id?: string | number;
  title: string;
  description?: string;
  bgColor?: string;
  color?: string;
  createdAt?: string;
  updatedAt?: string;
  ownerId?: string;
}

interface CardListProps {
  items?: { data?: CardItem[] };
  isLoading?: boolean;
}

export function CardList({ items, isLoading = false }: CardListProps) {
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search");

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="w-full px-5 mt-6">
      <Row gutter={[20, 20]}>
        {(items?.data?.length ?? 0) > 0 ? (
          items?.data?.map((item, index) => (
            <Col xs={24} sm={12} md={8} lg={6} key={item.id || index}>
              <CreateCard
                id={item.id! as string}
                title={item.title}
                description={item.description}
                color={item.bgColor || item.color}
              />
            </Col>
          ))
        ) : (
          <Typography.Text className="rubik text-center w-full py-12 text-gray-500 text-base">
            {search
              ? `"${search}" bo'yicha hech qanday g'alva topilmadi`
              : "Galva yo'q hozrcha tinchlik"}
          </Typography.Text>
        )}
      </Row>
    </div>
  );
}
