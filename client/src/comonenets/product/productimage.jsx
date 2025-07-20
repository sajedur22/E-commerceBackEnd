import React from 'react';
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import productStore from "../../store/ProductStore.js";


const ProductImage = () => {
    const {Details}=productStore()

    const images=[
        {original:Details[0]['details']['img1'],thumbnail:Details[0]['details']['img2'] ,},
        {original:Details[0]['details']['img1'],thumbnail:Details[0]['details']['img3'] ,},
        {original:Details[0]['details']['img1'],thumbnail:Details[0]['details']['img4'] ,},
        {original:Details[0]['details']['img1'],thumbnail:Details[0]['details']['img5'] ,},

        {original:Details[0]['details']['img1'],thumbnail:Details[0]['details']['img6'] ,},
        {original:Details[0]['details']['img1'],thumbnail:Details[0]['details']['img7'] ,},
        {original:Details[0]['details']['img1'],thumbnail:Details[0]['details']['img8'] ,}

]
    return (
        <div>
             <ImageGallery autoPlay={true} items={images} />;
        </div>
    );
};

export default ProductImage;