import React, {useEffect} from 'react';
import ProductStore from "../../store/ProductStore.js";
import SliderSkeleton from "../../skeleton/slider-skeleton.jsx";
import {Link, useParams} from "react-router-dom";

const Slider = () => {
    const {SliderList}=ProductStore();



    if(SliderList===null){
        return <SliderSkeleton/>
    }else{
        return (
        <div>
        <div id="carouselExampleDark" className="carousel  carousel-dark slide">
            <div className="carousel-indicators">
                {
                    SliderList.map((item,i)=> {
                      return (
                          <button key={i} type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to={i}
                                  className="active"
                                  aria-current="true" aria-label=""></button>
                      )
                    })
                }
            </div>
            <div className="carousel-inner py-5">
                {
                    SliderList.map((item, i) => {
                        let active = "carousel-item"
                    if(i===0){
                        active="carousel-item active"
                    }
                    return(
                    <div key={i} className={active} data-bs-interval="10000">
                        <div className="container ">
                            <div className="row justify-content-center shadow-sm ">
                                <div className="col-12 col-md-6 p-4 text-center text-md-start">
                                    <h1 className="headline-1">{item['title']}</h1>
                                    <p>{item['des']}</p>

                                </div>
                                <div className="col-12 col-md-6 p-4 text-center">
                                    <img src={item['image']} className="w-100 rounded-3" alt="img"/>

                                    <Link to={`/details/${item['productID']}`} className={" btn text-white btn-success px-5 m-2"}>Buy Now</Link>
                                </div>
                            </div>
                        </div>
                    </div>)
                })
            }
        </div>
            <button className="carousel-control-prev btn rounded-5" type="button" data-bs-target="#carouselExampleDark"
                    data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>

            <button className="carousel-control-next btn" type="button" data-bs-target="#carouselExampleDark"
                    data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
        </div>
        );
    }

};

export default Slider;