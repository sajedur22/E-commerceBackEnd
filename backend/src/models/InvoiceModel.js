const mongoose=require('mongoose');
const DataSchema=mongoose.Schema({

        userID:{type:mongoose.Schema.Types.ObjectId,required:true},
        payable:{type:"string",required:true},
        cus_details:{type:"string",required:true},
        shop_details:{type:"string",required:true},
        train_id:{type:"string",required:true},
        delivary_status:{type:"string",required:true},
        payment_status:{type:"string",required:true},
        total:{type:"string",required:true},
        vat:{type:"string",required:true},
    },
    {timestamps:true,versionKey:false});

const InvoiceModel=mongoose.model('invoices',DataSchema)
module.exports=InvoiceModel;