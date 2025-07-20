const mongoose=require('mongoose');
const DataSchema=mongoose.Schema({
      categoryName:{type:"string",unique:true,required:true},
        categoryImg:{type:"string",required:true}
    },
    {timestamps:true,versionKey:false});

const CategoryModel=mongoose.model('categories',DataSchema)
module.exports=CategoryModel;