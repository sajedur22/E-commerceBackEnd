
const {BrandListServise, CategoryListServise, SliderListServise, ListByBrandServise, ListByCategoryServise,
    ListByRemarkServise, ListBySmilierServise, DetailsService, ListByKeywordService, ProductReviewServise,
    ReviewListServise, CreateReviewServise, ListByFiltterService
}=require('../services/ProductServices')
//const BrandModel = require("../models/BrandModel");



exports.ProductBrandList=async (req,res)=>{
    let result=await BrandListServise(req);
    return res.json(result);

}

exports.ProductCategoryList=async (req,res)=>{
    let result=await CategoryListServise(req);
    return res.status(200).json(result);
   // return res.json(status:"success",data:result)
}

exports.ProductSliderList=async (req,res)=>{
    let result=await SliderListServise();
    return res.status(200).json(result);

}

exports.ProductListByBrand=async (req,res)=>{
    let result=await ListByBrandServise(req);
    return res.status(200).json(result);

}

exports.ProductListByCategory=async (req,res)=>{
    let result=await ListByCategoryServise(req);
    return res.status(200).json(result);
}

exports.ProductListByRemark=async (req,res)=>{
    let result=await ListByRemarkServise(req);
    return res.status(200).json(result);
}

exports.ProductListBySmilier=async (req,res)=>{
    let result=await ListBySmilierServise(req);
    return res.status(200).json(result);

}
exports.ProductDetails=async (req,res)=>{
    let result=await DetailsService(req);
    return res.status(200).json(result);

}
exports.ProductListByKeyword=async (req,res)=>{
    let result=await ListByKeywordService(req);
    return res.status(200).json(result);

}

exports.ProductListByFiltter=async (req,res)=>{
    let result=await ListByFiltterService(req);
    return res.status(200).json(result);

}


exports.ProductReviewList=async (req,res)=>{
    let result=await ReviewListServise(req);
    return res.status(200).json(result);

}
exports.CreateReview=async (req,res)=>{
    let result=await CreateReviewServise(req);
    return res.status(200).json(result);

}

exports.CreateProductReview=async (req,res)=>{

}