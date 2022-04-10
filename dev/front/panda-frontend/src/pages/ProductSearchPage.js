import React, {
  useEffect,
  useState,
  useCallback,
  useDispatch,
  useSelector,
} from "react";
import HeaderContainer from "../containers/common/HeaderContainer";
import axios from "../api/axiosDefaults";
import { Col, Card, Row, Carousel } from "antd";
import Meta from "antd/lib/card/Meta";
import ImageSlider from "../components/common/ImageSlider";
import Paging from "../components/common/Paging";
import SearchFeature from "../components/sections/SeacrchFeature";

function ProductSearchPage(props) {
  // //console.log("프롭스");
  // //console.log(props.match.params.productname);
  const search = props.match.params.productname;
  const [Products, setProducts] = useState([]);

  //   페이지네이션
  const [NowPage, setNowPage] = useState([]);
  const [ViewCount, setViewCountPage] = useState([]);
  const [TotalCount, setTotalCountPage] = useState([]);
  const [Page, setPage] = useState(1);
  const onPageChanged = useCallback(
    (page) => {
      setPage(page);
      axios
        .get(`/api/searchpreview?size=5&page=${page - 1}&productname=${search}`)
        .then((response) => {
          if (response.data != null) {
            // // //console.log(response.data);
            setProducts(response.data.content);
            //page, count, setPage
            //현재 페이지
            // // //console.log(response.data.pageable.pageNumber);

            //한페이지당 보여줄 리스트 아이템 갯수
            setViewCountPage(response.data.size);
            // // //console.log(response.data.size);

            //총 아이템의 갯수
            setTotalCountPage(response.data.totalElements);
            // // //console.log(response.data.totalElements);

            // // //console.log(response.data.pageable.offset);
            // // //console.log(response.data.totalElements);
          } else {
            // //console.log("상품들을 가져오는데 실패했습니다.");
          }
        });
    },
    [props, setPage]
  );

  ///검색
  const [SearchTerm, setSearchTerm] = useState("");

  useEffect(
    (Page) => {
      axios
        .get(`/api/searchpreview?size=5&page=${Page - 1}&productname=${search}`)
        .then((response) => {
          if (response.data != null) {
            // //console.log("초기데이터");
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
    [props, ViewCount, TotalCount]
  );

  const updateSearchTerm = (newSearchTerm) => {
    setSearchTerm(newSearchTerm);

    //이값으로 백엔드
    // let body= {
    //   skip:0,
    //   limit: 8,
    //   filter:filter;
    //   searchTerm: newSearchTerm
    // }

    // getProduct(body)

    //여기서 리렌더링
  };

  const renderCards = Products.map((product, index) => {
    return (
      <Col lg={6} md={8} xs={24} key={index}>
        <a href={`/product/${product.proId}`}>
          <Card cover={<ImageSlider images={product} />}>
            <Meta title={product.proname} description={`${product.shopname}`} />
          </Card>
        </a>
      </Col>
    );
  });

  return (
    <>
      <div style={{ zIndex: "99" }}>
        <HeaderContainer />
      </div>
      <div style={{ width: "75%", margin: "3rem auto" }}>
        <div style={{ textAlign: "center" }}>
          <h2>PandaShop</h2>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              margin: "1rem auto",
            }}
          >
            <SearchFeature
              refreshFunction={updateSearchTerm}
              history={search}
            />
          </div>
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

export default ProductSearchPage;
