import { from } from "pumpify";
import React, { useEffect, useCallback, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import ShopRegForm from "../../components/shop/ShopRegForm";
import { check } from "../../lib/api/auth";
import { shopRegister, initializeForm, changeField } from "../../modules/shop";

const ShopRegFormContainer = ({ history }) => {
  const [error, setError] = useState(null);

  // 액션 디스패치
  const dispatch = useDispatch();
  //리덕스 상태조회
  const { form, shop, shopError, user } = useSelector(({ shop, user }) => ({
    form: shop.shopRegisterForm,
    shop: shop.shop,
    shopError: shop.shopRegisterError,
    user: user.user,
  }));

  //인풋 변경 이벤트 핸들러
  const onChange = (e) => {
    const { value, name } = e.target;
    dispatch(
      changeField({
        form: "shopRegisterForm",
        key: name,
        value,
      })
    );
  };

  //컴포넌트가 처음 렌더링 될 때 form을 초기화함
  useEffect(() => {
    dispatch(initializeForm("createShop"));
  }, [dispatch]);

  useEffect(() => {
    if (shopError) {
      console.log("상점등록 실패");
      console.log("reson" + shopError);
      setError("상점등록실패");
    }
    if (shop) {
      console.log("상점등록 성공");
      // dispatch(check());
      history.push("/shop");
    }
  }, [shop, shopError, dispatch, history]);

  //폼등록 이벤트 핸들러
  const onSubmit = (e) => {
    e.preventDefault();
    const { shopName, crn, freePrice, address, number } = form;
    dispatch(shopRegister({ shopName, crn, freePrice, address, number }));
  };

  return (
    <ShopRegForm
      type="createShop"
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
      error={error}
    />
  );
};

export default withRouter(ShopRegFormContainer);
