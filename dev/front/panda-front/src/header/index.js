import {Helmet} from "react-helmet";
import AuthenticationService from '../components/jwtlogin/AuthenticationService.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import "./index.css";

function Header(){
    const isUserLoggedIn = AuthenticationService.isUserLoggedIn();


    return(
        <div className="container-main">
            <Helmet>
            <meta charset="UTF-8" />
            <title>쇼핑호스트 판다</title>
            {/* <link href="https://fonts.googleapis.com/css?family=Noto+Sans+KR:300,400,500&display=swap" rel="stylesheet" />
            <link rel="stylesheet" href="/node_modules/bootstrap/dist/css/bootstrap.min.css" />
            <link rel="stylesheet" href="/node_modules/font-awesome/css/font-awesome.min.css" />
            <link rel="stylesheet" href="/node_modules/@yaireo/tagify/dist/tagify.css" />
            <link rel="stylesheet" href="/node_modules/summernote/dist/summernote-bs4.min.css" />
            <script src="/node_modules/jquery/dist/jquery.min.js"></script>
            <script src="/node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"></script>
            <script src="/node_modules/jdenticon/dist/jdenticon.min.js"></script> */}
            </Helmet>

            <nav className="navbar navbar-expand-sm navbar-light">
                <a id="study-logo" className="navbar-brand" href="/" >
                    <img src="/images/pandas/icons/main-logo.png" />
                </a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                    <form action="${todo}" className="form-inline" method="get">
                        <input className="form-control mr-sm-2" name="keyword" type="search" placeholder="상품찾기" aria-label="Search" />
                    </form>
                    </li>
                </ul>

                <ul className="navbar-nav justify-content-end" >
                
                    <li className="nav-item" authorize="isUserLoggedIn">
                        <a className="nav-link" href="/login">로그인</a>
                    </li>
                    <li className="nav-item" authorize="!isAuthenticated()">
                        <a className="nav-link" href="@{/sign-up}">가입</a>
                    </li>
                    {/* <li className="nav-item" authorize="isAuthenticated()">
                        <a className="nav-link" href="@{/notifications}">
                    <i th:if="${!hasNotification}" className="fa fa-bell-o" aria-hidden="true"></i>
                        <span className="text-info" th:if="${hasNotification}"><i class="fa fa-bell" aria-hidden="true"></i></span>
                        </a>
                    </li> */}
                    <li className="nav-item" authorize="false">
                        <a className="nav-link btn btn-outline-primary" href="@{/new-study}">
                            <i className="fa fa-plus" aria-hidden="true"></i> 스터디 개설
                        </a>
                    </li>
                    <li className="nav-item dropdown" authorize="isAuthenticated()">
                        <a class="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown"
                            aria-haspopup="true" aria-expanded="false">
                            {/* <svg th:if="${#strings.isEmpty(account?.profileImage)}" th:data-jdenticon-value="${#authentication.name}"
                                width="24" height="24" class="rounded border bg-light"></svg> */}
                            {/* <img th:if="${!#strings.isEmpty(account?.profileImage)}" th:src="${account.profileImage}"
                                width="24" height="24" class="rounded border"/> */}
                        </a>
                        <div className="dropdown-menu dropdown-menu-sm-right" aria-labelledby="userDropdown">
                            <h6 class="dropdown-header">
                                <span authentication="name">Username</span>
                            </h6>
                            <a className="dropdown-item" href="@{'/profile/' + ${#authentication.name}}">프로필</a>
                            <a className="dropdown-item" >스터디</a>
                                <div className="dropdown-divider"></div>
                                    <a className="dropdown-item" href="#" href="@{'/settings/profile'}">설정</a>
                                        <form className="form-inline my-2 my-lg-0" action="#" action="@{/logout}" method="post">
                                    <button className="dropdown-item" type="submit">로그아웃</button>
                                        </form>
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>
                    
        

        </div>
    )

}



export default Header;
