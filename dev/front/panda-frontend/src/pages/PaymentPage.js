import { useEffect, useState, useScript } from "react";
import HeaderContainer from "../containers/common/HeaderContainer";
import axios from "../api/axiosDefaults";
import {
  Divider,
  Form,
  Input,
  Button,
  Radio,
  Select,
  Card,
  Modal,
  Col,
  Row,
  Checkbox,
  Pagination,
} from "antd";
import { CreditCardOutlined } from "@ant-design/icons";
import DaumPostCode from "react-daum-postcode";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

import {
  BrowserView,
  MobileView,
  isBrower,
  isMobile,
} from "react-device-detect";

function PaymentPage(gprops) {
  let history = useHistory();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [rerender, setRerender] = useState(1);
  const [defaultInfo, SetDefaultInfo] = useState({
    userName: "",
    recentAddress: "",
    phoneNumber: "",
  });
  const [paymentResult, setPaymentResult] = useState("");
  const [paymentLoad, setPaymentLoadResult] = useState(false);
  const pageSize = 5;
  //   const [page, setPage] = useState(1);
  const [AddrList, setAddrList] = useState({
    data: [],
    totalPage: 0,
    current: 1,
    minIndex: 0,
    maxIndex: 0,
    length: 0,
  });
  //결제로직
  useEffect(() => {
    const jquery = document.createElement("script");
    jquery.src = "https://code.jquery.com/jquery-1.12.4.min.js";
    const iamport = document.createElement("script");
    iamport.src = "https://cdn.iamport.kr/js/iamport.payment-1.1.7.js";
    document.head.appendChild(jquery);
    document.head.appendChild(iamport);
    return () => {
      document.head.removeChild(jquery);
      document.head.removeChild(iamport);
    };
  }, []);
  const [Pbutton, setPbutton] = useState(false);

  const onClickPayment = (tf) => {
    var date = new Date();
    var uid = new Date().getTime();
    var year = date.getFullYear();
    var month = ("0" + (1 + date.getMonth())).slice(-2);
    var day = ("0" + date.getDate()).slice(-2);
    var tname = year + month + day;
    // //console.log("결제하기!!!!!");
    // //console.log(defaultInfo);
    // //console.log(paymentForm);
    //console.log("결제전 커스텀");
    //console.log(customData);
    if (value === 1) {
      SetPayMentForm({
        merchant_uid: uid, // 결제 요청시 가맹점에서 아임포트로 전달한 가맹점 고유 주문번호
        name: value + defaultInfo.userName + uid, // 주문명 (필수항목)
        custom_data: customData,
        amount:
          gprops.location.state.amount.total +
          gprops.location.state.amount.ship, // 금액 (필수항목)
        buyer_name: recentShip.recentreceiver, // 구매자 이름
        //   buyer_email: "", // 구매자 이메일
        buyer_tel: recentShip.recentphonenumb, // 구매자 전화번호 (필수항목)
        buyer_addr: recentShip.recentfulladdr + recentShip.recentaddressdetail,
        buyer_postcode: recentShip.recentzone,
      });
    } else {
      SetPayMentForm({
        merchant_uid: uid, // 결제 요청시 가맹점에서 아임포트로 전달한 가맹점 고유 주문번호
        name: value + defaultInfo.userName + uid, //defaultInfo.userName + tname, // 주문명 (필수항목)
        custom_data: customData,
        amount:
          gprops.location.state.amount.total +
          gprops.location.state.amount.ship, // 금액 (필수항목)
        buyer_name: form.receiver, // 구매자 이름
        //   buyer_email: "", // 구매자 이메일
        buyer_tel: form.phonenumb + form.phonenummiddle + form.phonenumlast, // 구매자 전화번호 (필수항목)
        buyer_addr: fulladdress + form.addressdetail,
        buyer_postcode: zonecode,
      });
    }
    setPbutton(true);
    // IMP.request_pay(paymentForm, callback);
  };

  const callback = (response) => {
    const {
      success,
      error_msg,
      imp_uid,
      merchant_uid,
      pay_method,
      paid_amount,
      status,
    } = response;

    if (success) {
      const body = {
        impuid: imp_uid,
        merchantuid: merchant_uid,
        paymethod: pay_method,
        paid_amount: paid_amount,
        stat: status,
      };

      axios.post("/api/payment/complete", body).then((response) => {
        if (response.data.success) {
          alert("결제성공");
          history.push({
            pathname: "/user/payments/complete",
            state: { prevPath: history.location.pathname, re: "ok" },
          });
        } else if (response.data.message) {
          alert(response.data.message);
        } else {
          alert("서버검증에 실패했습니다 결제가 취소됩니다");
        }
      });
    } else {
      alert(`결제에 실패했습니다 : ${error_msg}`);
    }
  };

  //결제로직

  useEffect(() => {}, []);

  const handlePageChange = (page) => {
    // setPage(page);
    setAddrList({
      ...AddrList,
      current: page,
      minIndex: (page - 1) * pageSize,
      maxIndex: page * pageSize,
    });
  };

  //   // //console.log(props.location.state.amount);
  //   // //console.log(props.location.state.selectShopId);
  const [componentSize, setComponentSize] = useState("default");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAddrModalVisible, setIsAddrModalVisible] = useState(false);
  const [zonecode, SetZoneCode] = useState("");
  const [fulladdress, SetFullAddress] = useState("");
  const [addaddress, Setaddaddress] = useState(true);
  const [recentShip, SetRecentShip] = useState({
    recentreceiver: "",
    recentaddressName: "",
    recentphonenumb: "",
    recentphonenummiddle: "",
    recentphonenumlast: "",
    recentsubphonenum: "",
    recentsubphonenummiddle: "",
    recentsubphonenumlast: "",
    recentaddressdetail: "",
    recentzone: "",
    recentfulladdr: "",
    recentmemo: "",
    memo: "",
  });
  const {
    recentreceiver,
    recentaddressName,
    recentphonenumb,
    recentphonenummiddle,
    recentphonenumlast,
    recentsubphonenum,
    recentsubphonenummiddle,
    recentsubphonenumlast,
    recentaddressdetail,
    recentzone,
    recentfulladdr,
    recentmemo,
  } = recentShip;

  const [form, setForm] = useState({
    receiver: "",
    addressName: "",
    phonenumb: "",
    phonenummiddle: "",
    phonenumlast: "",
    subphonenum: "",
    subphonenummiddle: "",
    subphonenumlast: "",
    addressdetail: "",
    memo: "",
  });
  const {
    receiver,
    addressName,
    phonenumb,
    phonenummiddle,
    phonenumlast,
    subphonenum,
    subphonenummiddle,
    subphonenumlast,
    addressdetail,
    memo,
  } = form;

  const onChangeF = (e) => {
    const nextForm = {
      ...form,
      [e.target.name]: e.target.value,
    };
    setForm(nextForm);
    if (e.target.name === "memo") {
      setCustomData({
        allPrice: customData.allPrice,
        shipPrice: customData.shipPrice,
        detaildId: customData.detaildId,
        memo: e.target.value,
      });
    }
  };

  const onChangeP = (e) => {
    const regex = /^[0-9\b -]{0,4}$/;
    if (regex.test(e.target.value)) {
      const nextForm = {
        ...form,
        [e.target.name]: e.target.value,
      };
      setForm(nextForm);
    }
  };
  useEffect(() => {
    async function fetchList() {
      setLoading(true);
      const response = await axios.get("/api/myaddress");
      setPosts(response.data);
      setLoading(false);
      // //console.log("리스트 로딩완료");
      // //console.log(response.data);
      SetDefaultInfo({
        ...defaultInfo,
        userName: response.data.name,
        recentAddress: response.data.recent,
        phoneNumber: response.data.phoneNumb,
      });

      setAddrList({
        ...AddrList,
        data: response.data,
        totalPage: response.data.list.length / pageSize,
        minIndex: 0,
        maxIndex: pageSize,
        length: response.data.list.length,
      });
      if (response.data.recent === "null") {
        setValue(2);
      } else if (response.data && response.data.list) {
        for (const pa of response.data.list) {
          if (pa.id === response.data.recent) {
            // //console.log(pa);
            SetRecentShip({
              recentreceiver: pa.receiver,
              recentaddressName: pa.addressName,
              recentphonenumb: pa.mainPhoneNumber,
              recentsubphonenum: pa.subPhoneNumber,
              recentzone: pa.zonecode,
              recentfulladdr: pa.fulladdress,
              recentaddressdetail: pa.addressdetail,
            });
            addrselect(pa);

            break;
          }
        }
      }
    }
    fetchList();
  }, [rerender]);
  const { Option } = Select;
  // const phonenum = (
  //   <Select defaultValue="010" className="select-after">
  //     <Option value="010">010</Option>
  //     <Option value="011">011</Option>
  //     <Option value="016">016</Option>
  //     <Option value="017">017</Option>
  //     <Option value="018">018</Option>
  //     <Option value="019">019</Option>
  //     <Option value="02">02</Option>
  //     <Option value="031">031</Option>
  //     <Option value="032">032</Option>
  //     <Option value="033">033</Option>
  //     <Option value="041">041</Option>
  //     <Option value="042">042</Option>
  //     <Option value="043">043</Option>
  //     <Option value="044">044</Option>
  //     <Option value="051">051</Option>
  //     <Option value="052">052</Option>
  //     <Option value="053">053</Option>
  //     <Option value="054">054</Option>
  //     <Option value="055">055</Option>
  //     <Option value="061">061</Option>
  //     <Option value="062">062</Option>
  //     <Option value="063">063</Option>
  //     <Option value="064">064</Option>
  //     <Option value="070">070</Option>
  //     <Option value="080">080</Option>
  //     <Option value="0130">0130</Option>
  //     <Option value="0303">0303</Option>
  //     <Option value="0502">0502</Option>
  //     <Option value="0503">0503</Option>
  //     <Option value="0504">0504</Option>
  //     <Option value="0505">0505</Option>
  //     <Option value="0506">0506</Option>
  //     <Option value="0507">0507</Option>
  //     <Option value="0508">0508</Option>
  //     <Option value="050">050</Option>
  //     <Option value="012">012</Option>
  //     <Option value="059">059</Option>
  //   </Select>
  // );
  //   const [postcode, setPostCode] = useState([]);
  //   useEffect(() => {
  //     setPostCode(window.daum.Postcode);
  //   }, [window.daum.Postcode]);
  //   //   const a = window.daum.Postcode;
  //   <script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>;

  const addressList = () => {
    {
      setIsAddrModalVisible(true);
    }
  };
  const renderAddrList = () => {
    return (
      <>
        <table>
          <thead>
            <th>no</th>
            <th>배송지</th>
            <th>수령자</th>
            <th>주소1</th>
            <th>주소2</th>
            <th>del</th>
          </thead>
          {AddrList.data.list?.map(
            (da, index) =>
              index >= AddrList.minIndex &&
              index < AddrList.maxIndex && (
                <tr key={da.id}>
                  <td>{index + 1} </td>
                  <td>{da.addressName} </td>
                  <td>{da.receiver} </td>
                  <td>{da.addressdetail} </td>
                  <td>{da.fulladdress} </td>
                  <td>
                    <Button type="primary" onClick={() => addrselect(da)}>
                      선택
                    </Button>
                    <Button
                      type="primary"
                      danger
                      onClick={() => adddelete(da.id)}
                    >
                      삭제
                    </Button>
                  </td>
                </tr>
              )
          )}
        </table>

        <Pagination
          pageSize={pageSize}
          current={AddrList.current}
          total={AddrList.length}
          onChange={handlePageChange}
          style={{ bottom: "0px" }}
        />
      </>
    );
  };

  function execPostCode() {
    setIsModalVisible(true);
  }

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };
  const addrselect = (pa) => {
    setValue(1);

    SetRecentShip({
      recentreceiver: pa.receiver,
      recentaddressName: pa.addressName,
      recentphonenumb: pa.mainPhoneNumber,
      recentsubphonenum: pa.subPhoneNumber,
      recentzone: pa.zonecode,
      recentfulladdr: pa.fulladdress,
      recentaddressdetail: pa.addressdetail,
    });

    // var date = new Date();
    // var uid = new Date().getTime();
    // var year = date.getFullYear();
    // var month = ("0" + (1 + date.getMonth())).slice(-2);
    // var day = ("0" + date.getDate()).slice(-2);
    // var tname = year + month + day;

    // SetPayMentForm({
    //   merchant_uid: uid, // 결제 요청시 가맹점에서 아임포트로 전달한 가맹점 고유 주문번호
    //   name: value + defaultInfo.userName + uid, // 주문명 (필수항목)
    //   custom_data: customData,
    //   amount:
    //     gprops.location.state.amount.total + gprops.location.state.amount.ship, // 금액 (필수항목)
    //   buyer_name: defaultInfo.userName, // 구매자 이름
    //   //   buyer_email: "", // 구매자 이메일
    //   buyer_tel: defaultInfo.phoneNumber, // 구매자 전화번호 (필수항목)
    //   buyer_addr: recentShip.recentfulladdr + recentShip.recentaddressdetail,
    //   buyer_postcode: recentShip.recentzone,
    // });

    setIsAddrModalVisible(false);
  };
  const adddelete = (pa) => {
    const body = {
      deleteid: pa,
    };
    // //console.log("아이디");
    // //console.log(pa);
    axios.post("/api/deleteaddr", body).then((response) => {
      if (response.data.success) {
        setRerender(rerender + 1);
      } else {
        alert("주소록 삭제에 오류가 발생했습니다.");
      }
    });
  };

  const handleAddrListCancel = () => {
    setIsAddrModalVisible(false);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const [readyPay, setReadyPay] = useState(false);
  const paymentClick = () => {
    if (value === 2) {
      if (addaddress === true) {
        // //console.log("신규배송지이고 주소록에 추가합니다");
        const body = {
          receiver: form.receiver,
          addressName: form.addressName,
          phonenumb: form.phonenumb,
          phonenummiddle: form.phonenummiddle,
          phonenumlast: form.phonenumlast,
          subphonenum: form.subphonenum,
          subphonenummiddle: form.subphonenummiddle,
          subphonenumlast: form.subphonenumlast,
          fulladdress: fulladdress,
          zonecode: zonecode,
          addressdetail: form.addressdetail,
        };

        if (
          !receiver ||
          !addressName ||
          !phonenumb ||
          !phonenummiddle ||
          !phonenumlast ||
          !fulladdress ||
          !zonecode ||
          !addressdetail
        ) {
          return alert("입력을 확인해 주세요");
        }
        axios.post("/api/addaddress", body).then((response) => {
          if (response.data.success) {
            // //console.log("전송 성공");
          } else {
            alert("주소록 저장에 오류가 발생했습니다.");
          }
        });
      } else {
        //console.log("신규배송지이고 주수록에 추가 안합니다");
      }
    } else {
      //console.log("최근배송지입니다");

      if (
        !recentreceiver ||
        !recentaddressName ||
        !recentphonenumb ||
        !recentzone ||
        !recentfulladdr ||
        !recentaddressdetail
      ) {
        return alert("배송지를 정확히 입력해주세요");
      }
    }

    //결제창 오픈
    //사전검증
    //console.log("메모검증");
    //console.log(memo);
    const body = {
      dataList: customData.detaildId,
    };
    axios.post("/api/payment/after", body).then((response) => {
      if (response.data.success) {
        //console.log(response.data.success);
        onClickPayment(response.data.success);
        setReadyPay(true);
      } else {
        alert(response.data.message);
        history.goBack();
        return;
      }
    });
  };

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };
  const [value, setValue] = useState(1);

  const onChange = (e) => {
    // //console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };

  const onChangeaddaddress = (e) => {
    // //console.log("radio checked", e.target.checked);
    Setaddaddress(e.target.checked);
  };

  const handleComplete = (data) => {
    var fullRoadAddr = data.roadAddress; // 도로명 주소 변수
    var extraRoadAddr = ""; // 도로명 조합형 주소 변수

    if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
      extraRoadAddr += data.bname;
    }

    if (data.buildingName !== "" && data.apartment === "Y") {
      extraRoadAddr +=
        extraRoadAddr !== "" ? ", " + data.buildingName : data.buildingName;
    }

    if (extraRoadAddr !== "") {
      extraRoadAddr = " (" + extraRoadAddr + ")";
    }

    if (fullRoadAddr !== "") {
      fullRoadAddr += extraRoadAddr;
    }

    SetZoneCode(data.zonecode);
    SetFullAddress(fullRoadAddr);
    setIsModalVisible(false);
  };
  const [paydata, SetPaydata] = useState({});
  const [paymentForm, SetPayMentForm] = useState({
    pg: "html5_inicis", // PG사 (필수항목)
    pay_method: "card", // 결제수단 (필수항목)
    merchant_uid: "", // 결제 요청시 가맹점에서 아임포트로 전달한 가맹점 고유 주문번호
    name: "", // 주문명 (필수항목)
    amount: "", // 금액 (필수항목)
    buyer_name: "", // 구매자 이름
    buyer_tel: "", // 구매자 전화번호 (필수항목)
    buyer_email: "", // 구매자 이메일
    buyer_addr: "",
    buyer_postcode: "",
  });

  useEffect(() => {
    // //console.log(paymentForm);
    if (Pbutton === true && readyPay === true) {
      const { IMP } = window;
      // TODO : 식별코드 숨기기
      IMP.init("imp16473466"); // TODOS: 식별코드 숨기기
      IMP.request_pay(paymentForm, callback);
      setPbutton(false);
    }
  }, [paymentForm, readyPay]);

  const resultDetail = [];
  const [customData, setCustomData] = useState({
    allPrice: "",
    shipPrice: "",
    detaildId: [],
    memo: "배송메모가 없습니다",
  });

  //결제페이지 데이터띄우는곳
  useState(() => {
    const body = {
      //   amount: props.location.state.amount,
      shopId: gprops.location.state.selectShopId,
    };
    axios.post("/api/payment", body).then((response) => {
      if (response.data.success) {
        // //console.log("내부데이터 검증");

        // //console.log(response.data.dots);
        SetPaydata(response.data.dtos);

        response.data.dtos.ds.map((item, index) => {
          item.dp.map((product, index) =>
            product.do.map((option, index) => {
              resultDetail.push(option.detailedId);
            })
          );
        });

        setCustomData({
          allPrice: gprops.location.state.amount.total,
          shipPrice: gprops.location.state.amount.ship,
          detaildId: resultDetail,
          memo: "배송메모없음",
        });
        //console.log("커스템데이터");
        //console.log(customData);
      } else {
        alert("다시 시도해주세요");
      }
    });
  }, []);

  const renderbox = () => {
    return (
      <>
        <BrowserView>
          <div
            style={{
              fontSize: "20px",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            {/* 헤더 영역 */}
            <Row>
              <Col lg={6} md={12} sm={12} xs={12}>
                <div style={{}}>상점명</div>
              </Col>
              <Col lg={10} md={12} sm={12} xs={12}>
                <div style={{}}>상품상세</div>
              </Col>
              <Col lg={4} md={12} sm={12} xs={12}>
                <div style={{}}>상품금액</div>
              </Col>
              <Col lg={4} md={12} sm={12} xs={12}>
                <div style={{}}>배송비</div>
              </Col>
            </Row>
          </div>
          {/* 바디영역 */}

          <div>
            {paydata.ds &&
              paydata.ds.map((item, index) => {
                var allPrice = 0;
                var purePrice = 0;
                function pricePlus(getprice, getpureprice) {
                  allPrice = allPrice + getprice;
                  purePrice = purePrice + getpureprice;
                }

                var freePrice = item.freePrice;
                var shipPrice = item.shipPrice;
                function isfree(getpurePrice) {
                  if (getpurePrice >= freePrice) {
                    return "무료배송";
                  } else {
                    return shipPrice;
                  }
                }
                return (
                  <>
                    <div
                      style={{
                        textAlign: "center",
                      }}
                    >
                      <Row align={"middle"} style={{}}>
                        <Col lg={4} md={12} sm={12} xs={4}>
                          {item.shopName}{" "}
                          {item.dp.map((product, index) => (
                            <>
                              <div>{product.proId}</div>
                            </>
                          ))}
                        </Col>
                        <Col lg={12} md={12} sm={12} xs={20}>
                          <div style={{}}>
                            {item.dp.map((product, index) => (
                              <>
                                {/* 상품상세박스 */}
                                <Row align={"middle"}>
                                  <Col lg={6} md={6} sm={12} xs={12}>
                                    <Row>
                                      <Col span={24}>
                                        <img
                                          style={{
                                            width: "150px",
                                            height: "150px",
                                          }}
                                          alt="product"
                                          src={`https://shoppinghostpandabucket.s3.ap-northeast-2.amazonaws.com/${product.thumbNail}`}
                                        />
                                      </Col>
                                      <Col span={24}>
                                        <Link
                                          to={`/product/${product.productId}`}
                                        >
                                          {product.productName}
                                        </Link>
                                      </Col>
                                      <Col span={24}></Col>
                                    </Row>
                                  </Col>
                                  <Col span={18}>
                                    {product.do.map((option, index) => (
                                      <>
                                        <div style={{ background: "#FFDBC1" }}>
                                          {option.pandaName}/{option.optionName}
                                          /{option.optionCount}개*(
                                          {option.originPrice
                                            .toString()
                                            .replace(
                                              /\B(?=(\d{3})+(?!\d))/g,
                                              ","
                                            )}
                                          원)
                                          {option.discount
                                            ? pricePlus(
                                                Math.floor(
                                                  option.originPrice * 0.95
                                                ) * option.optionCount,

                                                option.originPrice *
                                                  option.optionCount
                                              )
                                            : pricePlus(
                                                option.originPrice *
                                                  option.optionCount,
                                                option.originPrice *
                                                  option.optionCount
                                              )}
                                          <div
                                            style={{ background: "#FFEAD0" }}
                                          >
                                            <Row>
                                              <Col span={24}>
                                                {option.discount ? (
                                                  <div>
                                                    {Math.floor(
                                                      option.originPrice * 0.95
                                                    ) *
                                                      option.optionCount
                                                        .toString()
                                                        .replace(
                                                          /\B(?=(\d{3})+(?!\d))/g,
                                                          ","
                                                        )}
                                                    <br />
                                                    (판다 할인 : 5% )
                                                  </div>
                                                ) : (
                                                  <div>
                                                    {(
                                                      option.originPrice *
                                                      option.optionCount
                                                    )
                                                      .toString()
                                                      .replace(
                                                        /\B(?=(\d{3})+(?!\d))/g,
                                                        ","
                                                      )}
                                                    <br />
                                                    (판다 할인 미적용)
                                                  </div>
                                                )}
                                              </Col>
                                            </Row>
                                          </div>
                                        </div>
                                        <br />
                                      </>
                                    ))}
                                  </Col>
                                </Row>
                              </>
                            ))}
                          </div>
                        </Col>
                        <Col lg={4} md={12} sm={12} xs={12}>
                          최종가격 :{" "}
                          {allPrice
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                          <br />
                          할인전 : (
                          {purePrice
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                          )
                        </Col>
                        <Col lg={4} md={12} sm={12} xs={12}>
                          <div style={{}}>
                            {isfree(purePrice)
                              .toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                            <br />(
                            {freePrice
                              .toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                            이상 무료배송)
                          </div>
                        </Col>
                      </Row>
                    </div>
                    <hr style={{ backgroundColor: "red" }} />
                  </>
                ); //return
              })}
          </div>

          <div className="col-12">
            <div className="card order-card">
              <hr className="cart-hr" />
              <div className="row order_calculator">
                <dl className="col-2">
                  <dt>총 상품 금액</dt>
                  <dd>
                    <span>
                      {" "}
                      {gprops.location.state.amount.total
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </span>
                  </dd>
                </dl>
                <dl className="col-1">
                  <i className="bx bx-plus-circle"></i>
                </dl>
                <dl className="col-2">
                  <dt>배송비</dt>
                  <dd>
                    {gprops.location.state.amount.ship
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </dd>
                </dl>
                <dl className="col-1">
                  <i className="bx bx-chevron-right"></i>
                </dl>
                <dl className="col-4">
                  <dt>총 주문 금액</dt>
                  <dd>
                    <span>
                      {" "}
                      {(
                        gprops.location.state.amount.total +
                        gprops.location.state.amount.ship
                      )
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </span>
                  </dd>
                </dl>
              </div>
              <hr className="cart-hr" />
            </div>
          </div>
        </BrowserView>
      </>
    );
  };

  const mobileBox = () => {
    return (
      <>
        <div
          style={{
            fontSize: "20px",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          {/* 헤더 영역 */}
          <Row>
            <Col lg={6} md={12} sm={12} xs={12}>
              <div style={{}}>상점명</div>
            </Col>
            <Col lg={10} md={12} sm={12} xs={12}>
              <div style={{}}>상품상세</div>
            </Col>
            <Col lg={4} md={12} sm={12} xs={12}>
              <div style={{}}>상품금액</div>
            </Col>
            <Col lg={4} md={12} sm={12} xs={12}>
              <div style={{}}>배송비</div>
            </Col>
          </Row>
        </div>
        {/* 바디영역 */}

        <div>
          {paydata.ds &&
            paydata.ds.map((item, index) => {
              var allPrice = 0;
              var purePrice = 0;
              function pricePlus(getprice, getpureprice) {
                allPrice = allPrice + getprice;
                purePrice = purePrice + getpureprice;
              }

              var freePrice = item.freePrice;
              var shipPrice = item.shipPrice;
              function isfree(getpurePrice) {
                if (getpurePrice >= freePrice) {
                  return "무료배송";
                } else {
                  return shipPrice;
                }
              }
              return (
                <>
                  <div
                    style={{
                      textAlign: "center",
                    }}
                  >
                    <Row align={"middle"} style={{}}>
                      <Col lg={4} md={12} sm={12} xs={24}>
                        {item.shopName}{" "}
                        {item.dp.map((product, index) => (
                          <>
                            <div>{product.proId}</div>
                          </>
                        ))}
                      </Col>
                      <Col lg={12} md={12} sm={12} xs={24}>
                        <div style={{}}>
                          {item.dp.map((product, index) => (
                            <>
                              {/* 상품상세박스 */}
                              <Row align={"middle"}>
                                <Col lg={6} md={6} sm={12} xs={12}>
                                  <Row>
                                    <Col span={24}>
                                      <img
                                        style={{
                                          width: "150px",
                                          height: "150px",
                                        }}
                                        alt="product"
                                        src={`https://shoppinghostpandabucket.s3.ap-northeast-2.amazonaws.com/${product.thumbNail}`}
                                      />
                                    </Col>
                                    <Col span={24}>
                                      <Link
                                        to={`/product/${product.productId}`}
                                      >
                                        {product.productName}
                                      </Link>
                                    </Col>
                                    <Col span={24}></Col>
                                  </Row>
                                </Col>
                                <Col span={24}>
                                  {product.do.map((option, index) => (
                                    <>
                                      <div style={{ background: "#FFDBC1" }}>
                                        {option.pandaName}/{option.optionName}/
                                        {option.optionCount}개*(
                                        {option.originPrice
                                          .toString()
                                          .replace(
                                            /\B(?=(\d{3})+(?!\d))/g,
                                            ","
                                          )}
                                        원)
                                        {option.discount
                                          ? pricePlus(
                                              Math.floor(
                                                option.originPrice * 0.95
                                              ) * option.optionCount,
                                              option.originPrice *
                                                option.optionCount
                                            )
                                          : pricePlus(
                                              option.originPrice *
                                                option.optionCount,
                                              option.originPrice *
                                                option.optionCount
                                            )}
                                        <div style={{ background: "#FFEAD0" }}>
                                          <Row>
                                            <Col span={24}>
                                              {option.discount ? (
                                                <div
                                                  style={{
                                                    textAlign: "center",
                                                  }}
                                                >
                                                  {Math.floor(
                                                    option.originPrice * 0.95
                                                  ) *
                                                    option.optionCount
                                                      .toString()
                                                      .replace(
                                                        /\B(?=(\d{3})+(?!\d))/g,
                                                        ","
                                                      )}
                                                  <br />
                                                  (판다 할인 : 5% )
                                                </div>
                                              ) : (
                                                <div
                                                  style={{
                                                    textAlign: "center",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                  }}
                                                >
                                                  {(
                                                    option.originPrice *
                                                    option.optionCount
                                                  )
                                                    .toString()
                                                    .replace(
                                                      /\B(?=(\d{3})+(?!\d))/g,
                                                      ","
                                                    )}
                                                  <br />
                                                  (판다 할인 미적용)
                                                </div>
                                              )}
                                            </Col>
                                            <Col span={4}></Col>
                                          </Row>
                                        </div>
                                      </div>
                                      <br />
                                    </>
                                  ))}
                                </Col>
                              </Row>
                            </>
                          ))}
                        </div>
                      </Col>
                      <Col lg={4} md={12} sm={12} xs={12}>
                        최종가격 : {allPrice}
                        <br />
                        할인전 : ({purePrice})
                      </Col>
                      <Col lg={4} md={12} sm={12} xs={12}>
                        <div style={{}}>
                          {isfree(purePrice)
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                          <br />(
                          {freePrice
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                          이상 무료배송)
                        </div>
                      </Col>
                    </Row>
                  </div>
                  <hr style={{ backgroundColor: "red" }} />
                </>
              ); //return
            })}
        </div>

        <div className="col-12">
          <div className="card order-card">
            <hr className="cart-hr" />
            <div className="row order_calculator">
              <dl className="col-5">
                <dt> 상품 금액</dt>
                <dd>
                  <span>
                    {gprops.location.state.amount.total
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </span>
                </dd>
              </dl>
              <dl className="col-1">
                <i className="bx bx-plus-circle"></i>
              </dl>
              <dl className="col-5">
                <dt>배송비</dt>
                <dd>
                  <span>
                    {gprops.location.state.amount.ship
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </span>
                </dd>
              </dl>

              <dl className="col-4">
                <i className="bx bx-chevron-right" />
              </dl>
              <dl className="col-8">
                <dt>총 주문 금액</dt>
                <dd>
                  <span>
                    {(
                      gprops.location.state.amount.total +
                      gprops.location.state.amount.ship
                    )
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </span>
                </dd>
              </dl>
            </div>
            <hr className="cart-hr" />
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <div style={{ width: "85%", margin: "3rem auto" }}>
        <h1>Payment</h1>
        <Divider />
        <h3>상품정보</h3>
        <BrowserView>
          <div>{renderbox()}</div>
        </BrowserView>
        <MobileView>{mobileBox()}</MobileView>

        <div>
          <h2>배송지 정보</h2>

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
            <Modal
              title="주소록"
              visible={isAddrModalVisible}
              onCancel={handleAddrListCancel}
              destroyOnClose={true}
              footer={[]}
            >
              {renderAddrList()}
            </Modal>

            <Form.Item label="주소록">
              {" "}
              <Radio.Group onChange={onChange} value={value}>
                <Radio value={1}>최근 배송지</Radio>
                <Radio value={2}>신규 배송지</Radio>
              </Radio.Group>
              <Button type="primary" onClick={addressList}>
                주소록 열기
              </Button>
            </Form.Item>
            {value === 1 ? (
              <Row gutter={16}>
                <Col span={16}>
                  <Card title={recentaddressName} bordered={false}>
                    <div> 수령인: {recentreceiver}</div>
                    <br />
                    <div> 연락처1: {recentphonenumb}</div>
                    <div> 연락처2: {recentsubphonenum}</div>
                    <br />

                    <div> 우편번호: {recentzone}</div>
                    <div> 주소: {recentfulladdr}</div>
                    <div> 상세주소: {recentaddressdetail}</div>
                    <div>
                      배송메모:
                      <Input
                        name="memo"
                        value={memo}
                        onChange={onChangeF}
                      />{" "}
                    </div>
                  </Card>
                </Col>
              </Row>
            ) : (
              <div>
                <Form.Item
                  label="수령인"
                  name="수령인"
                  rules={[
                    { required: true, message: "수령인을 정확히 입력해주세요" },
                  ]}
                >
                  <Input
                    name="receiver"
                    value={receiver}
                    onChange={onChangeF}
                  />
                </Form.Item>
                <Form.Item
                  label="배송지명"
                  name="배송지명"
                  rules={[
                    {
                      required: true,
                      message: "배송지명을 정확히 입력해주세요",
                    },
                  ]}
                >
                  <Input
                    name="addressName"
                    value={addressName}
                    onChange={onChangeF}
                  />
                </Form.Item>
                <Form.Item
                  label="연락처 1"
                  name="연락처 1"
                  rules={[
                    {
                      required: true,
                      message: "연락처를 정확히 입력해주세요",
                    },
                  ]}
                >
                  <Row gutter={24}>
                    <Col lg={6}>
                      <Input
                        name="phonenumb"
                        value={phonenumb}
                        onChange={onChangeP}
                      />
                    </Col>
                    <Col lg={1}>-</Col>
                    <Col lg={6}>
                      <Input
                        name="phonenummiddle"
                        value={phonenummiddle}
                        onChange={onChangeP}
                      />
                    </Col>
                    <Col lg={1}>-</Col>
                    <Col lg={6}>
                      <Input
                        name="phonenumlast"
                        value={phonenumlast}
                        onChange={onChangeP}
                      />
                    </Col>
                  </Row>
                </Form.Item>
                <Form.Item label="연락처 2">
                  <Row gutter={24}>
                    <Col lg={6}>
                      <Input
                        name="subphonenum"
                        value={subphonenum}
                        onChange={onChangeP}
                      />
                    </Col>
                    <Col lg={1}>-</Col>
                    <Col lg={6}>
                      <Input
                        name="subphonenummiddle"
                        value={subphonenummiddle}
                        onChange={onChangeP}
                      />
                    </Col>
                    <Col lg={1}>-</Col>
                    <Col lg={6}>
                      <Input
                        name="subphonenumlast"
                        value={subphonenumlast}
                        onChange={onChangeP}
                      />
                    </Col>
                  </Row>
                </Form.Item>
                <Form.Item label="우편번호">
                  <Row gutter={24}>
                    <Col lg={8}>
                      <Input
                        style={{ BackgroundColor: "red" }}
                        value={zonecode}
                      />
                    </Col>
                    <Col lg={8}>
                      <Modal
                        title="주소검색"
                        visible={isModalVisible}
                        onCancel={handleCancel}
                        destroyOnClose={true}
                        footer={[]}
                      >
                        <DaumPostCode
                          autoClose="true"
                          onComplete={handleComplete}
                          className="post-code"
                        />
                      </Modal>
                      <Button type="primary" onClick={execPostCode}>
                        우편번호
                      </Button>
                    </Col>
                    <Col lg={8}>
                      <Checkbox
                        defaultChecked={true}
                        onChange={onChangeaddaddress}
                      ></Checkbox>
                      주소록에 추가하기
                    </Col>
                  </Row>
                </Form.Item>
                <Form.Item
                  label="배송지주소 상세"
                  name="배송지주소 상세"
                  rules={[
                    {
                      required: true,
                      message: "배송지 주소를 정확히 입력해주세요",
                    },
                  ]}
                >
                  <Row gutter={24}>
                    <Col lg={24}>
                      <Input value={fulladdress} />
                    </Col>
                    <Col lg={24}>
                      <Input
                        name="addressdetail"
                        value={addressdetail}
                        onChange={onChangeF}
                      />
                    </Col>
                  </Row>
                </Form.Item>
                <Form.Item label="배송메모">
                  <Input name="memo" value={memo} onChange={onChangeF} />
                </Form.Item>
              </div>
            )}
            <div>
              <Button onClick={paymentClick} htmlType="submit">
                <CreditCardOutlined />
                결제버튼
              </Button>
            </div>
          </Form>
        </div>
        <Divider />
        <div></div>
      </div>
    </>
  );
}

export default PaymentPage;
