import React, {
  useEffect,
  useState,
  useCallback,
  useDispatch,
  useSelector,
} from "react";
import HeaderContainer from "../containers/common/HeaderContainer";
import Footer from "../components/common/Footer";
import axios from "../api/axiosDefaults";
import { Col, Card, Row, Button } from "antd";
import Meta from "antd/lib/card/Meta";
import ImageSlider from "../components/common/ImageSlider";
import Paging from "../components/common/Paging";
import SearchFeature from "../components/sections/SeacrchFeature";
import { Link } from "react-router-dom";

function MyProductPage() {
  const [Products, setProducts] = useState([]);

  //   페이지네이션
  const [NowPage, setNowPage] = useState([]);
  const [ViewCount, setViewCountPage] = useState([]);
  const [TotalCount, setTotalCountPage] = useState([]);
  const [Page, setPage] = useState(1);

  const onPageChanged = useCallback(
    (page) => {
      setPage(page);
      axios.get(`/api/myproduct?size=8&page=${page - 1}`).then((response) => {
        if (response.data != null) {
          setProducts(response.data.content);
          setViewCountPage(response.data.size);
          setTotalCountPage(response.data.totalElements);
        } else {
          // //console.log("상품들을 가져오는데 실패했습니다.");
        }
      });
    },
    [setPage]
  );

  ///검색
  const [SearchTerm, setSearchTerm] = useState("");

  useEffect(
    (Page) => {
      axios.get(`/api/myproduct?size=8&page=${Page - 1}`).then((response) => {
        if (response.data != null) {
          //console.log(response.data);
          // //console.log(response.data);
          setProducts(response.data.content);
          //page, count, setPage
          //현재 페이지
          // // //console.log(response.data.pageable.pageNumber);
          //한페이지당 보여줄 리스트 아이템 갯수
          setViewCountPage(response.data.size);
          //총 아이템의 갯수
          setTotalCountPage(response.data.totalElements);
        } else {
          // //console.log("상품들을 가져오는데 실패했습니다.");
        }
      });
    },
    [ViewCount, TotalCount]
  );
  const onClickStatusChange = (id, st) => {
    //console.log(id);
    //console.log(st);
    const body = {
      proId: id,
      type: st,
    };
    axios.post("/api/product/changeprostatus", body).then((response) => {
      if (response.data) {
        alert("상태변경에 성공했습니다");
        window.location.reload();
      } else {
        alert("상태변경에 실패했습니다");
      }
    });
  };

  const clickHandler = (e, param) => {
    //console.log(param);
  };
  const renderCards =
    Products &&
    Products.map((product, index) => {
      return (
        <Col lg={6} md={8} xs={24} key={index}>
          <a href={`/product/${product.proId}`}>
            <Card cover={<ImageSlider images={product} />}>
              <Meta
                title={product.proname}
                description={`${product.shopname}`}
              />
            </Card>
          </a>

          <div style={{ border: "1px solid", justityContent: "center" }}>
            <div>
              <div style={{ width: "50%", float: "left" }}>
                {product.salse ? (
                  <Button
                    block
                    variant="success"
                    size="sm"
                    onClick={() =>
                      onClickStatusChange(product.proId, "판매중지")
                    }
                  >
                    판매중지
                  </Button>
                ) : (
                  <Button
                    block
                    variant="success"
                    size="sm"
                    onClick={() =>
                      onClickStatusChange(product.proId, "판매재개")
                    }
                  >
                    판매재개
                  </Button>
                )}
              </div>
              <div style={{ width: "50%", float: "left" }}>
                <Button
                  block
                  variant="danger"
                  size="sm"
                  danger
                  onClick={() => onClickStatusChange(product.proId, "상품삭제")}
                >
                  상품삭제
                </Button>
              </div>
            </div>
            <Link
              to={{
                pathname: `/shop/editProduct/${product.proId}`,
                state: { proid: product.proId },
              }}
            >
              <Button block>상품수정</Button>
            </Link>
          </div>
        </Col>
      );
    });

  return (
    <>
      <div style={{ width: "75%", margin: "3rem auto" }}>
        <div style={{ textAlign: "center" }}>
          <Row gutter={[16, 16]}>{renderCards}</Row>
          <div style={{ display: "flex", justifyContent: "center" }}>
            {/* <button>더보기</button> */}
            <Paging
              //토탈레코드
              onPageChanged={onPageChanged}
              currentPage={Page}
              ViewCount={ViewCount}
              TotalCount={TotalCount}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default MyProductPage;
