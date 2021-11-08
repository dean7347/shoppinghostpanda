import React, { useState } from "react";
import { Layout, Menu, Card, Row, Col, Button } from "antd";
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";

const { Header, Content, Footer, Sider } = Layout;

const AdminShop = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState("1");

  const componentsSwtich = (key) => {
    switch (key) {
      case "1":
        return (
          <>
            <Row gutter={[48, 8]}>
              <Col lg={6}>
                <Card
                  title="확인하지 않은 주문"
                  extra={<a href="#">More</a>}
                  style={{ width: 300 }}
                ></Card>
              </Col>
              <Col lg={6}>
                <Card
                  title="배송중인 주문"
                  extra={<a href="#">More</a>}
                  style={{ width: 300 }}
                >
                  <p>Card content</p>
                  <p>Card content</p>
                  <p>Card content</p>
                </Card>
              </Col>
              <Col lg={6}>
                <Card
                  title="완료된 주문"
                  extra={<a href="#">More</a>}
                  style={{ width: 300 }}
                >
                  <p>Card content</p>
                  <p>Card content</p>
                  <p>Card content</p>
                </Card>
              </Col>
              <Col lg={6}>
                <Card
                  title="환불 신청"
                  extra={<a href="#">More</a>}
                  style={{ width: 300 }}
                >
                  <p>Card content</p>
                  <p>Card content</p>
                  <p>Card content</p>
                </Card>
              </Col>
            </Row>
            <Button type="primary">상품등록</Button>
          </>
        );
      case "2":
        return <h1>item2</h1>;
      case "3":
        return <h3>item3</h3>;
      case "4":
        return <h3>item4</h3>;
      default:
        break;
    }
  };

  return (
    <>
      <Layout style={{ height: "100vh" }}>
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          onBreakpoint={(broken) => {
            console.log(broken);
            console.log("클릭");
          }}
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type);
            console.log("클릭");
          }}
          style={{ minHeight: "11%" }}
        >
          <div className="logo" />

          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["1"]}
            onClick={(e) => setSelectedMenuItem(e.key)}
          >
            <Menu.Item key="1" icon={<UserOutlined />}>
              대시보드
            </Menu.Item>
            <Menu.Item key="2" icon={<VideoCameraOutlined />}>
              주문
            </Menu.Item>
            <Menu.Item key="3" icon={<UploadOutlined />}>
              상품
            </Menu.Item>
            <Menu.Item key="4" icon={<UserOutlined />}>
              상점정보
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Content style={{ margin: "24px 16px 0" }}>
            <div
              className="site-layout-background"
              style={{ padding: 24, minHeight: 360 }}
            >
              {componentsSwtich(selectedMenuItem)}
            </div>
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default AdminShop;
