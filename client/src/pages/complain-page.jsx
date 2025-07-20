import React, {useEffect} from 'react';
import Legals from "../comonenets/features/legals.jsx";
import Layout from "../comonenets/layout/layout.jsx";
import FeatureStore from "../store/FeatureStore.js";
const AboutPage = () => {
    const{LegalsListRequest}=FeatureStore()
    useEffect(()=>{
        (async ()=>{
            await  LegalsListRequest("complain")
        })()
    },[])
    return (
        <Layout>
            <Legals/>
        </Layout>
    );
};

export default AboutPage;