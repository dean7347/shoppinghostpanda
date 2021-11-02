import { useState } from "react";
import HeaderContainer from "../containers/common/HeaderContainer";
import axios from "../../node_modules/axios/index";
import {
  Divider,
  Form,
  Input,
  Button,
  Radio,
  Select,
  Cascader,
  DatePicker,
  InputNumber,
  TreeSelect,
  Switch,
  Modal,
  Col,
  Row,
} from "antd";
import DaumPostCode from "react-daum-postcode";
function PaymentPage(props) {
  console.log(props.location.state.amount);
  console.log(props.location.state.selectShopId);
  const [componentSize, setComponentSize] = useState("default");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [zonecode, SetZoneCode] = useState("");
  const [fulladdress, SetFullAddress] = useState("");

  function execPostCode() {
    new window.daum.Postcode({
      oncomplete: function (data) {
        // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

        // 도로명 주소의 노출 규칙에 따라 주소를 조합한다.
        // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
        var fullRoadAddr = data.roadAddress; // 도로명 주소 변수
        var extraRoadAddr = ""; // 도로명 조합형 주소 변수

        // 법정동명이 있을 경우 추가한다. (법정리는 제외)
        // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
        if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
          extraRoadAddr += data.bname;
        }
        // 건물명이 있고, 공동주택일 경우 추가한다.
        if (data.buildingName !== "" && data.apartment === "Y") {
          extraRoadAddr +=
            extraRoadAddr !== "" ? ", " + data.buildingName : data.buildingName;
        }
        // 도로명, 지번 조합형 주소가 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
        if (extraRoadAddr !== "") {
          extraRoadAddr = " (" + extraRoadAddr + ")";
        }
        // 도로명, 지번 주소의 유무에 따라 해당 조합형 주소를 추가한다.
        if (fullRoadAddr !== "") {
          fullRoadAddr += extraRoadAddr;
        }

        // 우편번호와 주소 정보를 해당 필드에 넣는다.
        SetZoneCode(data.zonecode);
        SetFullAddress(fullRoadAddr);

        /* document.getElementById('signUpUserPostNo').value = data.zonecode; //5자리 새우편번호 사용
           document.getElementById('signUpUserCompanyAddress').value = fullRoadAddr;
           document.getElementById('signUpUserCompanyAddressDetail').value = data.jibunAddress; */
      },
    }).open();
  }

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };
  const [value, setValue] = useState(1);
  const onChange = (e) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };

  const handleComplete = (data) => {
    console.log("호출");
    let fullAddress = data.address;
    let extraAddress = "";
    let zonecode = data.zonecode;
    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }
    SetZoneCode(zonecode);
    SetFullAddress(fullAddress);
    setIsModalVisible(false);
  };
  const [paydata, SetPaydata] = useState({});
  useState(() => {
    const body = {
      //   amount: props.location.state.amount,
      shopId: props.location.state.selectShopId,
    };
    axios.post("/api/payment", body).then((response) => {
      if (response.data.success) {
        SetPaydata(response.data.dtos);
      } else {
      }
    });
  }, []);

  const renderbox = () => {
    return (
      <>
        <table>
          <thead>
            <th>상점명</th>
            <th>상품상세</th>
            <th>상품금액</th>
            <th>배송비</th>
          </thead>
          <tbody>
            {paydata.ds &&
              paydata.ds.map((item, index) => {
                var allPrice = 0;
                function pricePlus(getprice) {
                  allPrice = allPrice + getprice;
                }
                var freePrice = item.freePrice;
                var shipPrice = item.shipPrice;
                //   function getfreePrice(getPrice) {
                //     freePrice = getPrice;
                //   }

                //   function getShipPrice(getPrice) {
                //     shipPrice = getPrice;
                //   }
                function isfree(allPrice) {
                  if (allPrice >= freePrice) {
                    return "무료배송";
                  } else {
                    return shipPrice;
                  }
                }
                return (
                  <tr>
                    <td>{item.shopName}</td>
                    <td style={{}}>
                      {item.dp.map((product, index) => (
                        <tr key={index} style={{}}>
                          <td
                            style={{
                              textAlign: "center",
                              width: "120px",
                              height: "120px",
                            }}
                          >
                            <img
                              style={{
                                width: "150px",
                                height: "150px",
                              }}
                              alt="product"
                              src={`http://localhost:8080/upload/${product.thumbNail}`}
                            />
                          </td>
                          <td style={{ width: "20%" }}>
                            {product.productName}
                          </td>
                          <td style={{ width: "50%" }}>
                            {product.do.map((option, index) => (
                              <tr key={index}>
                                <td>{option.pandaName}</td>
                                <td>{option.optionName}</td>
                                <td>{option.optionCount} EA</td>
                                <td>
                                  {option.originPrice
                                    .toString()
                                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                </td>
                                <td>
                                  {/* {(option.originPrice * option.optionCount)
                                      .toString()
                                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                    원 */}
                                  {option.discount ? (
                                    <div>
                                      {(
                                        option.originPrice *
                                        option.optionCount *
                                        0.95
                                      )
                                        .toString()
                                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                      <br />
                                      (판다 할인 : 5% )
                                    </div>
                                  ) : (
                                    <div>
                                      {(option.originPrice * option.optionCount)
                                        .toString()
                                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                      <br />
                                      (판다 할인 미적용)
                                    </div>
                                  )}
                                </td>
                                {option.discount
                                  ? pricePlus(
                                      option.originPrice *
                                        option.optionCount *
                                        0.95
                                    )
                                  : pricePlus(
                                      option.originPrice * option.optionCount
                                    )}
                              </tr>
                            ))}
                          </td>
                        </tr>
                      ))}
                    </td>
                    <td>
                      {allPrice
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                      원
                    </td>
                    <td>
                      {isfree(allPrice)
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                      <br />(
                      {freePrice
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                      이상 무료배송)
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </>
    );
  };

  return (
    <>
      <HeaderContainer />
      <div style={{ width: "85%", margin: "3rem auto" }}>
        <h1>Payment</h1>
        <Divider />
        <h3>상품정보</h3>
        <div>{renderbox()}</div>
        <Divider />
        <div style={{ border: "1px solid" }}>
          <div style={{ float: "left" }}>
            <h2>
              {props.location.state.amount.total
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              +
              {props.location.state.amount.ship
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </h2>
          </div>
          <div
            style={{
              float: "right",
              borderLeft: "1px solid",
              paddingLeft: "30px",
            }}
          >
            <h2>
              {(
                props.location.state.amount.total +
                props.location.state.amount.ship
              )
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              원
            </h2>
          </div>
        </div>
        <Divider />
        <div>
          <h2>배송지 정보</h2>

          <Modal
            title="주소검색"
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <DaumPostCode onComplete={handleComplete} className="post-code" />
          </Modal>

          <Form
            labelCol={{
              span: 4,
            }}
            wrapperCol={{
              span: 14,
            }}
            layout="horizontal"
            initialValues={{
              size: componentSize,
            }}
            onValuesChange={onFormLayoutChange}
            size={componentSize}
          >
            <Form.Item label="주소록">
              {" "}
              <Radio.Group onChange={onChange} value={value}>
                <Radio value={1}>최근 배송지</Radio>
                <Radio value={2}>신규 배송지</Radio>
              </Radio.Group>
              <Button type="primary" onClick={showModal}>
                주소록 열기
              </Button>
            </Form.Item>
            {value === 1 ? (
              <Form.Item label="Select">
                <Select>
                  <Select.Option value="demo">Demo</Select.Option>
                </Select>
              </Form.Item>
            ) : (
              <div>
                <Form.Item label="수령인">
                  <Input />
                </Form.Item>
                <Form.Item label="배송지명">
                  <Input />
                </Form.Item>
                <Form.Item label="연락처 1">
                  <Row gutter={24}>
                    <Col lg={3}>
                      <Input type={"number"} controls={false} />
                    </Col>
                    <Col lg={1}> -</Col>
                    <Col lg={4}>
                      <InputNumber controls={false} />
                    </Col>
                    -
                    <Col lg={4}>
                      <InputNumber controls={false} />
                    </Col>
                  </Row>
                </Form.Item>
                <Form.Item label="연락처 2">
                  <Row gutter={24}>
                    <Col lg={3}>
                      <InputNumber />
                    </Col>
                    -
                    <Col lg={4}>
                      <InputNumber />
                    </Col>
                    -
                    <Col lg={4}>
                      <InputNumber />
                    </Col>
                  </Row>
                </Form.Item>
                <Form.Item label="배송지 주소">
                  <Row gutter={24}>
                    <Col lg={8}>
                      <Input
                        style={{ BackgroundColor: "red" }}
                        value={zonecode}
                      />
                    </Col>
                    <Col lg={8}>
                      <Button type="primary" onClick={execPostCode}>
                        우편번호
                      </Button>
                    </Col>
                  </Row>
                </Form.Item>
                <Form.Item label="배송지주소 상세">
                  <Row gutter={24}>
                    <Col lg={24}>
                      <Input value={fulladdress} />
                    </Col>
                    <Col lg={24}>
                      <Input />
                    </Col>
                  </Row>
                </Form.Item>
              </div>
            )}
          </Form>
        </div>
      </div>
    </>
  );
}

export default PaymentPage;
