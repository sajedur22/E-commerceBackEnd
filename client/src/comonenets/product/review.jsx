import React from 'react';
import productStore from "../../store/ProductStore.js";
import StarRatings from "react-star-ratings/build/star-ratings.js";

const Review = () => {
    const{ReviewList}=productStore()
    return (
        <div>
                <ul className="list-group list-group-flush">

                    {
                       ReviewList!==null? ReviewList.map((item, i) => {
                        return (<li key={i} className="list-group-item mt-2 bg-light p-2 shadow-sm">
                    <h6 className={'text-black fw-bold'}><i class="bi bi-person"></i>{item["profile"]["cus_name"]}</h6>
                    <p>{item['des']}</p>
                    <StarRatings rating={parseFloat(item[`rating`])} starRatedColor="red"
                                 starDimension="15px"
                                 starSpacing="2px"/>
                </li>
            )
            }):<h6>jjh</h6>

            }

                </ul>
        </div>

    );
};

export default Review;