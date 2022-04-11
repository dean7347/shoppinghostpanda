import React, { useEffect, useState, useMemo, useCallback } from "react";
import axios from "../api/axiosDefaults";
import HeaderContainer from "../containers/common/HeaderContainer";
import Footer from "../components/common/Footer";
import { Form, Input, Button } from "antd";
import ProductImage from "../components/sections/ProductImage";
import ProductInfo from "../components/sections/ProductInfo";

import {
  Row,
  Col,
  Tabs,
  BackTop,
  Affix,
  Collapse,
  Divider,
  Modal,
  Checkbox,
} from "antd";
import $ from "jquery";
import { throttledScroll } from "lodash";
import PandaView from "../components/common/PandaView";
import moment from "../../node_modules/moment/moment";
import Paging from "../components/common/Paging";

function DetailProductPage(props) {
  const { TabPane } = Tabs;
  const [form] = Form.useForm();
  function isValidHttpUrl(string) {
    let url;

    try {
      url = new URL(string);
    } catch (_) {
      return false;
    }

    return url.protocol === "http:" || url.protocol === "https:";
  }
  const [Link, SetLink] = useState("");
  const [step, setStep] = useState(true);
  const onSubmit = (e) => {
    const fullUrl = `https://noembed.com/embed?url=${e.link}}`;
    axios
      .get(fullUrl)
      .then((result) => {
        console.log(result.data);
        if (result.data.error) {
          setStep(false);
          return;
        }
      })
      .then(setStep(true));
    if (step) {
      alert("올바른 URL가 아닙니다");
      return;
    }
    if (!isValidHttpUrl(e.Link)) {
      alert("올바른 URL가 아닙니다");
      return;
    }
    if (!approvePanda) {
      alert("판다 승인후 활동가능합니다");
      return;
    }
    const body = {
      productId: productId,
      link: Link,
    };
    axios.post("/api/addpropanda", body).then((response) => {
      // //console.log(response.data);
      if (response.data.success) {
        alert("판다링크 생성 완료");
      } else {
        alert(
          "판다링크생성에 실패했습니다. 해당 현상이 계속된다면 문의주시기 바랍니다"
        );
      }
    });
    form.resetFields();
  };
  const LinkHandler = (e) => {
    e.preventDefault();
    if (isValidHttpUrl(e.target.value)) {
      SetLink(e.target.value);
    } else {
      alert("오류방지를위해 ctrl c + ctrl v를 이용해주세요");
    }
  };

  const productId = props.match.params.productId;
  const [Product, setProduct] = useState({});
  const [DetailImage, setDetailImage] = useState([{}]);
  const [Pandas, SetPandas] = useState([{}]);
  const [sto, setSto] = useState();
  const [top, setTop] = useState(10);
  const [container, setContainer] = useState(null);
  const { TextArea } = Input;
  const [Ispanda, setIspanda] = useState();
  const [approvePanda, setapprovePanda] = useState();

  useEffect(() => {
    axios.get("/api/ispanda").then((response) => {
      // //console.log("판다스데이터확인");

      // //console.log(response.data);
      setIspanda(response.data.ispanda);
      setapprovePanda(response.data.approve);
      //console.log("어프룹판다", response.data);
    });
  }, []);
  useEffect(() => {
    axios.get(`/api/getpandas_by_id?id=${productId}`).then((response) => {
      if (response.data.success) {
        //console.log("디테일받아오기", response);
        SetPandas(response.data.details);
        // //console.log("판다스정보");
        // //console.log(response.data.details);
      } else {
        // //console.log("판다스 정보를 가져오지 못했습니다");
      }
    });
  }, []);

  useEffect(() => {
    axios
      .get(`/api/product/products_by_id?id=${productId}`)
      .then((response) => {
        if (response.data.success) {
          // //console.log("디테일정보");
          // //console.log(response.data);
          //console.log("프로덕트", response.data);
          setProduct(response.data);
          let temp = JSON.parse(response.data.lowform);
          setSto(temp);
          // //console.log("콘솔템프정보");

          // //console.log(response.data);
          setDetailImage(response.data.detailImages);
        } else {
          alert("상세정보 가져오기를 실패했습니다");
        }
      });
  }, []);

  const detailImage = DetailImage.map((item, index) => {
    return (
      <div key={index + item.filepath}>
        <img
          style={{ width: "100%", objectFit: "fill" }}
          src={`https://shoppinghostpandabucket.s3.ap-northeast-2.amazonaws.com/${item.filepath}`}
          alt=""
        />
        <br />
      </div>
    );
  });
  //게시판 작성

  const [NowPage, setNowPage] = useState([]);
  const [ViewCount, setViewCountPage] = useState([]);
  const [TotalCount, setTotalCountPage] = useState([]);
  const [Page, setPage] = useState(1);
  const [board, setBoard] = useState();

  const onPageChanged = useCallback(
    (page) => {
      setPage(page);
      //console.log("호출");

      axios
        .get(`/api/getqna?pid=${productId}&size=5&page=${page - 1}`)
        .then((response) => {
          if (response.data != null) {
            //console.log("데이터가져옴", response.data);
            setBoard(response.data.boardLists);
            //console.log(board);
            //console.log(response.data.boardLists);
            setViewCountPage(5);
            setTotalCountPage(response.data.totalE);
          } else {
            //console.log("상품들을 가져오는데 실패했습니다.");
          }
        });
    },
    [Page]
  );

  useEffect(
    (Page) => {
      axios
        .get(`/api/getqna?pid=${productId}&size=5&page=${Page - 1}`)
        .then((response) => {
          if (response.data != null) {
            //console.log("데이타");

            //console.log(response.data);
            setBoard(response.data.boardLists);

            //page, count, setPage
            //현재 페이지
            //console.log("Page");

            //console.log(Page);
            // // //console.log(response.data.pageable.pageNumber);
            //한페이지당 보여줄 리스트 아이템 갯수
            setViewCountPage(5);
            //총 아이템의 갯수
            setTotalCountPage(response.data.totalE);
          } else {
            // //console.log("상품들을 가져오는데 실패했습니다.");
          }
        });
    },
    [ViewCount, TotalCount]
  );

  //후기작성
  const [ReviewViewCount, setReviewViewCountPage] = useState([]);
  const [ReviewTotalCount, setReviewTotalCountPage] = useState([]);
  const [ReviewPage, setReviewPage] = useState(1);
  const [Review, setReview] = useState();

  const onReviewPageChanged = useCallback(
    (page) => {
      setReviewPage(page);

      axios
        .get(`/api/getreview?pid=${productId}&size=5&page=${page - 1}`)
        .then((response) => {
          if (response.data != null) {
            //console.log("데이터가져옴", response.data);
            setReview(response.data.boardLists);
            //console.log(Review);
            //console.log(response.data.boardLists);
            setReviewViewCountPage(5);
            setReviewTotalCountPage(response.data.totalE);
          } else {
            //console.log("상품들을 가져오는데 실패했습니다.");
          }
        });
    },
    [ReviewPage]
  );

  useEffect(
    (ReviewPage) => {
      axios
        .get(`/api/getreview?pid=${productId}&size=5&page=${ReviewPage - 1}`)
        .then((response) => {
          if (response.data != null) {
            //console.log("데이타232");
            //console.log(response.data.boardLists);
            setReview(response.data.boardLists);
            //page, count, setPage
            //현재 페이지
            //console.log("Page");
            //console.log(ReviewPage);
            // // //console.log(response.data.pageable.pageNumber);
            //한페이지당 보여줄 리스트 아이템 갯수
            setReviewViewCountPage(5);
            //총 아이템의 갯수
            setReviewTotalCountPage(response.data.totalE);
          } else {
            // //console.log("상품들을 가져오는데 실패했습니다.");
          }
        });
    },
    [ReviewViewCount, ReviewTotalCount]
  );

  const [qna, setQna] = useState({
    title: "",
    content: "",
    comment: "",
  });
  const onChangeQnA = (e) => {
    const nextForm = {
      ...qna,
      [e.target.name]: e.target.value,
    };
    //console.log(e.target.value);

    setQna(nextForm);
  };
  const baordClick = (param) => {
    //console.log("보드클릭");
    //console.log(param);
  };
  const [isqnaModalVisible, setIsqnaModalVisible] = useState(false);
  const [isafterModalVisible, setIsafterModalVisible] = useState(false);

  const { Panel } = Collapse;
  const showModalqna = () => {
    setIsqnaModalVisible(true);
  };
  const showModalReview = () => {
    setIsafterModalVisible(true);
  };

  const handleOk = () => {
    setIsqnaModalVisible(false);
    const body = {
      productId: props.match.params.productId,
      title: qna.title,
      contents: qna.content,
    };
    //console.log(body);

    ///api/createqna
    axios.post("/api/createqna", body).then((response) => {
      if (response.data.success) {
        alert("문의사항 작성에 성공했습니다");
        window.location.reload();
      } else {
        alert("문의사항 작성에 실패 했습니다.");
        window.location.reload();
      }
    });
    setQna({
      title: "",
      content: "",
    });
  };

  const handleOkReview = () => {
    setIsafterModalVisible(false);
    const body = {
      productId: props.match.params.productId,
      title: qna.title,
      contents: qna.content,
    };
    //console.log(body);

    ///api/createqna
    axios.post("/api/createreview", body).then((response) => {
      if (response.data.success) {
        alert("후기 작성에 성공했습니다");
        window.location.reload();
      } else {
        alert("후기 작성에 실패 했습니다.");
        window.location.reload();
      }
    });
    setQna({
      title: "",
      content: "",
    });
  };

  const handleCancel = () => {
    setIsqnaModalVisible(false);
    setQna({
      title: "",
      content: "",
    });
  };
  const handleReviewCancel = () => {
    setIsafterModalVisible(false);
    setQna({
      title: "",
      content: "",
    });
  };
  const onClickQnaReply = (e) => {
    const body = {
      boardId: e,
      contents: qna.comment,
    };
    axios.post("/api/createcomment", body).then((response) => {
      if (response.data.success) {
        alert("답글 작성에 성공했습니다");
        window.location.reload();
      } else {
        alert("답글 작성에 실패했습니다");
        window.location.reload();
      }
    });
  };
  function stringsplit(str) {
    var strArray = str.split("-");
    return strArray[0] + "/" + strArray[1] + "/" + strArray[2].substring(0, 2);
  }
  const rederReview =
    Review &&
    Review.map((item, idx) => {
      return (
        <>
          <Collapse onChange={baordClick}>
            <Panel
              header={
                <div style={{ width: "100%" }}>
                  <Row justify="center" gutter={24}>
                    <Col lg={6} md={12} sm={12} xs={12}>
                      {item.boardId}
                    </Col>
                    <Col lg={6} md={12} sm={12} xs={12}>
                      {item.title}
                    </Col>
                    <Col lg={6} md={12} sm={12} xs={12}>
                      {stringsplit(item.createdAt)}
                    </Col>
                    <Col lg={6} md={12} sm={12} xs={12}>
                      {item.user.substring(0, 7)}
                    </Col>
                  </Row>
                </div>
              }
              key={idx}
            >
              {item.content}
              <hr backgroundColor={"red"} />
              <Divider orientation="left">답글</Divider>
              <Col span={24}>
                <Row>
                  <Col span={20}>
                    <TextArea name="comment" onChange={onChangeQnA} rows={4} />
                  </Col>
                  <Col>
                    <Button onClick={() => onClickQnaReply(item.boardId)}>
                      답글등록
                    </Button>
                  </Col>
                </Row>
              </Col>
              <Divider />
              <Col span={1}></Col>
              {item.comments.map((co, i) => {
                return (
                  <>
                    <Col span={4}>
                      {co.username.substring(0, 7)} -{stringsplit(co.createAt)}
                    </Col>
                    <Col span={4}> </Col>

                    <Col span={20}>{co.contents}</Col>
                    <Col>
                      <div>
                        <hr />
                      </div>
                    </Col>
                  </>
                );
              })}
            </Panel>
          </Collapse>
        </>
      );
    });
  const rederqna =
    board &&
    board.map((item, idx) => {
      return (
        <>
          <Collapse onChange={baordClick}>
            <Panel
              header={
                <div style={{ width: "100%" }}>
                  <Row justify="center" gutter={24}>
                    <Col lg={6} md={12} sm={12} xs={12}>
                      {item.boardId}
                    </Col>
                    <Col lg={6} md={12} sm={12} xs={12}>
                      {item.title}
                    </Col>
                    <Col lg={6} md={12} sm={12} xs={12}>
                      {stringsplit(item.createdAt)}
                    </Col>
                    <Col lg={6} md={12} sm={12} xs={12}>
                      {item.user.substring(0, 7)}
                    </Col>
                  </Row>
                </div>
              }
              key={idx}
            >
              {item.content}
              <hr backgroundColor={"red"} />
              <Divider orientation="left">답글</Divider>
              <Col span={24}>
                <Row>
                  <Col span={20}>
                    <TextArea name="comment" onChange={onChangeQnA} rows={4} />
                  </Col>
                  <Col>
                    <Button onClick={() => onClickQnaReply(item.boardId)}>
                      답글등록
                    </Button>
                  </Col>
                </Row>
              </Col>
              <Divider />
              <Col span={1}></Col>
              {item.comments.map((co, i) => {
                return (
                  <>
                    <Col span={4}>
                      {co.username.substring(0, 7)} -{stringsplit(co.createAt)}
                    </Col>
                    <Col span={4}> </Col>

                    <Col span={20}>{co.contents}</Col>
                    <Col>
                      <div>
                        <hr />
                      </div>
                    </Col>
                  </>
                );
              })}
            </Panel>
          </Collapse>
        </>
      );
    });

  return (
    <>
      <Modal
        title="상품후기"
        visible={isafterModalVisible}
        onOk={handleOkReview}
        onCancel={handleReviewCancel}
      >
        <Row>
          <Col span={4}>제목</Col>
          <Col span={20}>
            <Input onChange={onChangeQnA} name="title" />
          </Col>
          <Col span={24}>내용</Col>
          <Col span={4}></Col>
          <Col span={20}>
            <TextArea name="content" onChange={onChangeQnA} rows={10} />
          </Col>
        </Row>
      </Modal>
      <Modal
        title="상품 문의"
        visible={isqnaModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Row>
          <Col span={4}>제목</Col>
          <Col span={20}>
            <Input onChange={onChangeQnA} name="title" />
          </Col>
          <Col span={24}>내용</Col>
          <Col span={4}></Col>
          <Col span={20}>
            <TextArea name="content" onChange={onChangeQnA} rows={10} />
          </Col>
        </Row>
      </Modal>
      <BackTop />

      <div style={{ width: "100%", padding: "3rem 4rem" }}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <h1>{Product.productName}</h1>
        </div>
        <br />
        <Row gutter={[16, 16]} justify={"center"}>
          <Col lg={8} sm={16}>
            <div style={{ maxWidth: "320px" }}>
              <ProductImage detail={Product} />
            </div>
          </Col>
          <Col lg={8} sm={16}>
            <div>
              {Product.salse ? (
                <ProductInfo
                  detail={Product}
                  proId={productId}
                  pandas={Pandas}
                />
              ) : (
                <div>판매 중지된 상품입니다</div>
              )}
            </div>
          </Col>

          <Col lg={24} sm={24}>
            <Tabs
              defaultActiveKey="1"
              type="card"
              size={"small"}
              centered={"true"}
            >
              <TabPane tab="상품 상세" key="1">
                <div
                  style={{
                    Width: "100%",
                    justifyContent: "center",
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      Width: "100%",
                      maxWidth: "860px",
                      display: "inline-block",
                    }}
                  >
                    {detailImage}
                  </div>
                </div>
              </TabPane>
              <TabPane tab="판다보기" key="2">
                <PandaView pandas={Pandas} />
              </TabPane>
              <TabPane tab="상품정보" key="3">
                {/* {sto && lowOption(`${Product.type}`)} */}
                {/* {//console.log("상품정보", Product.notice)} */}
                <div style={{ textAlign: "center" }}>
                  <h2>상품정보고시</h2>
                  <table>
                    {Product.notice &&
                      Product.notice.map((value, index) => {
                        return (
                          <>
                            <tr>
                              <td
                                style={{
                                  backgroundColor: "#D3D3D3",
                                  fontWeight: "bold",
                                }}
                              >
                                {value}
                              </td>
                              <td>{Product.noticeV[index]}</td>
                            </tr>
                          </>
                        );
                      })}
                  </table>
                </div>
              </TabPane>
              <TabPane tab="판매자/반품/교환정보" key="4">
                <h2>판매자정보</h2>
                <table>
                  <tr>
                    <td
                      style={{ backgroundColor: "#D3D3D3", fontWeight: "bold" }}
                    >
                      상점명
                    </td>
                    <td>{Product.shopName}</td>
                    <td
                      style={{ backgroundColor: "#D3D3D3", fontWeight: "bold" }}
                    >
                      대표자
                    </td>
                    <td>{Product.representative}</td>
                  </tr>

                  <tr>
                    <td
                      style={{ backgroundColor: "#D3D3D3", fontWeight: "bold" }}
                    >
                      사업자등록번호
                    </td>
                    <td>{Product.crn}</td>
                    <td
                      style={{ backgroundColor: "#D3D3D3", fontWeight: "bold" }}
                    >
                      통신판매업번호
                    </td>
                    <td>{Product.number}</td>
                  </tr>
                  <tr>
                    <td
                      style={{ backgroundColor: "#D3D3D3", fontWeight: "bold" }}
                    >
                      사업장 소재지
                    </td>
                    <td>{Product.comaddress}</td>
                    <td
                      style={{ backgroundColor: "#D3D3D3", fontWeight: "bold" }}
                    >
                      고객센터 번호
                    </td>
                    <td>{Product.csPhone}</td>
                  </tr>
                  <tr>
                    <td
                      style={{ backgroundColor: "#D3D3D3", fontWeight: "bold" }}
                    >
                      배송방법
                    </td>
                    <td>택배</td>
                    <td
                      style={{ backgroundColor: "#D3D3D3", fontWeight: "bold" }}
                    >
                      평균배송기간
                    </td>
                    <td>{Product.avdtime}</td>
                  </tr>
                  <tr>
                    <td
                      style={{ backgroundColor: "#D3D3D3", fontWeight: "bold" }}
                    >
                      배송비용
                    </td>
                    <td>{Product.nofree}</td>
                    <td
                      style={{ backgroundColor: "#D3D3D3", fontWeight: "bold" }}
                    >
                      무료배송비용(판다할인 미적용으로산정)
                    </td>
                    <td>{Product.freePrice}</td>
                  </tr>
                </table>

                <h2>반품 교환안내</h2>
                <table>
                  <tr>
                    <td
                      style={{ backgroundColor: "#D3D3D3", fontWeight: "bold" }}
                    >
                      판매자 지정택배사
                    </td>
                    <td>{Product.reship}</td>
                    <td
                      style={{ backgroundColor: "#D3D3D3", fontWeight: "bold" }}
                    >
                      반품배송비
                    </td>
                    <td>{Product.returnpee}</td>
                  </tr>

                  <tr>
                    <td
                      style={{ backgroundColor: "#D3D3D3", fontWeight: "bold" }}
                    >
                      교환배송비
                    </td>
                    <td>{Product.tradepee}</td>
                    <td
                      style={{ backgroundColor: "#D3D3D3", fontWeight: "bold" }}
                    >
                      보내실 곳
                    </td>
                    <td>{Product.returnaddress}</td>
                  </tr>
                  <tr>
                    <td
                      style={{ backgroundColor: "#D3D3D3", fontWeight: "bold" }}
                    >
                      반품/교환 사유에 따른요청가능기간
                    </td>
                    <td>{Product.candate}</td>
                    <td
                      style={{ backgroundColor: "#D3D3D3", fontWeight: "bold" }}
                    >
                      반품/교환 불가능사유
                    </td>
                    <td>{Product.noreturn}</td>
                  </tr>
                </table>
                <h2>주의사항</h2>
                <div style={{ fontSize: "5px" }}>
                  *판매자가 배송을 시작한 후 14일 이후 자동 구매확정됩니다.
                  <br />
                  *전자상거래 등에서의 소비자보호에 관한 법률에 의한 반품규정이
                  판매자가 지정한 반품조건보다 우선합니다
                  <br />
                  *전자상거래 등에서의 소비자보호에 관한 법률에 의거하여
                  미성년자가 물품을 구매하는 경우, 법정대리인이 동의하지 않으면
                  미성년자 본인 또는 법정대리인이 구매를 취소할 수 있습니다.
                  <br />
                  *전기용품 및 생활용품 안전관리법 및 어린이제품 안전 특별법
                  규정에 의한 안전관리대상 품목인 전기용품, 생활용품,
                  어린이제품을 판매 또는 구매하실 경우에는 해당 제품이 안전인증,
                  안전확인, 공급자적합성확인, 안전기준준수 적용 제품인지
                  확인하시기 바랍니다.
                  <br />
                  *쇼핑호스트 판다의 결제시스템을 이용하지 않고 판매자와 직접
                  거래하실 경우 상품을 받지 못하거나 구매한 상품과 상이한 상품을
                  받는 등 피해가 발생할 수 있으니 유의하시기 바랍니다.
                  <br />
                  *쇼핑호스트 판다에 등록된 판매상품과 상품의 내용은 판매자가
                  등록한 것으로 쇼핑호스트 판다는 등록된 내용에 대하여 일체의
                  책임을 지지 않습니다.
                </div>
              </TabPane>
              <TabPane tab="상품 문의" key="5">
                <Button onClick={showModalqna}>QnA작성하기</Button>
                <Row justify="center">
                  <Col lg={6} md={12} sm={12} xs={12}>
                    no
                  </Col>
                  <Col lg={6} md={12} sm={12} xs={12}>
                    제목
                  </Col>
                  <Col lg={6} md={12} sm={12} xs={12}>
                    날짜
                  </Col>
                  <Col lg={6} md={12} sm={12} xs={12}>
                    작성자
                  </Col>
                </Row>
                {rederqna}

                <div>
                  <Row justify="center">
                    <Col>
                      <Paging
                        //토탈레코드
                        onPageChanged={onPageChanged}
                        currentPage={Page}
                        ViewCount={ViewCount}
                        TotalCount={TotalCount}
                      />
                    </Col>
                  </Row>
                </div>
              </TabPane>
              <TabPane tab="상품 후기" key="6">
                <Button onClick={showModalReview}>후기작성하기</Button>
                <Row justify="center">
                  <Col lg={6} md={12} sm={12} xs={12}>
                    no
                  </Col>
                  <Col lg={6} md={12} sm={12} xs={12}>
                    제목
                  </Col>
                  <Col lg={6} md={12} sm={12} xs={12}>
                    날짜
                  </Col>
                  <Col lg={6} md={12} sm={12} xs={12}>
                    작성자
                  </Col>
                </Row>
                {rederReview}

                <div>
                  <Row justify="center">
                    <Col>
                      <Paging
                        //토탈레코드
                        onPageChanged={onReviewPageChanged}
                        currentPage={ReviewPage}
                        ViewCount={ReviewViewCount}
                        TotalCount={ReviewTotalCount}
                      />
                    </Col>
                  </Row>
                </div>
              </TabPane>
              {approvePanda && (
                <TabPane tab="판다등록" key="7">
                  <div>
                    <h2>판매자정보</h2>
                    <table>
                      <tr>
                        <td
                          style={{
                            backgroundColor: "#D3D3D3",
                            fontWeight: "bold",
                          }}
                        >
                          공통 판다 메시지
                        </td>
                        <td>{Product.toPanda}</td>
                      </tr>
                      <tr>
                        <td
                          style={{
                            backgroundColor: "#D3D3D3",
                            fontWeight: "bold",
                          }}
                        >
                          상품 홍보시 주의사항
                        </td>
                        <td>{Product.pandaMessage}</td>
                      </tr>
                    </table>
                    <br />
                    쇼핑호스트 영상약관 <hr />
                    가. 판매자의 주의사항, 메시지의 요구사항을 우선하되, 실제
                    성능을 부풀리거나, 허위 사실, 긍정적인 리뷰 요청에 대해서
                    판다 활동자는 요구에 응할 필요가 없습니다 <hr />
                    나. 분쟁의 소지가 있는 영상, 허위사실, 조작된 영상은
                    쇼핑호스트 판다에서 임의로 삭제 조치 할 수 있으며 해당
                    영상으로 인하여 발생하는 문제는 모두 '판다 활동자'에게
                    있습니다. <hr />
                    다. 가항의 판매자의 금지사항에 대해서 이를 위반한 판매자의
                    부당한 요구가 있을경우 "쇼핑호스트 판다"는 분쟁해결을 위해서
                    최선을 다할것입니다.
                    <hr /> 라. 쇼핑호스트 판다에 업로드 된 영상은 향후
                    쇼핑호스트 판다 채널에 영상자료로 활용될 수 있습니다
                    <hr />
                    마. 쇼핑호스트 판다에 등록되는 영상은 상세보기,혹은
                    더보기,설명, 댓글창 등을 통해 접속할 수 있는 링크가
                    있어야하며 해당 링크가 없을경우 불이익이 있을 수 있습니다.
                    <br />
                    <br />
                    <br />
                    <Form
                      form={form}
                      name="basic"
                      labelCol={{ span: 8 }}
                      wrapperCol={{ span: 16 }}
                      initialValues={{ remember: true }}
                      autoComplete="off"
                      onFinish={onSubmit}
                    >
                      <Form.Item
                        label="영상링크"
                        name="Link"
                        rules={[
                          { required: true, message: "Please input your Link" },
                        ]}
                      >
                        <Input onChange={LinkHandler} />
                      </Form.Item>

                      <Form.Item
                        name="remember"
                        valuePropName="checked"
                        wrapperCol={{ offset: 8, span: 16 }}
                      >
                        <Checkbox>모든약관을 확인했으며 동의합니다</Checkbox>
                      </Form.Item>

                      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                          Submit
                        </Button>
                      </Form.Item>
                      {/* <ReactTinyLink
              cardSize="large"
              showGraphic={true}
              maxLine={2}
              minLine={1}
              defaultMedia={true}
              proxyUrl={`api/proxy?url=`}
              description={true}
              url={`${Link}`}
            /> */}
                    </Form>
                  </div>
                </TabPane>
              )}
            </Tabs>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default DetailProductPage;
