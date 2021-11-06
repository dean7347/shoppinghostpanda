import React from "react";
import styled from "styled-components";
import HeaderContainer from "../../containers/common/HeaderContainer";
import palette from "../../lib/palette";
import Button from "../common/Button";

const AuthTemplateBlock = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  background: ${palette.gray[2]};
  //flex로 내부 내용 중앙 정렬
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

//흰색박스
const WhiteBox = styled.div`
  .logo-area {
    display: block;
    padding-bottom: 2rem;
    text-align: center;
    font-weight: bold;
    letter-spacing: 2px;
  }

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.025);
  padding: 2rem;
  width: 100%;
  background: white;
  border-radius: 2px;
`;

const StyledInput = styled.input`
  font-size: 1rem;
  border: none;
  border-bottom: 1px solid ${palette.gray[5]};
  padding-bottom: 0.5rem;
  outline: none;
  width: 120px;
  &focus {
    color: $oc-teal-7;
    border-bottom: 1px solid ${palette.gray[7]};
  }
  & + & {
    margin-top: 1rem;
  }
`;

const AuthFormBlock = styled.div`
  h3 {
    margin: 0;
    color: ${palette.gray[8]};
    margin-bottom: 1rem;
  }
`;
const ButtonWithMarginTop = styled(Button)`
  margin-top: 1rem;
`;

const Label = styled.span`
  display: flex;
  align-items: center;
  line-height: 1.2;
  font-size: 20px;
`;

const Leftdiv = styled.div`
  width: 50%;
  float: left;
  box-sizing: border-box;
`;

const Righttdiv = styled.div`
  width: 50%;
  float: left;
  box-sizing: border-box;
`;

const LabelBox = styled.div`
  box-sizing: border-box;
`;

const ShopRegForm = ({ form, onChange, onSubmit, error }) => {
  return (
    <>
      <WhiteBox>
        {/* onSubmit={onSubmit} */}

        <form onSubmit={onSubmit}>
          <LabelBox>
            <Leftdiv>쇼핑몰 이름 </Leftdiv>
            <Righttdiv>
              <StyledInput
                autoComplete="off"
                name="shopName"
                placeholder="샵이름"
                onChange={onChange}
                value={form.shopName}
              />
            </Righttdiv>
          </LabelBox>

          <LabelBox>
            <Leftdiv>사업자 등록 번호 </Leftdiv>
            <Righttdiv>
              <StyledInput
                autoComplete="off"
                name="crn"
                placeholder="사업자 등록 번호"
                onChange={onChange}
                value={form.crn}
              />
            </Righttdiv>
          </LabelBox>

          <LabelBox>
            <Leftdiv>무료배송 비용 </Leftdiv>
            <Righttdiv>
              <StyledInput
                autoComplete="off"
                name="freePrice"
                placeholder="000원 이상 무료배송"
                onChange={onChange}
                value={form.freePrice}
              />
            </Righttdiv>
          </LabelBox>

          <LabelBox>
            <Leftdiv>유료배송시 비용 </Leftdiv>
            <Righttdiv>
              <StyledInput
                autoComplete="off"
                name="freePrice"
                placeholder="무료배송 비용"
                onChange={onChange}
                value={form.freePrice}
              />
            </Righttdiv>
          </LabelBox>

          <LabelBox>
            <Leftdiv>주소</Leftdiv>
            <Righttdiv>
              <StyledInput
                autoComplete="off"
                name="address"
                placeholder="업장 주소"
                onChange={onChange}
                value={form.address}
              />
            </Righttdiv>
          </LabelBox>

          <LabelBox>
            <Leftdiv>전화번호</Leftdiv>
            <Righttdiv>
              <StyledInput
                autoComplete="off"
                name="number"
                placeholder="업장 전화번호"
                onChange={onChange}
                value={form.number}
              />
            </Righttdiv>
          </LabelBox>

          <ButtonWithMarginTop cyan fullWidth style={{ marginTop: "1rem" }}>
            샵등록하기
          </ButtonWithMarginTop>
        </form>
      </WhiteBox>
    </>
  );
};

export default ShopRegForm;
