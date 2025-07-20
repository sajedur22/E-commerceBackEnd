import React, {useEffect} from 'react';
import Layout from "../comonenets/layout/layout.jsx";
import Product from "../comonenets/product/product.jsx";
import productStore from "../store/ProductStore.js";
import ProductDetails from "../comonenets/product/product-details.jsx";
import Brands from "../comonenets/product/brands.jsx";
import {useParams} from "react-router-dom";
const ProdectByDetails = () => {
    const{BrandList,DetailsRequest,ReviewRequest,BrandListRequest}=productStore();
    const {id}=useParams();
    useEffect(()=>{
        (async ()=>{
            await DetailsRequest(id);
            await ReviewRequest(id);
          BrandList==null?await BrandListRequest():null;
        })()
    },[])

    return (

        <Layout><div className={'bg-light'}>
           <ProductDetails/>
            <Brands/></div>
        </Layout>
    );
};

export default ProdectByDetails;