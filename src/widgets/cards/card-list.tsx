import { Col, Row, Typography } from "antd";
import { Container } from "../../shared/ui/container";
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
  if (isLoading) {
    return <Loader/>;
  }

  return (
    <Container>
      <Row gutter={[16, 16]}>
        {(items?.data?.length ?? 0) > 0 ? (
          items?.data?.map((item, index) => (
            <Col span={6} key={item.id || index}>
              <CreateCard
                id={item.id! as string}
                title={item.title}
                description={item.description}
                color={item.bgColor || item.color}
              />
            </Col>
          ))
        ) : (
         <Typography.Text className="rubik text-center w-full">Galva yo'q hozrcha tinchlik</Typography.Text>
        )}
      </Row>
    </Container>
  );
}
