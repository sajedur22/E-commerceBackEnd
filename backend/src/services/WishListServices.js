const WishModel = require("../models/WishModel");
const mongoose=require("mongoose");
const ObjectID=mongoose.Types.ObjectId;
const SaveWishListService=async (req)=>{
    try{
        let user_id=req.headers.user_id;
        let reqBody=req.body;
        reqBody.userID=user_id;
 await WishModel.updateOne(reqBody,{$set:reqBody},{upsert:true})
        return{status:"success",message:"wish list save success"}
    } catch(e){
        return{status:"fail",message:"something went wrong"}
    }

}

const RemoveWishListService=async (req)=>{
    try{
        let user_id=req.headers.user_id;
        let reqBody=req.body;
        reqBody.userID=user_id;
        await WishModel.deleteOne(reqBody)
        return{status:"success",message:"wish list delete success"}
    } catch(e){
        return{status:"fail",message:"something went wrong"}
    }

}

const WishListServise=async (req)=>{
    try{
        let user_id=new ObjectID(req.headers.user_id);
        let matchStage={$match:{userID:user_id}};
        let JoinStageProduct={$lookup:{from:"products",localField:"productID",foreignField:"_id",as:"product"}}
         let unwindProductStage={$unwind:"$product"}

        let JoinStageBrand={$lookup:{from:"brands",localField:"product.brandID",foreignField:"_id",as:"brand"}}
        let unwindBrandStage={$unwind:"$brand"}

        let JoinStageCategory={$lookup:{from:"categories",localField:"product.categoryID",foreignField:"_id",as:"category"}}
        let unwindCategoryStage={$unwind:"$category"}

        let projection={$project:{
            createdAt:0,updatedAt:0,'product._id':0,'product.createdAt':0,'product.updatedAt':0,
                'brand._id':0,'category._id':0
        }
        }


        let data=await WishModel.aggregate([
            matchStage,
            JoinStageProduct,
            unwindProductStage,
            JoinStageBrand,
            unwindBrandStage,
            JoinStageCategory,
            unwindCategoryStage,
            projection


        ])
        return{status:"success",data:data}
    } catch(e){
        return{status:"fail",message:"something went wrong"}

    }

}

module.exports={
    SaveWishListService,
    WishListServise,
    RemoveWishListService
}