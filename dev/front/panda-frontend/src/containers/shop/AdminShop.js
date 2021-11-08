import React, { useState, useEffect, useCallback } from "react";
import { Layout, Menu, Card, Row, Col, Button } from "antd";
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import axios from "axios";
import Paging from "../../components/common/Paging";

const { Header, Content, Footer, Sider } = Layout;

const AdminShop = () => {
  const [noCheck, SetNoCheck] = useState(0);
  const [uosd, SetUosd] = useState();
  //   페이지네이션
  const [NowPage, setNowPage] = useState([]);
  const [ViewCount, setViewCountPage] = useState([]);
  const [TotalCount, setTotalCountPage] = useState([]);
  const [Page, setPage] = useState(1);

  useEffect((page) => {
    axios
      .get(`/api/shop/dashboard?size=1&page=${page - 1}`)
      .then((response) => {
        if (response.data != null) {
          // console.log("페이지에이ㅇㅇ블ㅇ");
          console.log(response.data);
          console.log("페이지체인지이펙트");

          SetUosd(response.data.uosd);
          //page, count, setPage
          //현재 페이지
          // console.log(response.data.pageable.pageNumber);
          // 한페이지당 보여줄 리스트 아이템 갯수
          setViewCountPage(1);
          //총 아이템의 갯수
          setTotalCountPage(response.data.totalElements);
        } else {
          console.log("상품들을 가져오는데 실패했습니다.");
        }
      });
  }, []);
  const onPageChanged = useCallback(
    (page) => {
      setPage(page);
      axios
        .get(`/api/shop/dashboard?size=1&page=${page - 1}`)
        .then((response) => {
          console.log("페이지체인지");
          if (response.data != null) {
            console.log("페이지에이ㅇㅇ블ㅇ");
            console.log(response.data);
            SetUosd(response.data.uosd);
            console.log(uosd);
            setViewCountPage(1);
            setTotalCountPage(response.data.totalElements);
          } else {
            console.log("상품들을 가져오는데 실패했습니다.");
          }
        });
    },
    [setPage]
  );
  const renderAll = (
    <table>
      <thead>
        <th>주문번호</th>
        <th>주문자명</th>
        <th>주문자 연락처</th>
        <th>결제금액</th>
        <th>수령인 이름</th>
        <th>수령인 우편번호</th>
        <th>수령지 주소</th>
        <th>수령인 번호</th>
        <th>상품들</th>
        <th>주문상태</th>
        <th>주문서 인쇄</th>
      </thead>
      <tbody>
        {uosd &&
          uosd.map((uo, index) => {
            return (
              <>
                <td>{uo.userOrderId}</td>
                <td>{uo.orderuser}</td>
                <td>{uo.orderuserPhone}</td>
                <td>
                  {uo.fullprice
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                  <br />
                  (상품가격:
                  {uo.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  )+(택배비용 :
                  {uo.shipprice
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  )
                </td>
                <td>{uo.receiverName}</td>
                <td>{uo.receiverZipCode}</td>
                <td>{uo.receiverAddress}</td>
                <td>{uo.receiverPhone}</td>
                <td>
                  {uo.orders.map((pro, index) => {
                    return (
                      <>
                        <td>{pro.productName}</td>
                        <td>
                          {pro.options.map((options, index) => {
                            return (
                              <>
                                <tr>
                                  <td>{options.optionName}</td>
                                  <td>{options.optionCount}개</td>
                                </tr>
                              </>
                            );
                          })}
                        </td>
                      </>
                    );
                  })}
                </td>
                <td>{uo.orderStatus}</td>
                <td>
                  <button>인쇄</button>
                </td>
              </>
            );
          })}
      </tbody>
    </table>
  );

  //   uosd.map((uo, index) => {
  //     return (
  //       <>
  //         <div key="index">
  //           <td>{uo.userOrderId}</td>
  //         </div>
  //         <div key="index"></div>
  //       </>
  //     );
  //   });

  const [selectedMenuItem, setSelectedMenuItem] = useState("1");

  //   useEffect(() => {
  //     axios.get("/api/shop/dashboard").then((response) => {
  //       if (response.data.success) {
  //         console.log(response.data.uosd);
  //         SetUosd(response.data.uosd);
  //       } else {
  //         alert("정보를 받아오는데 실패했습니다 다시 시도해주세요");
  //       }
  //     });
  //   }, []);

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
                  title="전체 주문"
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
        return (
          <>
            {renderAll}

            <Paging
              //토탈레코드
              onPageChanged={onPageChanged}
              currentPage={Page}
              //보여줄 숫자
              ViewCount={ViewCount}
              //전체 숫자
              TotalCount={TotalCount}
            />
          </>
        );
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
            // console.log(broken);
          }}
          onCollapse={(collapsed, type) => {
            // console.log(collapsed, type);
            // console.log("클릭");
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
              전체 주문 내역
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
