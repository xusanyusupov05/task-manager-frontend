import { Col, Row, Spin } from "antd";
import { Container } from "../../shared/ui/container";
import { CreateCard } from "./create-card";
export interface CardItem {
  id?: string | number;
  title: string;
  description?: string;
  color?: string;
}

interface CardListProps {
  items?: CardItem[];
  isLoading?: boolean;
}

export function CardList({ items = [], isLoading = false }: CardListProps) {
  if (isLoading) return <Spin size="large" />;

  return (
    <Container>
      <Row gutter={[16, 16]}>
        {items.length > 0 ? (
          items.map((item, index) => (
            <Col span={6} key={item.id || index}>
              <CreateCard
                title={item.title}
                description={item.description}
                color={item.color}
              />
            </Col>
          ))
        ) : (
          <>
            <Col span={6}>
              <CreateCard
                title="Application managment portal"
                description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam tempore perferendis optio architecto deleniti quia nam exercitationem cum, reprehenderit consequuntur adipisci, nesciunt omnis laborum quisquam ab, veniam quod ea et."
              />
            </Col>
          </>
        )}
      </Row>
    </Container>
  );
}
