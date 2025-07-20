import React from 'react';

import Skeleton from "react-loading-skeleton";
import Lottie from 'lottie-react';
import animationData from '../assets/images/image.json'

const FeaturesSkeleton = () => {
    return (
       <div>
                {
                    Array.from({length:20}).map(()=>{
                        return (
                            <div className={'col-12 col-md-12 col-sm-12 col-lg-12'}>
                                <div className={'shadow-sm'}>
                                    <div className={'card-body'}>
                                        <div className={'row'}>

                                            <div className={'col-12'}>
                                                <Skeleton count={1}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
          </div>
    );
};

export default FeaturesSkeleton;