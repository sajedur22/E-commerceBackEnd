const mongoose=require('mongoose');
const DataSchema=mongoose.Schema({

        userID:{type:mongoose.Schema.Types.ObjectId,required:true},
       productID:{type:mongoose.Schema.Types.ObjectId,required:true},
        invoiceID:{type:mongoose.Schema.Types.ObjectId,required:true},
        qty:{type:"string",required:true},
        price:{type:"string",required:true},
        color:{type:"string",required:true},
        size:{type:"string",required:true}

    },
    {timestamps:true,versionKey:false});

const InvoiceProductModel=mongoose.model('invoicesproducts',DataSchema)

module.exports=InvoiceProductModel;