import React, {useEffect} from 'react';
import {Link} from "react-router-dom";
import logo from '../../assets/images/plainb-logo.svg'
import productStore from "../../store/ProductStore.js";
import UserStore from "../../store/UserStore.js";
import Submitbutton from "../user/submitbutton.jsx";
import {useNavigate} from "react-router-dom";
import CartStore from "../../store/CartStore.js";
import WishStore from "../../store/WishStore.js";

const AppNavBar = () => {
    const navigate=useNavigate()
    const{SearchKeyword,SetSearchKeyword}=productStore()
    const{isLogin,UserLogoutRequest}=UserStore()
    const{CartCount,CartListRequest}=CartStore()
    const{WishCount,WishListRequest}=WishStore()

    const OnLogout=async ()=>{
        let res=await UserLogoutRequest();
        sessionStorage.clear();
        localStorage.clear();
        navigate("/");
    }
    const OnProfile=()=>{
        navigate("/profile")
    }

    useEffect(() => {
        (async ()=>{
            if(isLogin()){
                await CartListRequest();
                await WishListRequest();
            }
        })()
    }, []);

    return (
          <>
              <div className="container-fluid text-white p-2 bg-success">
                  <div className="container">
                      <div className="row align-items-center justify-content-between">
                          <div className="col-12 col-md-6 text-center text-md-start mb-2 mb-md-0">

                                <span className="f-12 me-3">
                                    <i className="bi bi-envelope"></i> Support@PlanB.com
                                </span>
                                <span className="f-12 mx-2">
                                    <i className="bi bi-envelope"></i> 01774688159
                                </span>

                          </div>
                          <div className="col-12 col-md-6 text-center text-md-end">
                            <span className="mx-2">
                                   <i className="bi bi-whatsapp"></i>
                             </span>
                          <span className="mx-2">
                                  <i className="bi bi-youtube"></i>
                          </span>
                              <span className="mx-2">
                                       <i className="bi bi-facebook"></i>
                               </span>
                          </div>
                      </div>
                  </div>
              </div>

              <nav className="navbar sticky-top bg-white navbar-expand-lg navbar-light py-3 shadow-sm">
                  <div className="container">
                      {/* Logo */}
                      <Link className="navbar-brand" to="/">
                          <img className="img-fluid" src={logo} alt="Logo" width="95px"/>
                      </Link>

                      {/* Toggler */}
                      <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                              data-bs-target="#nav06" aria-controls="nav06" aria-expanded="false"
                              aria-label="Toggle navigation">
                          <span className="navbar-toggler-icon"></span>
                      </button>

                      {/* Collapsible Content */}
                      <div className="collapse navbar-collapse" id="nav06">

                          {/* Left Buttons */}
                          <div
                              className="d-flex flex-column flex-lg-row align-items-start align-items-lg-center gap-2 me-auto mt-3 mt-lg-0">
                              <Link className="btn btn-light" to="/">
                                  <i className="bi bi-house"></i> Home
                              </Link>

                              <Link className="btn btn-light position-relative" to="/cart">
                                  <i className="bi bi-bag text-dark"></i> Cart
                                  {CartCount > 0 && (
                                      <span
                                          className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success">
                            {CartCount}
                        </span>
                                  )}
                              </Link>

                              <Link className="btn btn-light position-relative" to="/wish">
                                  <i className="bi bi-heart text-dark"></i> Wish
                                  {WishCount > 0 && (
                                      <span
                                          className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning">
                            {WishCount}
                        </span>
                                  )}
                              </Link>

                              <Link className="btn btn-light" to="/orders">
                                  <i className="bi bi-truck text-dark"></i> Order
                              </Link>
                          </div>

                          {/* Right Section (Search + Login/Profile) */}
                          <div
                              className="d-flex flex-column flex-lg-row align-items-stretch align-items-lg-center gap-2 mt-3 mt-lg-0">

                              {/* Search */}
                              <div className="input-group">
                                  <input className="form-control form-control-sm" style={{height: "38px"}}
                                         value={SearchKeyword}
                                         onChange={(e) => SetSearchKeyword(e.target.value)}
                                         type="text"
                                         placeholder="Search"/>
                                  <button
                                      className="btn btn-outline-secondary"
                                      onClick={() => {
                                          if (SearchKeyword.length > 0) {
                                              navigate(`/by-keyword/${SearchKeyword}`);
                                          } else {
                                              navigate(`/`);
                                          }
                                      }}
                                  >
                                      <i className="bi bi-search"></i>
                                  </button>
                              </div>

                              {/* Login/Profile */}
                              <div className="d-flex gap-2">
                                  {isLogin() ? (
                                      <>
                                          <Submitbutton text="Profile" onClick={OnProfile}
                                                        className="btn btn-success btn-sm"/>
                                          <Submitbutton text="Logout" onClick={OnLogout}
                                                        className="btn btn-success btn-sm"/>
                                      </>
                                  ) : (
                                      <Link to="/login" className="btn btn-success btn-sm">Login</Link>
                                  )}
                              </div>
                          </div>
                      </div>
                  </div>
              </nav>

          </>
    );
};

export default AppNavBar;