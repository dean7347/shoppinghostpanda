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
import axios from "../../api/axiosDefaults";
const { SubMenu } = Menu;

function ProductInfoFlot(props) {
  const { Option, OptGroup } = Select;
  const [Product, setProduct] = useState({});

  const [SelectPanda, setSelectPanda] = useState("");
  const [Pandas, SetPandas] = useState([{}]);
  useEffect(() => {
    axios.get(`/api/getpandas_by_id?id=${props.proId}`).then((response) => {
      if (response.data.success) {
        SetPandas(response.data.details);
      } else {
        // //console.log("판다스 정보를 가져오지 못했습니다");
      }
    });
  }, []);

  useEffect(() => {
    axios
      .get(`/api/product/products_by_id?id=${props.proId}`)
      .then((response) => {
        if (response.data.success) {
          setProduct(response.data);
        } else {
          alert("상세정보 가져오기를 실패했습니다");
        }
      });
  }, []);

  function handleChange(value) {
    // //console.log(`selected ${value}`);
    setSelectPanda(value);
  }

  const [form] = Form.useForm();
  const columns = [
    {
      title: "상품명",
      dataIndex: "optionName",
      key: "optionName",
      width: "30%",
    },
    {
      title: "수량",
      dataIndex: "optionCount",
      key: "optionCount",
      render: (title, key) => (
        <>
          <InputNumber
            min={1}
            defaultValue={title}
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

  //옵션정보 로딩
  const temp = [];
  props.option.map((op, index) => {
    const info = {
      key: op.optionId,
      detailedId: op.detailedId,
      optionId: op.optionId,
      optionCount: op.optionCount,
      optionName: op.optionName,
      optionPrice:
        op.originPrice *
        op.optionCount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
      originPrice: op.originPrice,
    };

    temp.push(info);
  });

  const [cart, setCart] = useState({
    array: temp,
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
  };

  const onDelete = (title, key) => (event) => {
    if (
      window.confirm("장바구니에서 완전 삭제됩니다 그래도 삭제하시겠습니까?")
    ) {
      if (title.detailedId === undefined) {
        setCart(
          produce(cart, (draft) => {
            draft.array.splice(
              draft.array.find((x) => x.key == key.key),
              1
            );
          })
        );
      } else {
        const body = {
          orderDetailId: title.detailedId,
        };

        axios.post("/api/cart/removeoption", body).then((response) => {
          if (response.data.success) {
            alert("선택된 옵션을 삭제했습니다");
            window.location.reload();
          } else {
            alert("옵션 삭제에 실패했습니다");
          }
        });
      }
    } else {
    }
  };

  const handleClick = (e) => {
    if (
      cart.array.find((x) => x.optionId == options[e.key].optionId) !==
      undefined
    ) {
      alert("이미 존재하는 상품입니다");
    } else {
      const info = {
        key: options[e.key].optionId,
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
    if (Product) {
      setOptions(Product.poptions);
    } else {
      // //console.log("빈상품정보 로딩");
    }
  }, [Product]);

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

  const unique_user = Pandas.reduce((prev, now) => {
    if (!prev.some((obj) => obj.pandaId === now.pandaId)) prev.push(now);
    return prev;
  }, []);

  const renderPanda =
    unique_user &&
    unique_user.map((panda, index) => {
      return (
        <Option value={panda.pandaId} key={index}>
          <div style={{ float: "left" }}>{panda.panda}</div>
        </Option>
      );
    });

  const clickHandler = () => {
    //필요한 정보를 cart 필드에다가 넣어준다
    // //console.log("카트전달정보");

    const body = {
      productid: props.proId,
      cart: cart.array,
      selectpanda: SelectPanda,
    };

    axios.post("/api/updatecart", body).then((response) => {
      if (response.data.success) {
        alert("장바구니를 성공적으로 수정했습니다!");
        props.onCancel();
      } else {
        alert("장바구니 수정에 실패했습니다");
        // //console.log(response.data);
      }
    });
  };

  return (
    <div>
      <div style={{ justityContent: "center" }}>
        <Select
          defaultValue="도움을 준 판다를 선택해주세요"
          style={{ width: "100%" }}
          onChange={handleChange}
        >
          <OptGroup label="PANDAS">{renderPanda}</OptGroup>
        </Select>
        <div style={{ background: "red" }}>
          <Table
            scroll={{ x: true }}
            columns={columns}
            dataSource={cart.array}
            pagination={false}
          />
        </div>
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
      </div>
      <div
        style={{
          display: "flex",
          justityContent: "center",
          minWidth: "100%",
          background: "red",
        }}
      >
        <div style={{ justityContent: "center", TextAline: "center" }}>
          <div style={{ float: "left", width: "100%" }}></div>
        </div>
      </div>
      <div style={{ float: "right" }}>
        <Button size="large" shape="round" type="danger" onClick={clickHandler}>
          상품담기
        </Button>{" "}
      </div>
    </div>
  );
}

export default ProductInfoFlot;
