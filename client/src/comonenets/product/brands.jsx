import React from 'react';
import ProductStore from "../../store/ProductStore.js";
import BrandSkeleton from "../../skeleton/brand-skeleton.jsx";
import {Link} from "react-router-dom";

const Brands = () => {
    const {BrandList}=ProductStore();

    if(BrandList===null){
        return (<BrandSkeleton/>)
    }else{
        return (
            <div className={'section'}>
                <div className={'container'}>
                    <div className={'row'}>
                        <h1 className="headline-4 text-center my-2 p-0">Top Brands</h1>
                        <span
                            className="bodySmal mb-5 text-center">Explore a World of Choices Across Our Most Popular <br
                        />Shopping Categories </span>
                        {
                            BrandList.map((item,i)=> {
                            return(
                            <div key={i} className={'col-md-3 p-2 col-lg-2 col-sm-4 col-4 text-center text-black-500'}>
                        <Link to={`/by-brand/${item['_id']}`} className={'card h-100 rounded-3 bg-white'}>
                            <div className={'card-body text-lg-center'}>
                                <img alt='img' className={'w-100'} src={item['brandImg']}/>
                                <p className={'bodySmal my-1'}>{item['brandName']}</p>
                            </div>
                        </Link>
                    </div>
                            )
                            })
                        }
                    </div>
                </div>
            </div>
        );
    }
};

export default Brands;