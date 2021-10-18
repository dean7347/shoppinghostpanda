import React, { useEffect, useState } from "react";
import {
  Button,
  Descriptions,
  Menu,
  InputNumber,
  Table,
  Tag,
  Space,
} from "antd";
import { DatabaseOutlined } from "@ant-design/icons";
import produce from "immer";

const { SubMenu } = Menu;

function ProductInfo(props) {
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

    // cart.array.find((x) => x.key == key.key).optionCount = event;
    // let plusnumb = cart.array.find((x) => x.key == key.key).originPrice;
    // cart.array.find((x) => x.key == key.key).optionPrice = event * plusnumb;
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

  const clickHandler = () => {
    console.log(props);
    console.log(cart.array);
  };

  const clickTable = () => {
    console.log("테이블클릭");
  };

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
      <div style={{ display: "flex", justityContent: "center" }}>
        {/* {cartinfo} */}
        <Table
          columns={columns}
          dataSource={cart.array}
          pagination={false}
          onClick={clickTable}
        />
      </div>
      <div style={{ display: "flex", justityContent: "center" }}>
        <Menu
          onClick={handleClick}
          style={{ width: 256 }}
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
      </div>

      <div style={{ display: "flex", justityContent: "center" }}>
        <Button size="large" shape="round" type="danger" onClick={clickHandler}>
          Add to Cart
        </Button>
      </div>
    </div>
  );
}

export default ProductInfo;
