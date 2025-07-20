const mongoose=require('mongoose');
const DataSchema=mongoose.Schema({

       title:{type:"string",required:true},
      des:{type:"string",required:true},
        price:{type:"Boolean",required:true},
        img:{type:"string",required:true},
       productID:{type:mongoose.Schema.Types.ObjectId,required:true},



    },
    {timestamps:true,versionKey:false});

const ProductSliderModel=mongoose.model('productsliders',DataSchema)
module.exports=ProductSliderModel;