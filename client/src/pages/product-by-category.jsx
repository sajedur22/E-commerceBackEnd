import React, {useEffect} from 'react';
import Layout from "../comonenets/layout/layout.jsx";
import productStore from "../store/ProductStore.js";
import {useParams} from "react-router-dom";
import ProductList from "../comonenets/product/product-list.jsx";

const ProductByBrand = () => {
    const {ListByCategoryRequest}=productStore()
    const {id}=useParams();
    useEffect(() => {
        (async ()=>{
            await ListByCategoryRequest(id);
        })()
    },[id]);

    return (
        <Layout>
            <ProductList/>
        </Layout>
    );
};

export default ProductByBrand;