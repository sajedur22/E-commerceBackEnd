const mongoose=require('mongoose');
const DataSchema=mongoose.Schema({
        productID:{type:mongoose.Schema.Types.ObjectId,required:true},
        userID:{type:mongoose.Schema.Types.ObjectId,required:true},
        color:{type:"string",required:true},
        qty:{type:"string",required:true},
        size:{type:"string",required:true},
    },
    {timestamps:true,versionKey:false});

const CartModel=mongoose.model('carts',DataSchema)
module.exports=CartModel;