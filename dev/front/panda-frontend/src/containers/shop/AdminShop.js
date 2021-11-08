import React, { useState, useEffect } from "react";
import { Layout, Menu, Card, Row, Col, Button } from "antd";
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import axios from "axios";

const { Header, Content, Footer, Sider } = Layout;

const AdminShop = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState("1");
  const [noCheck, SetNoCheck] = useState(0);
  const [uosd, SetUosd] = useState({});
  useEffect(() => {
    axios.get("/api/shop/dashboard").then((response) => {
      if (response.data.success) {
        console.log(response.data.uosd);
        SetUosd(response.data.uosd);
      } else {
        alert("정보를 받아오는데 실패했습니다 다시 시도해주세요");
      }
    });
  }, []);

  useEffect(() => {
    axios.get("/api/shop/nochecked").then((response) => {
      console.log(response.data);
      if (response.data.success) {
        SetNoCheck(response.data.num);
      } else {
        alert(
          "확인하지않은 주문정보를 받아오는데 실패했습니다 다시 시도해주세요"
        );
      }
    });
  }, []);

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
                >
                  <div style={{ textAlign: "center" }}>
                    <h1>{noCheck}</h1>
                  </div>
                </Card>
              </Col>
              <Col lg={6}>
                <Card
                  title="준비중인 주문"
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
            <Link to="/shop/newProduct">
              <Button type="primary">상품등록하기</Button>
            </Link>
          </>
        );
      case "2":
        return <h1>확인하지 않은 주문</h1>;
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
              확인하지 않은 주문
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
