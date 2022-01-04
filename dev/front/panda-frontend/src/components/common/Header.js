import React from "react";
import styled from "styled-components";
import Responsive from "./Responsive";
import Button from "./Button";
import { Link } from "react-router-dom";
import { ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";

import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
const HeaderBlock = styled.div`
  position: fixed;
  width: 100%;
  background: white;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08);
`;

// Responsive 컴포넌트의 속성에 스타일을 추가해서 새로운 컴포넌트 생성

const Wrapper = styled(Responsive)`
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .logo {
    font-size: 1.125rem;
    font-weight: 800;
    letter-spacing: 2px;
  }
  .right {
    display: flex;
    align-items: center;
  }
`;

// 헤더가 fixed로 되어 있기 때문ㅁ에 페이지의 콘텐츠가 4rem아래에 나타나도록 해주는 컴포넌트

const Spacer = styled.div`
  height: 4rem;
`;

const UserInfo = styled.div`
  font-weight: 800;
  margin-right: 1rem;
`;

const Header = ({ user, onLogout }) => {
  return (
    <>
      {/* <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
          <button
            class="navbar-toggler"
            type="button"
            data-mdb-toggle="collapse"
            data-mdb-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i class="fas fa-bars"></i>
          </button>

          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <a class="navbar-brand mt-2 mt-lg-0" href="#">
              <img
                src="https://mdbootstrap.com/img/logo/mdb-transaprent-noshadows.png"
                height="15"
                alt=""
                loading="lazy"
              />
            </a>
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a class="nav-link" href="#">
                  Dashboard
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  Team
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  Projects
                </a>
              </li>
            </ul>
          </div>

          <div class="d-flex align-items-center">
            <a class="text-reset me-3" href="#">
              <i class="fas fa-shopping-cart"></i>
            </a>

            <a
              class="text-reset me-3 dropdown-toggle hidden-arrow"
              href="#"
              id="navbarDropdownMenuLink"
              role="button"
              data-mdb-toggle="dropdown"
              aria-expanded="false"
            >
              <i class="fas fa-bell"></i>
              <span class="badge rounded-pill badge-notification bg-danger">
                1
              </span>
            </a>
            <ul
              class="dropdown-menu dropdown-menu-end"
              aria-labelledby="navbarDropdownMenuLink"
            >
              <li>
                <a class="dropdown-item" href="#">
                  Some news
                </a>
              </li>
              <li>
                <a class="dropdown-item" href="#">
                  Another news
                </a>
              </li>
              <li>
                <a class="dropdown-item" href="#">
                  Something else here
                </a>
              </li>
            </ul>

            <a
              class="dropdown-toggle d-flex align-items-center hidden-arrow"
              href="#"
              id="navbarDropdownMenuLink"
              role="button"
              data-mdb-toggle="dropdown"
              aria-expanded="false"
            >
              <img
                src="https://mdbootstrap.com/img/new/avatars/2.jpg"
                class="rounded-circle"
                height="25"
                alt=""
                loading="lazy"
              />
            </a>
            <ul
              class="dropdown-menu dropdown-menu-end"
              aria-labelledby="navbarDropdownMenuLink"
            >
              <li>
                <a class="dropdown-item" href="#">
                  My profile
                </a>
              </li>
              <li>
                <a class="dropdown-item" href="#">
                  
                </a>
              </li>
              <li>
                <a class="dropdown-item" href="#">
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav> */}
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="/">PanDa</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">상점</Nav.Link>
              <Nav.Link href="/">판다</Nav.Link>
            </Nav>
            {user ? (
              <Nav>
                <NavDropdown
                  title="MyPage"
                  id="basic-nav-dropdown"
                  style={{ float: "right" }}
                >
                  <NavDropdown.Item href="/buyer/mypage">
                    마이페이지
                  </NavDropdown.Item>

                  <NavDropdown.Item href="#action/3.2">
                    주문 배송조회
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/user/cart">
                    장바구니
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">
                    결제내역 조회
                  </NavDropdown.Item>
                </NavDropdown>

                <Nav.Link href="#deets">
                  {" "}
                  <Button onClick={onLogout}>로그아웃</Button>
                </Nav.Link>
              </Nav>
            ) : (
              <Nav>
                <Nav.Link>
                  <Button to="/signin">로그인</Button>
                </Nav.Link>

                <Nav.Link eventKey={2} href="#memes">
                  <Button to="/register">회원가입</Button>
                </Nav.Link>
              </Nav>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* <HeaderBlock>
        <Wrapper>
          <Link to="/" className="logo">
            Panda
          </Link>

          {user ? (
            <div className="right">
              <div style={{ marginRight: "10px" }}>
                <div style={{ margin: "5px" }}>
                  <Link to="/mypage">
                    <UserOutlined />
                    마이페이지
                  </Link>
                </div>
                <div style={{ margin: "5px" }}>
                  <Link to="/user/cart">
                    <ShoppingCartOutlined />
                    카트
                  </Link>
                </div>
              </div>
              <UserInfo>{user.username}</UserInfo>
            </div>
          ) : (
            <div className="right">
            </div>
          )}
        </Wrapper>
      </HeaderBlock>
      <Spacer /> */}
    </>
  );
};
export default Header;
