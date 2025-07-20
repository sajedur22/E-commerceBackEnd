import React, {useEffect} from 'react';
import Layout from "../comonenets/layout/layout.jsx";
import Features from "../comonenets/features/features.jsx";
import Slider from "../comonenets/product/slider.jsx";
import Brands from "../comonenets/product/brands.jsx";
import Category from "../comonenets/product/categories.jsx";
import Product from "../comonenets/product/product.jsx";





import ProductStore from "../store/ProductStore.js";
import FeatureStore from "../store/FeatureStore.js";
const HomePage = () => {
    const {BrandListRequest,CategpryListRequest,SliderListRequest,ListByRemarkRequest}=ProductStore();
    const {FeatureListRequest}=FeatureStore();
    useEffect(() => {
        (async ()=>{
            await SliderListRequest();
            await FeatureListRequest();
            await BrandListRequest();
            await CategpryListRequest();
            await ListByRemarkRequest("new");

        })()
    }, []);
    return (
        <Layout>
            <Slider/>
            <Features/>
            <Category/>
            <Brands/>
            <Product/>


        </Layout>
    );
};

export default HomePage;