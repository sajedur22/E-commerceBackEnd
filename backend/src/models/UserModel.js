const mongoose=require('mongoose');
const DataSchema=mongoose.Schema({
        email:{type:"string",unique:true,required:true,lowercase:true},
        otp:{type:"string",required:true}
    },
    {timestamps:true,versionKey:false});

const UserModel=mongoose.model('users',DataSchema)
module.exports=UserModel;