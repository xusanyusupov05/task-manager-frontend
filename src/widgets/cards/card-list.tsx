import { Col, Row, Spin } from "antd";
import { Container } from "../shared/container/container";
import { CreateCard } from "./create-card";

interface CardListProps {
  items?: any[];
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
              <CreateCard title={item.title} type={item.type} description={item.description} />
            </Col>
          ))
        ) : (
          <>
            <Col span={6}>
              <CreateCard title="WFM" type="born" description="Born" />
            </Col>
            <Col span={6}>
              <CreateCard title="Application managment portal" type="uzbekistan" description="Uzbekistan" />
            </Col>
            <Col span={6}>
              <CreateCard title="Landing page" type="cash" description="Cash" />
            </Col>
            <Col span={6}>
              <CreateCard title="1009" type="piala" description="Piala" />
            </Col>
          </>
        )}
      </Row>
    </Container>
  );
}
