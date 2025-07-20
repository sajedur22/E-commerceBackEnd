import React from 'react';
import FeatureStore from "../../store/FeatureStore.js";
import parse from "html-react-parser";
import LegalsSkeleton from "../../skeleton/legals-skeleton.jsx";

const Legals = () => {
    const {LegalsList}=FeatureStore();

    if(LegalsList===null){
        <LegalsSkeleton/>
    }else {
        return (

            <div className={'col-12 col-md-12 col-sm-12 col-lg-12'}>
                <div className={'shadow-sm'}>
                    <div className={'card-body'}>
                        <div className={'row'}>

                            <div className={'col-12'}>
                                {
                                    parse(LegalsList[0]['description'])
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }


};

export default Legals;