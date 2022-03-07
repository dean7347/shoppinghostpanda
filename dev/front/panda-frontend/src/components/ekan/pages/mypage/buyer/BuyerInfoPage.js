import React, { useEffect, useState } from "react";
import Badge from "../../../UI/badge/Badge";
import { Divider } from "@mui/material";
import Button from "../../../UI/Button";
import axios from "../../../../../../node_modules/axios/index";
import { setUserAgent } from "react-device-detect";

const BuyerInfoPage = () => {
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
        SetPanda({
          ...panda,
          pandaName: response.data.ifPanda.pandaName,
          intCategory: response.data.ifPanda.intCategory,
          mainCh: response.data.ifPanda.mainCh,
          confirm: response.data.ifPanda.confirm.toString(),
        });
        SetUser({
          ...user,
          email: response.data.email,
          name: response.data.userName,
          shop: response.data.shop,
          panda: response.data.panda,
          regAt: response.data.regAt,
        });
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
        console.log(response.data);
      }
    });
  }, []);
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
                <Divider />
                <Divider />
                <Divider />
                <div className="mb-4 mt-4">
                  <h4 className="mb-3">
                    <i className="bx bxl-gmail mr-2"></i>상점이름
                  </h4>
                  <div className="mr-2 ml-3">
                    <Badge type={"info"} content={shop.shopName} />
                  </div>
                </div>
                <Divider />
                <div className="mb-4 mt-4">
                  <h4 className="mb-3">
                    <i className="bx bxl-gmail mr-2"></i>평균배송기간
                  </h4>
                  <div className="mr-2 ml-3">
                    <Badge type={"info"} content={shop.avdtime} />
                  </div>
                </div>
                <Divider />
                <div className="mb-4 mt-4">
                  <h4 className="mb-3">
                    <i className="bx bxl-gmail mr-2"></i>사업자등록번호
                  </h4>
                  <div className="mr-2 ml-3">
                    <Badge type={"info"} content={shop.crn} />
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
                  </div>
                </div>
                <Divider />
                <div className="mb-4 mt-4">
                  <h4 className="mb-3">
                    <i className="bx bxl-gmail mr-2"></i>반품 교환 불가능 사유
                  </h4>
                  <div className="mr-2 ml-3">
                    <Badge type={"info"} content={shop.noreturn} />
                  </div>
                </div>
                <Divider />
                <div className="mb-4 mt-4">
                  <h4 className="mb-3">
                    <i className="bx bxl-gmail mr-2"></i>회사주소
                  </h4>
                  <div className="mr-2 ml-3">
                    <Badge type={"info"} content={shop.comAddr} />
                  </div>
                </div>
                <Divider />
                <div className="mb-4 mt-4">
                  <h4 className="mb-3">
                    <i className="bx bxl-gmail mr-2"></i>cs전화번호
                  </h4>
                  <div className="mr-2 ml-3">
                    <Badge type={"info"} content={shop.csPhne} />
                  </div>
                </div>
                <Divider />
                <div className="mb-4 mt-4">
                  <h4 className="mb-3">
                    <i className="bx bxl-gmail mr-2"></i>cs시간
                  </h4>
                  <div className="mr-2 ml-3">
                    <Badge type={"info"} content={shop.csTime} />
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
                  </h4>
                  <div className="mr-2 ml-3">
                    <Badge type={"info"} content={shop.NOFREE} />
                  </div>
                </div>
                <Divider />
                <div className="mb-4 mt-4">
                  <h4 className="mb-3">
                    <i className="bx bxl-gmail mr-2"></i>통신판매업신고 번호
                  </h4>
                  <div className="mr-2 ml-3">
                    <Badge type={"info"} content={shop.number} />
                  </div>
                </div>
                <Divider />
                <div className="mb-4 mt-4">
                  <h4 className="mb-3">
                    <i className="bx bxl-gmail mr-2"></i>비상연락처(비공개)
                  </h4>
                  <div className="mr-2 ml-3">
                    <Badge type={"info"} content={shop.priPhone} />
                  </div>
                </div>
                <Divider />
                <div className="mb-4 mt-4">
                  <h4 className="mb-3">
                    <i className="bx bxl-gmail mr-2"></i>대표자
                  </h4>
                  <div className="mr-2 ml-3">
                    <Badge type={"info"} content={shop.representative} />
                  </div>
                </div>
                <Divider />
                <div className="mb-4 mt-4">
                  <h4 className="mb-3">
                    <i className="bx bxl-gmail mr-2"></i>반품지정 택배사
                  </h4>
                  <div className="mr-2 ml-3">
                    <Badge type={"info"} content={shop.reship} />
                  </div>
                </div>
                <Divider />
                <div className="mb-4 mt-4">
                  <h4 className="mb-3">
                    <i className="bx bxl-gmail mr-2"></i>반송주소
                  </h4>
                  <div className="mr-2 ml-3">
                    <Badge type={"info"} content={shop.returnAddress} />
                  </div>
                </div>
                <Divider />
                <div className="mb-4 mt-4">
                  <h4 className="mb-3">
                    <i className="bx bxl-gmail mr-2"></i>반품비용
                  </h4>
                  <div className="mr-2 ml-3">
                    <Badge type={"info"} content={shop.returnpee} />
                  </div>
                </div>
                <Divider />
                <div className="mb-4 mt-4">
                  <h4 className="mb-3">
                    <i className="bx bxl-gmail mr-2"></i>판다에게 전할 말
                  </h4>
                  <div className="mr-2 ml-3">
                    <Badge type={"info"} content={shop.topanda} />
                  </div>
                </div>
                <Divider />
                <div className="mb-4 mt-4">
                  <h4 className="mb-3">
                    <i className="bx bxl-gmail mr-2"></i>상품교환비용
                  </h4>
                  <div className="mr-2 ml-3">
                    <Badge type={"info"} content={shop.tradeFee} />
                  </div>
                </div>
              </div>
            )}
            <Divider />
            {user.panda && (
              <div>
                <Divider />
                <Divider />
                판다정보
                <Divider />
                <Divider />
                <Divider />
                <div className="mb-4 mt-4">
                  <h4 className="mb-3">
                    <i className="bx bxl-gmail mr-2"></i>판다이름
                  </h4>
                  <div className="mr-2 ml-3">
                    <Badge type={"info"} content={panda.pandaName} />
                  </div>
                </div>{" "}
                <Divider />
                <div className="mb-4 mt-4">
                  <h4 className="mb-3">
                    <i className="bx bxl-gmail mr-2"></i>관심분야
                  </h4>
                  <div className="mr-2 ml-3">
                    <Badge type={"info"} content={panda.intCategory} />
                  </div>
                </div>{" "}
                <Divider />
                <div className="mb-4 mt-4">
                  <h4 className="mb-3">
                    <i className="bx bxl-gmail mr-2"></i>메인채널
                  </h4>
                  <div className="mr-2 ml-3">
                    <Badge type={"info"} content={panda.mainCh} />
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
                text={"홈으로"}
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
