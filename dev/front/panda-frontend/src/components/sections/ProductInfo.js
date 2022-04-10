import React, { useEffect, useState } from "react";
import {
  Button,
  Descriptions,
  Menu,
  InputNumber,
  Table,
  Tag,
  Space,
  Form,
  Input,
  Row,
  Col,
  Checkbox,
  Select,
} from "antd";
import { DatabaseOutlined } from "@ant-design/icons";
import produce from "immer";
import { ReactTinyLink } from "react-tiny-link";
import axios from "../../api/axiosDefaults";
const { SubMenu } = Menu;

function ProductInfo(props) {
  const { Option, OptGroup } = Select;
  const [SelectPanda, setSelectPanda] = useState("");

  function handleChange(value) {
    // //console.log(`selected ${value}`);
    setSelectPanda(value);
  }
  const [Link, SetLink] = useState("http://localhost:3000/");

  const [form] = Form.useForm();
  const [PandaDisplay, SetPandaDisplay] = useState("none");

  const onSubmit = (e) => {
    if (!isValidHttpUrl(e.Link)) {
      alert("올바른 URL가 아닙니다");
      return;
    }
    if (!approvePanda) {
      alert("판다 승인후 활동가능합니다");
      return;
    }
    const body = {
      productId: props.proId,
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
    SetLink("http://localhost:3000/");
    form.resetFields();
    SetPandaDisplay("none");
  };
  function isValidHttpUrl(string) {
    let url;

    try {
      url = new URL(string);
    } catch (_) {
      return false;
    }

    return url.protocol === "http:" || url.protocol === "https:";
  }

  const LinkHandler = (e) => {
    e.preventDefault();
    if (isValidHttpUrl(e.target.value)) {
      SetLink(e.target.value);
    } else {
      alert("오류방지를위해 ctrl c + ctrl v를 이용해주세요");
    }
  };

  const columns = [
    {
      title: "상품명",
      dataIndex: "optionName",
      key: "optionName",
      width: "40%",
    },
    {
      title: "수량",
      dataIndex: "optionCount",
      key: "optionCount",
      width: "5%",

      render: (title, key) => (
        <>
          <InputNumber
            min={1}
            defaultValue={1}
            onChange={onChange(title, key)}
            size="small"
          />
        </>
      ),
    },
    {
      title: "가격/원",
      dataIndex: "optionPrice",
      key: "optionPrice",
      width: "30%",
    },

    {
      title: "삭제",
      key: "action",
      width: "20%",

      render: (title, key) => (
        <Space size="middle">
          <Button onClick={onDelete(title, key)}>Delete</Button>
        </Space>
      ),
    },
  ];

  const [nextKey, setKey] = useState(0);

  const [options, setOptions] = useState([]);
  const [cart, setCart] = useState({
    array: [],
  });

  const pandaClick = () => {
    if (PandaDisplay === "none") {
      SetPandaDisplay("block");
    }
    if (PandaDisplay === "block") {
      SetPandaDisplay("none");
    }
  };
  const onChange = (title, key) => (event) => {
    setCart(
      produce(cart, (draft) => {
        let price =
          event * cart.array.find((x) => x.key == key.key).originPrice;
        draft.array.find((x) => x.key == key.key).optionCount = event;
        draft.array.find((x) => x.key == key.key).optionPrice = price
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      })
    );
  };
  const onDelete = (title, key) => (event) => {
    //console.log(key.optionId);
    cart.array.find((x, id) => {
      //console.log("파인드키");
      //console.log(x.optionId);
      if (x.optionId == key.optionId) {
        setCart(
          produce(cart, (draft) => {
            draft.array.splice(id, 1);
          })
        );
      }
    });

    // setCart(
    //   produce(cart, (draft) => {
    //     draft.array.splice(
    //       draft.array.find((x) => x.key == key.key),
    //       1
    //     );
    //   })
    // );
  };

  const handleClick = (e) => {
    // //console.log("클릭");
    // //console.log(e);
    // //console.log(options[e.key]);
    // //console.log(options);
    // //console.log("카트");
    // //console.log(cart.array);
    // //console.log("함수");
    // //console.log(cart.array.find((x) => x.optionId == options[e.key].optionId));
    // // //console.log(cart.array.find((x) => x.key == e.key).optionId);

    if (
      cart.array.find((x) => x.optionId == options[e.key].optionId) !==
      undefined
    ) {
      alert("이미 존재하는 상품입니다");
      return;
    } else {
      const info = {
        key: nextKey,
        optionId: options[e.key].optionId,
        optionCount: 1,
        optionName: options[e.key].optionName,
        optionPrice: options[e.key].optionPrice
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ","),
        originPrice: options[e.key].optionPrice,
      };

      setCart(
        produce(cart, (draft) => {
          draft.array.push(info);
          setKey(nextKey + 1);
        })
      );
    }
  };

  useEffect(() => {
    if (props) {
      setOptions(props.detail.poptions);
      // //console.log("props");

      // //console.log(props);
    } else {
      // //console.log("빈상품정보 로딩");
    }
  }, [props]);

  const renderOption =
    options &&
    options.map((options, index) => {
      return (
        <Menu.Item key={index}>
          <div style={{ float: "left" }}>{options.optionName}</div>
          <div style={{ float: "right" }}>
            {options.optionPrice
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </div>
        </Menu.Item>
      );
    });
  const unique_user = props.pandas.reduce((prev, now) => {
    if (!prev.some((obj) => obj.pandaId === now.pandaId)) prev.push(now);
    return prev;
  }, []);

  // //console.log("변경된정보");
  // //console.log(unique_user);
  const renderPanda =
    unique_user &&
    unique_user.map((panda, index) => {
      return (
        <Option value={panda.pandaId} key={index}>
          <div style={{ float: "left" }}>{panda.panda}</div>
        </Option>
      );
    });
  const [Ispanda, setIspanda] = useState();
  const [approvePanda, setapprovePanda] = useState();

  useEffect(() => {
    axios.get("/api/ispanda").then((response) => {
      // //console.log("판다스데이터확인");

      // //console.log(response.data);
      setIspanda(response.data.ispanda);
      setapprovePanda(response.data.approve);
    });
  }, []);

  const clickHandler = () => {
    //필요한 정보를 cart 필드에다가 넣어준다
    // //console.log("카트전달정보");

    const body = {
      productid: props.proId,
      cart: cart.array,
      selectpanda: SelectPanda,
    };
    axios
      .post("/api/addcart", body)
      .then((response) => {
        if (response.data.success) {
          alert("상품을 장바구니에 성공적으로 담았습니다");
          //console.log("장바구니담기");
        } else {
          alert(response.data.message);
          //console.log("장바구니엘즈");

          //console.log(response.data);
        }
      })
      .catch(() => {
        //console.log("켓치실행");
      });

    // //console.log(body);
  };

  const [scrollPosition, setScrollPosition] = useState(0);
  const [floatb, setFloatb] = useState(false);
  const [displayCart, setDisplayCart] = useState("none");
  const [cartMessage, setcartMessage] = useState("카트");

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollPosition]);
  const handleScroll = () => {
    const position = window.pageYOffset;
    if (position > 1200) {
      //console.log(window.innerWidth);
      setFloatb(true);
    }
    if (position < 1201) {
      setFloatb(false);
    }
  };

  const cartHandler = () => {
    //console.log("클릭");
    //console.log(displayCart);
    if (displayCart === "none") {
      setDisplayCart("flex");
      setcartMessage("닫기");
    }
    if (displayCart === "flex") {
      setDisplayCart("none");
      setcartMessage("카트");
    }
  };

  return (
    <div>
      {!floatb ? (
        <div>
          <div style={{ justityContent: "center" }}>
            <Select
              defaultValue="도움을 준 판다를 선택해주세요"
              style={{ width: "100%" }}
              onChange={handleChange}
            >
              <OptGroup label="PANDAS">{renderPanda}</OptGroup>
            </Select>

            <Row gutter={[24, 16]}>
              <Col lg={24} sm={16}>
                <Table
                  columns={columns}
                  dataSource={cart.array}
                  pagination={false}
                />
              </Col>
              <Menu
                onClick={handleClick}
                style={{ width: "100%" }}
                defaultSelectedKeys={["1"]}
                mode="inline"
              >
                <SubMenu
                  key="sub1"
                  icon={<DatabaseOutlined />}
                  title="옵션을 선택해주세요"
                >
                  {renderOption}
                </SubMenu>
              </Menu>
            </Row>
          </div>
          <div
            style={{
              display: "flex",
              justityContent: "center",
              minWidth: "100%",
            }}
          ></div>
          <div style={{ justityContent: "center" }}>
            <div style={{ float: "left" }}>
              <Button
                size="large"
                shape="round"
                type="danger"
                onClick={clickHandler}
              >
                상품담기
              </Button>
            </div>

            <div style={{ float: "right", margin: "0 40px 30px" }}>
              {/* {approvePanda && (
                <Button
                  size="large"
                  shape="round"
                  type="primary"
                  onClick={pandaClick}
                >
                  판다!
                </Button>
              )} */}
            </div>
          </div>
          <Form
            form={form}
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            autoComplete="off"
            onFinish={onSubmit}
            style={{ display: `${PandaDisplay}` }}
          >
            <Form.Item
              label="링크"
              name="Link"
              rules={[{ required: true, message: "Please input your Link" }]}
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
      ) : (
        <>
          <div>
            <div style={{ justityContent: "center" }}>
              <Select
                defaultValue="도움을 준 판다를 선택해주세요"
                style={{ width: "100%" }}
                onChange={handleChange}
              >
                <OptGroup label="PANDAS">{renderPanda}</OptGroup>
              </Select>

              <Row gutter={[24, 16]}>
                <Col lg={24} sm={16}>
                  <Table
                    columns={columns}
                    dataSource={cart.array}
                    pagination={false}
                  />
                </Col>
                <Menu
                  onClick={handleClick}
                  style={{ width: "100%" }}
                  defaultSelectedKeys={["1"]}
                  mode="inline"
                >
                  <SubMenu
                    key="sub1"
                    icon={<DatabaseOutlined />}
                    title="옵션을 선택해주세요"
                  >
                    {renderOption}
                  </SubMenu>
                </Menu>
              </Row>
            </div>
            <div
              style={{
                display: "flex",
                justityContent: "center",
                minWidth: "100%",
              }}
            ></div>
            <div style={{ justityContent: "center" }}>
              <div style={{ float: "left" }}>
                <Button
                  size="large"
                  shape="round"
                  type="danger"
                  onClick={clickHandler}
                >
                  상품담기
                </Button>
              </div>

              <div style={{ float: "right", margin: "0 40px 30px" }}>
                {approvePanda && (
                  <Button
                    size="large"
                    shape="round"
                    type="primary"
                    onClick={pandaClick}
                  >
                    판다!
                  </Button>
                )}
              </div>
            </div>
            <Form
              form={form}
              name="basic"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              initialValues={{ remember: true }}
              autoComplete="off"
              onFinish={onSubmit}
              style={{ display: `${PandaDisplay}` }}
            >
              <Form.Item
                label="링크"
                name="Link"
                rules={[{ required: true, message: "Please input your Link" }]}
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
          <div
            style={{
              position: "fixed",
              zIndex: "99",
              left: "0",
              right: "0",
              bottom: "0",
              background: "white",
              display: `${displayCart}`,
              justifyContent: "center",
              borderTop: "1px solid red",
            }}
          >
            <div>
              <div style={{ justityContent: "center" }}>
                <Select
                  defaultValue="도움을 준 판다를 선택해주세요"
                  style={{ width: "100%" }}
                  onChange={handleChange}
                >
                  <OptGroup label="PANDAS">{renderPanda}</OptGroup>
                </Select>

                <Row gutter={[16, 16]}>
                  <Table
                    columns={columns}
                    dataSource={cart.array}
                    pagination={false}
                  />
                  <Menu
                    onClick={handleClick}
                    style={{ width: "100%" }}
                    defaultSelectedKeys={["1"]}
                    mode="inline"
                  >
                    <SubMenu
                      key="sub1"
                      icon={<DatabaseOutlined />}
                      title="옵션을 선택해주세요"
                    >
                      {renderOption}
                    </SubMenu>
                  </Menu>
                </Row>
              </div>
              <div
                style={{
                  display: "flex",
                  justityContent: "center",
                  minWidth: "100%",
                }}
              ></div>
              <div style={{ justityContent: "center" }}>
                <div style={{ float: "left" }}>
                  <Button
                    size="large"
                    shape="round"
                    type="danger"
                    onClick={clickHandler}
                  >
                    상품담기
                  </Button>
                </div>

                <div style={{ float: "right", margin: "0 40px 30px" }}>
                  {approvePanda && (
                    <Button
                      size="large"
                      shape="round"
                      type="primary"
                      onClick={pandaClick}
                    >
                      판다!
                    </Button>
                  )}
                </div>
              </div>
              <Form
                form={form}
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                initialValues={{ remember: true }}
                autoComplete="off"
                onFinish={onSubmit}
                style={{ display: `${PandaDisplay}` }}
              >
                <Form.Item
                  label="링크"
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
          </div>
          <div
            style={{
              position: "fixed",
              zIndex: "99",
              left: "0",
              right: "0",
              top: "0",
              background: "white",
              display: "flex",
              justifyContent: "center",
              borderBottom: "1px  solid black",
            }}
          >
            <div style={{ justityContent: "center" }}>
              <Button size="large" type="primary" onClick={cartHandler}>
                {cartMessage}
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default ProductInfo;

/**
 *
 */
