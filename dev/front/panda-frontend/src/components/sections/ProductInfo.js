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

import { LinkPreview } from "@dhaiwat10/react-link-preview";
import axios from "../../../node_modules/axios/index";
const { SubMenu } = Menu;

function ProductInfo(props) {
  const { Option, OptGroup } = Select;
  const [SelectPanda, setSelectPanda] = useState("");

  function handleChange(value) {
    console.log(`selected ${value}`);
    setSelectPanda(value);
  }
  const [Link, SetLink] = useState("");
  const [Pandas, SetPandas] = useState([{}]);
  const [form] = Form.useForm();
  const [PandaDisplay, SetPandaDisplay] = useState("none");

  const onSubmit = (e) => {
    const body = {
      productId: props.proId,
      link: Link,
    };
    axios.post("/api/addpropanda", body).then((response) => {
      console.log(response.data);
      if (response.data.success) {
        alert("판다링크 생성 완료");
      } else {
        alert(
          "판다링크생성에 실패했습니다. 해당 현상이 계속된다면 문의주시기 바랍니다"
        );
      }
    });
    SetLink("");
    form.resetFields();
    SetPandaDisplay("none");
  };

  const LinkHandler = (e) => {
    e.preventDefault();
    SetLink(e.target.value);
  };

  const columns = [
    {
      title: "상품명",
      dataIndex: "optionName",
      key: "optionName",
    },
    {
      title: "수량",
      dataIndex: "optionCount",
      key: "optionCount",
      render: (title, key) => (
        <>
          <InputNumber
            min={1}
            defaultValue={1}
            onChange={onChange(title, key)}
          />
        </>
      ),
    },
    {
      title: "가격/원",
      dataIndex: "optionPrice",
      key: "optionPrice",
    },

    {
      title: "Action",
      key: "action",
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
    setCart(
      produce(cart, (draft) => {
        draft.array.splice(
          draft.array.find((x) => x.key == key.key),
          1
        );
      })
    );
  };

  const handleClick = (e) => {
    console.log("clickㄷㄴㅇ " + e.key);
    if (cart.array.find((x) => x.key == e.key)) {
      alert("이미 존재하는 상품입니다");
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
      console.log("props");

      console.log(props);
    } else {
      console.log("빈상품정보 로딩");
    }
  }, [props]);

  // const cartinfo = cart.array.map((o, index) => {
  //   return (
  //     <>
  //       <div>{o.optionName}</div>
  //       <InputNumber min={1} defaultValue={1} onChange={onChange} />
  //       <div>{o.optionPrice}</div>
  //       <br />
  //     </>
  //   );
  // });

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

  const renderPanda =
    Pandas &&
    Pandas.map((panda, index) => {
      return (
        <Option value={panda.pandaId} key={index}>
          <div style={{ float: "left" }}>{panda.panda}</div>
        </Option>
      );
    });

  return (
    <div>
      <Descriptions title="Product Info">
        <Descriptions.Item label="Price">cdo</Descriptions.Item>
        <Descriptions.Item label="Sold">co1</Descriptions.Item>
        <Descriptions.Item label="View">co2</Descriptions.Item>
        <Descriptions.Item label="Description">
          {props.detail.desc}
        </Descriptions.Item>
      </Descriptions>

      <br />
      <br />
      <br />
      {/* //왼오 */}
      <div style={{ justityContent: "center" }}>
        <Select
          defaultValue="도움을 준 판다를 선택해주세요"
          style={{ width: "100%" }}
          onChange={handleChange}
        >
          <OptGroup label="PANDAS">{renderPanda}</OptGroup>
        </Select>

        <Row gutter={[16, 16]}>
          <Col lg={12} sm={12}>
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
                {/* <Menu.Item key="1">
              <div style={{ float: "left" }}>ㅁㅁㅁ</div>
              <div style={{ float: "right" }}>3000원</div>
            </Menu.Item>
            <Menu.Item key="2">Option 2</Menu.Item> */}
              </SubMenu>
            </Menu>
          </Col>
          <Col lg={12} sm={12}>
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
            </Form>
            <LinkPreview url={`${Link}`} width="400px" />
          </Col>
        </Row>
      </div>
      <div
        style={{
          display: "flex",
          justityContent: "center",
          minWidth: "100%",
          background: "red",
        }}
      ></div>
      <div style={{ justityContent: "center" }}>
        <div style={{ float: "left" }}>
          <Button size="large" shape="round" type="danger">
            Add to Cart
          </Button>
        </div>
        <div style={{ float: "right", margin: "0 40px 30px" }}>
          <Button
            size="large"
            shape="round"
            type="primary"
            onClick={pandaClick}
          >
            판다!
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ProductInfo;
