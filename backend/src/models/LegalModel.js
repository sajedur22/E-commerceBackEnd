const mongoose=require('mongoose');
const DataSchema=mongoose.Schema({


        description:{type:"string",required:true},
        type:{type:"string",required:true},

    },
    {timestamps:true,versionKey:false});

const InvoiceModel=mongoose.model('legals',DataSchema)
module.exports=InvoiceModel;