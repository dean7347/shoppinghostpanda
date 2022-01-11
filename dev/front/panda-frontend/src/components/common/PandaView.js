import React from "react";
import { Row, Col, Card, Empty } from "antd";
import { ReactTinyLink } from "react-tiny-link";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";

const { Meta } = Card;
const PandaView = (props) => {
  const pandaRender = props.pandas.map((pandas, index) => {
    return (
      <>
        {pandas.link && (
          <Col lg={8} sm={12}>
            <Card
              style={{ width: "100%" }}
              actions={[
                // <div>평균평점</div>,
                <div>좋아요 수</div>,
                <div>내 좋아요</div>,
              ]}
            >
              <ReactTinyLink
                cardSize="large"
                showGraphic={true}
                maxLine={2}
                minLine={1}
                proxyUrl={`api/proxy?url=`}
                description={true}
                url={`${pandas.link}`}
              />

              <Meta title={`${pandas.panda}`} description={`${pandas.link}`} />
            </Card>
          </Col>
        )}
      </>
    );
  });

  // console.log("판다뷰 프롭스");
  // console.log(props.pandas[0].link);
  const result =
    props.pandas[0].link === undefined ? (
      <Empty description={<span> 판다가 없습니다</span>} />
    ) : (
      <Row gutter={[16, 16]}>{pandaRender}</Row>
    );

  return (
    <>
      {result}
      {/* <Row gutter={[16, 16]}>{pandaRender}</Row> */}
    </>
  );
};
export default PandaView;
