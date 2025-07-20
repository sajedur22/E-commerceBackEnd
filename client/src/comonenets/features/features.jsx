import React from 'react';
import FeaturesSkeleton from "../../skeleton/features-skeleton.jsx";
import FeatureStore from "../../store/FeatureStore.js";

const Features = () => {

    const {FeaturesList}=FeatureStore();

    if(FeaturesList===null){
        return <FeaturesSkeleton/>

    }else {
        return (
            <div className={'container section'}>
                <div className={'row'}>
                    {
                        FeaturesList.map((item, i) => {
                            return (
                                <div key={i} className={'col-12 col-sm-6 col-md-4 col-lg-3 p-2'}>
                                    <div className={'card shadow-sm'}>
                                        <div className={'card-body'}>
                                            <div className={'row'}>
                                                <div className={'col-3'}>
                                                    <img alt={'img'} className={'w-100'} src={item['img']}/>
                                                </div>
                                                <div className={'col-9'}>
                                                    <h3 className={'bodyXLarge'}>{item['name']}</h3>
                                                    <span className={'bodySmal'}>{item['description']}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>

            </div>
        );
    }
};

export default Features;