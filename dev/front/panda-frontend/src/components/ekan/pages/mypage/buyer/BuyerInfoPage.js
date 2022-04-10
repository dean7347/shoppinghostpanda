import React, { useEffect, useState } from "react";
import Badge from "../../../UI/badge/Badge";
import { Divider } from "@mui/material";
import Button from "../../../UI/Button";
import axios from "../../../../../api/axiosDefaults";
import { Input, Form, Space, InputNumber } from "antd";
const BuyerInfoPage = () => {
  const [loader, SetLoader] = useState(0);
  const [user, SetUser] = useState({
    email: "",
    name: "",
    shop: "",
    panda: "",
    regAt: "",
  });
  const [shop, SetShop] = useState({
    shopName: "",
    //평균배송기간
    avdtime: "",
    //CRN
    crn: "",

    //반품/교환 사유에 따른 요청 가능 기간
    canDate: "",
    //반품 교환 불가능 사유
    noreturn: "",
    //회사주소
    comAddr: "",
    //cs전화번호
    csPhne: "",
    //cs시간
    csTime: "",
    //무료배송비용 (새로 담기는 주문부터 적용됩니다)
    freePrice: "",

    //이즈 어프로브?
    isApprove: "",
    //이즈 오픈?
    isOpen: "",
    //유료 배송비용
    NOFREE: "",

    //통판업번호
    number: "",
    //비상연락번호
    priPhone: "",

    //대표자
    representative: "",

    //반품지정 택배사
    reship: "",
    //반송주소
    returnAddress: "",
    //반품비용
    returnpee: "",
    //샵 이름

    //투판다
    topanda: "",
    //교환비용
    tradeFee: "",
  });
  const [panda, SetPanda] = useState({
    pandaName: "",
    intCategory: "",
    mainCh: "",
    confirm: "",
  });

  useEffect(() => {
    axios.get("/api/userprivateedit").then((response) => {
      if (response.data.success) {
        if (response.data.ifPanda !== null) {
          SetPanda({
            ...panda,
            pandaName: response.data.ifPanda.pandaName,
            intCategory: response.data.ifPanda.intCategory,
            mainCh: response.data.ifPanda.mainCh,
            confirm: response.data.ifPanda.confirm.toString(),
          });
        }

        SetUser({
          ...user,
          email: response.data.email,
          name: response.data.userName,
          shop: response.data.shop,
          panda: response.data.panda,
          regAt: response.data.regAt,
        });
        if (response.data.ifShop !== null) {
          SetShop({
            ...shop,
            //샵 이름
            shopName: response.data.ifShop.shopName,
            //평균배송기간
            avdtime: response.data.ifShop.avdtime,
            //CRN
            crn: response.data.ifShop.crn,

            //반품/교환 사유에 따른 요청 가능 기간
            canDate: response.data.ifShop.canDate,
            //반품 교환 불가능 사유
            noreturn: response.data.ifShop.noreturn,
            //회사주소
            comAddr: response.data.ifShop.comAddr,
            //cs전화번호
            csPhne: response.data.ifShop.csPhne,
            //cs시간
            csTime: response.data.ifShop.csTime,
            //무료배송비용 (새로 담기는 주문부터 적용됩니다)
            freePrice: response.data.ifShop.freePrice,

            //이즈 어프로브?
            isApprove: response.data.ifShop.approve.toString(),
            //이즈 오픈?
            isOpen: response.data.ifShop.open.toString(),
            //유료 배송비용
            NOFREE: response.data.ifShop.nofree,

            //통판업번호
            number: response.data.ifShop.number,
            //비상연락번호
            priPhone: response.data.ifShop.priPhone,

            //대표자
            representative: response.data.ifShop.representative,

            //반품지정 택배사
            reship: response.data.ifShop.reship,
            //반송주소
            returnAddress: response.data.ifShop.returnAddress,
            //반품비용
            returnpee: response.data.ifShop.returnpee,

            //투판다
            topanda: response.data.ifShop.topanda,
            //교환비용
            tradeFee: response.data.ifShop.tradeFee,
          });
          //console.log(response.data);
        }
      }
    });
  }, [loader]);
  const [shopName] = Form.useForm();
  const [avdtime] = Form.useForm();
  const [crn] = Form.useForm();
  const [canDate] = Form.useForm();
  const [noreturn] = Form.useForm();
  const [comAddr] = Form.useForm();
  const [csPhne] = Form.useForm();
  const [csTime] = Form.useForm();
  const [freePrice] = Form.useForm();
  const [NOFREE] = Form.useForm();
  const [number] = Form.useForm();
  const [priPhone] = Form.useForm();
  const [representative] = Form.useForm();
  const [reship] = Form.useForm();
  const [returnAddress] = Form.useForm();
  const [returnpee] = Form.useForm();
  const [topanda] = Form.useForm();
  const [tradeFee] = Form.useForm();

  const [pandaName] = Form.useForm();
  const [intCategory] = Form.useForm();
  const [mainCh] = Form.useForm();

  const onClickResign = () => {
    if (
      window.confirm("회원탈퇴시 되돌릴수 없습니다 정말로 탈퇴하시겠습니까?")
    ) {
      axios.get("/api/userresign").then((response) => {
        if (response.data.success) {
          //console.log(response);
          alert(response.data.message);
        } else {
          //console.log(response);
          alert(response.data.message);
        }
      });
    } else {
    }
  };
  const onFinish = (values, type, dfd) => {
    var targetKey = Object.keys(values);
    var targetValue = Object.values(values);
    const body = {
      target: targetKey[0],
      values: targetValue[0],
    };
    if (body.values === undefined) {
      alert("빈값은 입력할 수 없습니다");
      return;
    }
    //console.log(body);
    axios.post("/api/editShop", body).then((response) => {
      //console.log(response);
      if (response.data.success) {
        alert("성공적으로 변경되었습니다.");
        SetLoader(loader + 1);
      } else {
        alert("변경에 실패했습니다");
      }
    });
  };
  const onFinishPanda = (values, type, dfd) => {
    var targetKey = Object.keys(values);
    var targetValue = Object.values(values);
    const body = {
      target: targetKey[0],
      values: targetValue[0],
    };
    if (body.values === undefined) {
      alert("빈값은 입력할 수 없습니다");
      return;
    }
    //console.log(body);
    axios.post("/api/editPanda", body).then((response) => {
      //console.log(response);
      if (response.data.success) {
        alert("성공적으로 변경되었습니다.");
        SetLoader(loader + 1);
      } else {
        alert("변경에 실패했습니다");
      }
    });
  };

  const onFinishFailed = () => {
    //console.log("Submit failed!");
  };

  const [shopEditor, SetShopEditor] = useState(false);
  const [pandaEditor, SetPandaEditor] = useState(false);
  const onClickPandaEditor = () => {
    if (pandaEditor === true) {
      SetPandaEditor(false);
    } else {
      SetPandaEditor(true);
    }
  };
  const onClickShopEditor = () => {
    if (shopEditor === true) {
      SetShopEditor(false);
    } else {
      SetShopEditor(true);
    }
  };
  return (
    <>
      <div className="container">
        <div className="custom-card">
          <div className="card__header mb-3">
            <h3 className="mb-4">{user.name}님 안녕하세요!</h3>
          </div>
          <Divider />
          <div className="card__body">
            <div className="mb-4">
              <h4 className="mb-3">
                <i className="bx bx-user mr-2"></i>회원 분류
              </h4>
              <span className="mr-2 ml-2">
                <Badge type={"info"} content={"일반"} />
              </span>
              {user.panda && (
                <span className="mr-2">
                  <Badge type={"danger"} content={"판다"} />
                </span>
              )}
              {user.shop && (
                <span className="mr-2">
                  <Badge type={"primary"} content={"판매자"} />
                </span>
              )}
            </div>
            <Divider />
            <div className="mb-4 mt-4">
              <h4 className="mb-3">
                <i className="bx bxl-gmail mr-2"></i>이메일
              </h4>
              <div className="mr-2 ml-3">
                <Badge type={"info"} content={user.email} />
              </div>
            </div>
            <Divider />
            <div className="mb-4 mt-4">
              <h4 className="mb-3">
                <i className="bx bx-leaf mr-2"></i>이름
              </h4>
              <div className="mr-2 ml-3">
                <Badge type="primary" content={user.name} />
                {/* <span className="float-end">
                  <Button
                    text="수정하기"
                    className="is-info is-small is-outlined"
                  />
                </span> */}
              </div>
            </div>
            <Divider />
            <div className="mb-4 mt-4">
              <h4 className="mb-3">
                <i className="bx bx-calendar mr-2"></i>가입일
              </h4>
              <div className="mr-2 ml-2">
                <Badge type="warning" content={user.regAt.split("T")[0]} />
              </div>
            </div>
            <Divider />
            {user.shop && (
              <div>
                <Divider />
                <Divider />
                상점정보
                <span className="float-end">
                  <Button
                    onClick={() => {
                      onClickShopEditor();
                    }}
                    text="상점정보 수정하기"
                    className="is-info is-small is-outlined"
                  />
                </span>
                <Divider />
                <Divider />
                <Divider />
                <div className="mb-4 mt-4">
                  <h4 className="mb-3">
                    <i className="bx bxl-gmail mr-2"></i>상점이름
                  </h4>
                  <div className="mr-2 ml-3">
                    <Badge type={"info"} content={shop.shopName} />
                    <span className="float-end">
                      {shopEditor && (
                        <>
                          <Form
                            form={shopName}
                            layout="Horizontal"
                            onFinish={(e) => {
                              onFinish(e, "zdsdd");
                            }}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                          >
                            <span className="float-end">
                              <Form.Item>
                                <Space>
                                  <Button
                                    text="변경하기"
                                    className="is-info is-small is-outlined"
                                    htmlType="submit"
                                  />
                                </Space>
                              </Form.Item>
                            </span>
                            <span className="float-end">
                              <Form.Item name="shopName">
                                <Input placeholder="상점이름" />
                              </Form.Item>
                            </span>
                          </Form>
                        </>
                      )}
                    </span>
                  </div>
                </div>
                <Divider />
                <div className="mb-4 mt-4">
                  <h4 className="mb-3">
                    <i className="bx bxl-gmail mr-2"></i>평균배송기간
                  </h4>
                  <div className="mr-2 ml-3">
                    <Badge type={"info"} content={shop.avdtime} />
                    <span className="float-end">
                      {shopEditor && (
                        <>
                          <Form
                            form={avdtime}
                            layout="Horizontal"
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                          >
                            <span className="float-end">
                              <Form.Item>
                                <Space>
                                  <Button
                                    text="변경하기"
                                    className="is-info is-small is-outlined"
                                    htmlType="submit"
                                  />
                                </Space>
                              </Form.Item>
                            </span>
                            <span className="float-end">
                              <Form.Item name="avdtime">
                                <Input placeholder="평균배송기간" />
                              </Form.Item>
                            </span>
                          </Form>
                        </>
                      )}
                    </span>
                  </div>
                </div>
                <Divider />
                <div className="mb-4 mt-4">
                  <h4 className="mb-3">
                    <i className="bx bxl-gmail mr-2"></i>사업자등록번호
                  </h4>
                  <div className="mr-2 ml-3">
                    <Badge type={"info"} content={shop.crn} />
                    <span className="float-end">
                      {shopEditor && (
                        <>
                          <Form
                            form={crn}
                            layout="Horizontal"
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                          >
                            <span className="float-end">
                              <Form.Item>
                                <Space>
                                  <Button
                                    text="변경하기"
                                    className="is-info is-small is-outlined"
                                    htmlType="submit"
                                  />
                                </Space>
                              </Form.Item>
                            </span>
                            <span className="float-end">
                              <Form.Item name="crn">
                                <Input placeholder="사업자등록번호" />
                              </Form.Item>
                            </span>
                          </Form>
                        </>
                      )}
                    </span>
                  </div>
                </div>
                <Divider />
                <div className="mb-4 mt-4">
                  <h4 className="mb-3">
                    <i className="bx bxl-gmail mr-2"></i>반품/교환 사유에 따른
                    요청 가능기간
                  </h4>
                  <div className="mr-2 ml-3">
                    <Badge type={"info"} content={shop.canDate} />
                    <span className="float-end">
                      {shopEditor && (
                        <div style={{ display: "inline" }}>
                          <Form
                            form={canDate}
                            layout="Horizontal"
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                          >
                            <span className="float-end">
                              <Form.Item>
                                <Space>
                                  <Button
                                    text="변경하기"
                                    className="is-info is-small is-outlined"
                                    htmlType="submit"
                                  />
                                </Space>
                              </Form.Item>
                            </span>
                            <span className="float-end">
                              <Form.Item name="canDate">
                                <Input.TextArea
                                  showCount
                                  maxLength={250}
                                  placeholder="반품/교환사유에따른요청기간"
                                />
                              </Form.Item>
                            </span>
                          </Form>
                        </div>
                      )}
                    </span>
                  </div>
                  <br />
                  <br />
                </div>
                <Divider />
                <div className="mb-4 mt-4">
                  <h4 className="mb-3">
                    <i className="bx bxl-gmail mr-2"></i>반품 교환 불가능 사유
                  </h4>
                  <div className="mr-2 ml-3">
                    <Badge type={"info"} content={shop.noreturn} />
                    <span className="float-end">
                      {shopEditor && (
                        <div>
                          <Form
                            form={noreturn}
                            layout="Horizontal"
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                          >
                            <span className="float-end">
                              <Form.Item>
                                <Space>
                                  <Button
                                    text="변경하기"
                                    className="is-info is-small is-outlined"
                                    htmlType="submit"
                                  />
                                </Space>
                              </Form.Item>
                            </span>
                            <span className="float-end">
                              <Form.Item name="noreturn">
                                <Input.TextArea
                                  rows={2}
                                  showCount
                                  maxLength={500}
                                  placeholder="반품/교환불가능사유"
                                />
                              </Form.Item>
                            </span>
                          </Form>
                        </div>
                      )}
                    </span>
                  </div>
                  <br />
                  <br />
                </div>
                <Divider />
                <div className="mb-4 mt-4">
                  <h4 className="mb-3">
                    <i className="bx bxl-gmail mr-2"></i>회사주소
                  </h4>
                  <div className="mr-2 ml-3">
                    <Badge type={"info"} content={shop.comAddr} />
                    <span className="float-end">
                      {shopEditor && (
                        <>
                          <Form
                            form={comAddr}
                            layout="Horizontal"
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                          >
                            <span className="float-end">
                              <Form.Item>
                                <Space>
                                  <Button
                                    text="변경하기"
                                    className="is-info is-small is-outlined"
                                    htmlType="submit"
                                  />
                                </Space>
                              </Form.Item>
                            </span>
                            <span className="float-end">
                              <Form.Item name="comAddr">
                                <Input placeholder="회사주소" />
                              </Form.Item>
                            </span>
                          </Form>
                        </>
                      )}
                    </span>
                  </div>
                </div>
                <Divider />
                <div className="mb-4 mt-4">
                  <h4 className="mb-3">
                    <i className="bx bxl-gmail mr-2"></i>cs전화번호
                  </h4>
                  <div className="mr-2 ml-3">
                    <Badge type={"info"} content={shop.csPhne} />
                    <span className="float-end">
                      {shopEditor && (
                        <>
                          <Form
                            form={csPhne}
                            layout="Horizontal"
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                          >
                            <span className="float-end">
                              <Form.Item>
                                <Space>
                                  <Button
                                    text="변경하기"
                                    className="is-info is-small is-outlined"
                                    htmlType="submit"
                                  />
                                </Space>
                              </Form.Item>
                            </span>
                            <span className="float-end">
                              <Form.Item name="csphone">
                                <Input placeholder="고객센터전화번호" />
                              </Form.Item>
                            </span>
                          </Form>
                        </>
                      )}
                    </span>
                  </div>
                </div>
                <Divider />
                <div className="mb-4 mt-4">
                  <h4 className="mb-3">
                    <i className="bx bxl-gmail mr-2"></i>cs시간
                  </h4>
                  <div className="mr-2 ml-3">
                    <Badge type={"info"} content={shop.csTime} />
                    <span className="float-end">
                      {shopEditor && (
                        <>
                          <Form
                            form={csTime}
                            layout="Horizontal"
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                          >
                            <span className="float-end">
                              <Form.Item>
                                <Space>
                                  <Button
                                    text="변경하기"
                                    className="is-info is-small is-outlined"
                                    htmlType="submit"
                                  />
                                </Space>
                              </Form.Item>
                            </span>
                            <span className="float-end">
                              <Form.Item name="csTime">
                                <Input placeholder="고객센터운영시간" />
                              </Form.Item>
                            </span>
                          </Form>
                        </>
                      )}
                    </span>
                  </div>
                </div>
                <Divider />
                <div className="mb-4 mt-4">
                  <h4 className="mb-3">
                    <i className="bx bxl-gmail mr-2"></i>무료배송비용 (새로
                    담기는 주문부터 적용됩니다)
                  </h4>
                  <div className="mr-2 ml-3">
                    <Badge type={"info"} content={shop.freePrice} />
                    <span className="float-end">
                      {shopEditor && (
                        <>
                          <Form
                            form={freePrice}
                            layout="Horizontal"
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                          >
                            <span className="float-end">
                              <Form.Item>
                                <Space>
                                  <Button
                                    text="변경하기"
                                    className="is-info is-small is-outlined"
                                    htmlType="submit"
                                  />
                                </Space>
                              </Form.Item>
                            </span>
                            <span className="float-end">
                              <Form.Item name="freePrice">
                                <InputNumber
                                  width={"100%"}
                                  min={0}
                                  placeholder="무료배송비용"
                                />
                              </Form.Item>
                            </span>
                          </Form>
                        </>
                      )}
                    </span>
                  </div>
                </div>
                <Divider />
                <div className="mb-4 mt-4">
                  <h4 className="mb-3">
                    <i className="bx bxl-gmail mr-2"></i>상점 승인 여부
                  </h4>
                  <div className="mr-2 ml-3">
                    <Badge type={"info"} content={shop.isApprove} />
                  </div>
                </div>
                <Divider />
                <div className="mb-4 mt-4">
                  <h4 className="mb-3">
                    <i className="bx bxl-gmail mr-2"></i>OPEN
                  </h4>
                  <div className="mr-2 ml-3">
                    <Badge type={"info"} content={shop.isOpen} />
                  </div>
                </div>
                <Divider />
                <div className="mb-4 mt-4">
                  <h4 className="mb-3">
                    <i className="bx bxl-gmail mr-2"></i>유료 배송비용
                    (유료배송시 택배비용)
                  </h4>
                  <div className="mr-2 ml-3">
                    <Badge type={"info"} content={shop.NOFREE} />
                    <span className="float-end">
                      {shopEditor && (
                        <>
                          <Form
                            form={NOFREE}
                            layout="Horizontal"
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                          >
                            <span className="float-end">
                              <Form.Item>
                                <Space>
                                  <Button
                                    text="변경하기"
                                    className="is-info is-small is-outlined"
                                    htmlType="submit"
                                  />
                                </Space>
                              </Form.Item>
                            </span>
                            <span className="float-end">
                              <Form.Item name="noFree">
                                <InputNumber
                                  min={0}
                                  placeholder="유료배송비용"
                                />
                              </Form.Item>
                            </span>
                          </Form>
                        </>
                      )}
                    </span>
                  </div>
                </div>
                <Divider />
                <div className="mb-4 mt-4">
                  <h4 className="mb-3">
                    <i className="bx bxl-gmail mr-2"></i>통신판매업신고 번호
                  </h4>
                  <div className="mr-2 ml-3">
                    <Badge type={"info"} content={shop.number} />
                    <span className="float-end">
                      {shopEditor && (
                        <>
                          <Form
                            form={number}
                            layout="Horizontal"
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                          >
                            <span className="float-end">
                              <Form.Item>
                                <Space>
                                  <Button
                                    text="변경하기"
                                    className="is-info is-small is-outlined"
                                    htmlType="submit"
                                  />
                                </Space>
                              </Form.Item>
                            </span>
                            <span className="float-end">
                              <Form.Item name="number">
                                <Input placeholder="통신판매업신고번호" />
                              </Form.Item>
                            </span>
                          </Form>
                        </>
                      )}
                    </span>
                  </div>
                </div>
                <Divider />
                <div className="mb-4 mt-4">
                  <h4 className="mb-3">
                    <i className="bx bxl-gmail mr-2"></i>비상연락처(비공개)
                  </h4>
                  <div className="mr-2 ml-3">
                    <Badge type={"info"} content={shop.priPhone} />
                    <span className="float-end">
                      {shopEditor && (
                        <>
                          <Form
                            form={priPhone}
                            layout="Horizontal"
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                          >
                            <span className="float-end">
                              <Form.Item>
                                <Space>
                                  <Button
                                    text="변경하기"
                                    className="is-info is-small is-outlined"
                                    htmlType="submit"
                                  />
                                </Space>
                              </Form.Item>
                            </span>
                            <span className="float-end">
                              <Form.Item name="priPhone">
                                <Input placeholder="비상연락처" />
                              </Form.Item>
                            </span>
                          </Form>
                        </>
                      )}
                    </span>
                  </div>
                </div>
                <Divider />
                <div className="mb-4 mt-4">
                  <h4 className="mb-3">
                    <i className="bx bxl-gmail mr-2"></i>대표자
                  </h4>
                  <div className="mr-2 ml-3">
                    <Badge type={"info"} content={shop.representative} />
                    <span className="float-end">
                      {shopEditor && (
                        <>
                          <Form
                            form={representative}
                            layout="Horizontal"
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                          >
                            <span className="float-end">
                              <Form.Item>
                                <Space>
                                  <Button
                                    text="변경하기"
                                    className="is-info is-small is-outlined"
                                    htmlType="submit"
                                  />
                                </Space>
                              </Form.Item>
                            </span>
                            <span className="float-end">
                              <Form.Item name="representative">
                                <Input placeholder="대표자" />
                              </Form.Item>
                            </span>
                          </Form>
                        </>
                      )}
                    </span>
                  </div>
                </div>
                <Divider />
                <div className="mb-4 mt-4">
                  <h4 className="mb-3">
                    <i className="bx bxl-gmail mr-2"></i>반품지정 택배사
                  </h4>
                  <div className="mr-2 ml-3">
                    <Badge type={"info"} content={shop.reship} />
                    <span className="float-end">
                      {shopEditor && (
                        <>
                          <Form
                            form={reship}
                            layout="Horizontal"
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                          >
                            <span className="float-end">
                              <Form.Item>
                                <Space>
                                  <Button
                                    text="변경하기"
                                    className="is-info is-small is-outlined"
                                    htmlType="submit"
                                  />
                                </Space>
                              </Form.Item>
                            </span>
                            <span className="float-end">
                              <Form.Item name="reship">
                                <Input placeholder="반품지정택배사" />
                              </Form.Item>
                            </span>
                          </Form>
                        </>
                      )}
                    </span>
                  </div>
                </div>
                <Divider />
                <div className="mb-4 mt-4">
                  <h4 className="mb-3">
                    <i className="bx bxl-gmail mr-2"></i>반송주소
                  </h4>
                  <div className="mr-2 ml-3">
                    <Badge type={"info"} content={shop.returnAddress} />
                    <span className="float-end">
                      {shopEditor && (
                        <>
                          <Form
                            form={returnAddress}
                            layout="Horizontal"
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                          >
                            <span className="float-end">
                              <Form.Item>
                                <Space>
                                  <Button
                                    text="변경하기"
                                    className="is-info is-small is-outlined"
                                    htmlType="submit"
                                  />
                                </Space>
                              </Form.Item>
                            </span>
                            <span className="float-end">
                              <Form.Item name="returnAddress">
                                <Input placeholder="반송주소" />
                              </Form.Item>
                            </span>
                          </Form>
                        </>
                      )}
                    </span>
                  </div>
                </div>
                <Divider />
                <div className="mb-4 mt-4">
                  <h4 className="mb-3">
                    <i className="bx bxl-gmail mr-2"></i>반품비용
                  </h4>
                  <div className="mr-2 ml-3">
                    <Badge type={"info"} content={shop.returnpee} />
                    <span className="float-end">
                      {shopEditor && (
                        <>
                          <Form
                            form={returnpee}
                            layout="Horizontal"
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                          >
                            <span className="float-end">
                              <Form.Item>
                                <Space>
                                  <Button
                                    text="변경하기"
                                    className="is-info is-small is-outlined"
                                    htmlType="submit"
                                  />
                                </Space>
                              </Form.Item>
                            </span>
                            <span className="float-end">
                              <Form.Item name="returnPee">
                                <InputNumber mina={0} placeholder="반품비용" />
                              </Form.Item>
                            </span>
                          </Form>
                        </>
                      )}
                    </span>
                  </div>
                </div>
                <Divider />
                <div className="mb-4 mt-4">
                  <h4 className="mb-3">
                    <i className="bx bxl-gmail mr-2"></i>판다에게 전할 말
                  </h4>
                  <div className="mr-2 ml-3">
                    <Badge type={"info"} content={shop.topanda} />
                    <span className="float-end">
                      {shopEditor && (
                        <>
                          <Form
                            form={topanda}
                            layout="Horizontal"
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                          >
                            <span className="float-end">
                              <Form.Item>
                                <Space>
                                  <Button
                                    text="변경하기"
                                    className="is-info is-small is-outlined"
                                    htmlType="submit"
                                  />
                                </Space>
                              </Form.Item>
                            </span>
                            <span className="float-end">
                              <Form.Item name="toPanda">
                                <Input.TextArea
                                  showCount
                                  maxLength={250}
                                  placeholder="to 판다"
                                />
                              </Form.Item>
                            </span>
                          </Form>
                        </>
                      )}
                    </span>
                  </div>
                  <br />
                  <br />
                </div>
                <Divider />
                <div className="mb-4 mt-4">
                  <h4 className="mb-3">
                    <i className="bx bxl-gmail mr-2"></i>상품교환비용
                  </h4>
                  <div className="mr-2 ml-3">
                    <Badge type={"info"} content={shop.tradeFee} />
                    <span className="float-end">
                      {shopEditor && (
                        <>
                          <Form
                            form={tradeFee}
                            layout="Horizontal"
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                          >
                            <span className="float-end">
                              <Form.Item>
                                <Space>
                                  <Button
                                    text="변경하기"
                                    className="is-info is-small is-outlined"
                                    htmlType="submit"
                                  />
                                </Space>
                              </Form.Item>
                            </span>
                            <span className="float-end">
                              <Form.Item name="tradeFee">
                                <InputNumber
                                  min={0}
                                  placeholder="상품 교환 비용"
                                />
                              </Form.Item>
                            </span>
                          </Form>
                        </>
                      )}
                    </span>
                  </div>
                </div>
              </div>
            )}
            <Divider />
            {user.panda && (
              <div>
                <br />
                <br />
                <br />
                <Divider />
                <Divider />
                판다정보
                <span className="float-end">
                  <Button
                    onClick={() => {
                      onClickPandaEditor();
                    }}
                    text="판다정보 수정하기"
                    className="is-info is-small is-outlined"
                  />
                </span>
                <Divider />
                <Divider />
                <Divider />
                <div className="mb-4 mt-4">
                  <h4 className="mb-3">
                    <i className="bx bxl-gmail mr-2">판다이름</i>
                  </h4>
                  <div className="mr-2 ml-3">
                    <Badge type={"info"} content={panda.pandaName} />
                    <span className="float-end">
                      {pandaEditor && (
                        <>
                          <Form
                            form={pandaName}
                            layout="Horizontal"
                            onFinish={(e) => {
                              onFinishPanda(e, "zdsdd");
                            }}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                          >
                            <span className="float-end">
                              <Form.Item>
                                <Space>
                                  <Button
                                    text="변경하기"
                                    className="is-info is-small is-outlined"
                                    htmlType="submit"
                                  />
                                </Space>
                              </Form.Item>
                            </span>
                            <span className="float-end">
                              <Form.Item name="pandaName">
                                <Input placeholder="판다이름" />
                              </Form.Item>
                            </span>
                          </Form>
                        </>
                      )}
                    </span>
                  </div>
                </div>{" "}
                <Divider />
                <div className="mb-4 mt-4">
                  <h4 className="mb-3">
                    <i className="bx bxl-gmail mr-2"></i>관심분야
                  </h4>
                  <div className="mr-2 ml-3">
                    <Badge type={"info"} content={panda.intCategory} />
                    <span className="float-end">
                      {pandaEditor && (
                        <>
                          <Form
                            form={intCategory}
                            layout="Horizontal"
                            onFinish={(e) => {
                              onFinishPanda(e, "zdsdd");
                            }}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                          >
                            <span className="float-end">
                              <Form.Item>
                                <Space>
                                  <Button
                                    text="변경하기"
                                    className="is-info is-small is-outlined"
                                    htmlType="submit"
                                  />
                                </Space>
                              </Form.Item>
                            </span>
                            <span className="float-end">
                              <Form.Item name="intCategory">
                                <Input placeholder="관심분야" />
                              </Form.Item>
                            </span>
                          </Form>
                        </>
                      )}
                    </span>
                  </div>
                </div>{" "}
                <Divider />
                <div className="mb-4 mt-4">
                  <h4 className="mb-3">
                    <i className="bx bxl-gmail mr-2"></i>메인채널
                  </h4>
                  <div className="mr-2 ml-3">
                    <Badge type={"info"} content={panda.mainCh} />
                    <span className="float-end">
                      {pandaEditor && (
                        <>
                          <Form
                            form={mainCh}
                            layout="Horizontal"
                            onFinish={(e) => {
                              onFinishPanda(e, "zdsdd");
                            }}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                          >
                            <span className="float-end">
                              <Form.Item>
                                <Space>
                                  <Button
                                    text="변경하기"
                                    className="is-info is-small is-outlined"
                                    htmlType="submit"
                                  />
                                </Space>
                              </Form.Item>
                            </span>
                            <span className="float-end">
                              <Form.Item name="mainCh">
                                <Input placeholder="메인채널" />
                              </Form.Item>
                            </span>
                          </Form>
                        </>
                      )}
                    </span>
                  </div>
                </div>{" "}
                <Divider />
                <div className="mb-4 mt-4">
                  <h4 className="mb-3">
                    <i className="bx bxl-gmail mr-2"></i>승인여부
                  </h4>
                  <div className="mr-2 ml-3">
                    <Badge type={"info"} content={panda.confirm} />
                  </div>
                </div>
              </div>
            )}

            <div className="card__footer mt-4">
              <Button
                onClick={onClickResign}
                text={"회원탈퇴"}
                className="is-primary is-large is-rounded is-outlined mr-5"
              />
              <Button
                text={"로그아웃"}
                className="is-danger is-large is-rounded"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BuyerInfoPage;
