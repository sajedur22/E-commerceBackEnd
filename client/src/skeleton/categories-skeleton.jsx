import React from 'react';
import Skeleton from "react-loading-skeleton";
import Lottie from 'lottie-react';
import animationData from '../assets/images/image.json'


const CategoriesSkeleton = () => {
    return (
        <div className={'section'}>
            <div className={'container'}>
                <div className={'row'}>
                    <h1 className={'headline-4 text-center my-2 p-0'}>Top Cetegories</h1>
                    <span className={'bodySmal mb-5 text-center'}>Explore a world Choices Across our Most Popular <br/>
                    Shopping Categories</span>
                    {
                        Array.from({length: 10}).map(()=>{
                            return (
                                <div className={'col-3 col-lg-8r col-sm-8r col-md-8r p-2'}>
                                    <div className={'card h-100 bg-light rounded-3'}>
                                        <div className={'card-body'}>
                                            <Lottie className={'w-75'} animationData={animationData} loop={true}/>
                                            <Skeleton count={1}/>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>

        </div>
    );
};

export default CategoriesSkeleton;