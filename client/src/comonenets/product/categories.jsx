import React from 'react';
import CategoriesSkeleton from "../../skeleton/categories-skeleton.jsx";
import ProductStore from "../../store/ProductStore.js";

import {Link} from "react-router-dom";

const Categories = () => {
    const {CategoryList}=ProductStore();

    if(CategoryList===null){
        return <CategoriesSkeleton/>
    }else{
        return (
            <div className={'section'}>
                <div className={'container'}>
                    <div className={'row'}>
                        <h1 className={'headline-4 text-center my-2 p-0'}>Top Cetegories</h1>
                        <span
                            className={'bodySmal mb-5 text-center'}>Explore a world Choices Across our Most Popular <br/>
                    Shopping Categories</span>
                        {
                            CategoryList.map((item,i) => {
                                return (
                                    <div key={i} className={'col-6 col-sm-4 col-md-3 col-lg-2 p-2'}>

                                            <Link to={`/by-category/${item['_id']}`} className={'card h-100 bg-light shadow-lg text-lg-center rounded-3'}>
                                                <div className={'card-body'}>
                                                    <img alt={'img'} className={'w-75 rounded-3'} src={item['categoryImg']}/>
                                                    <p className={'bodySmal mt-3'}>{item['categoryName']}</p>
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

export default Categories;