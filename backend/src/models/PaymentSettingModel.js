const mongoose=require('mongoose');
const DataSchema=mongoose.Schema({

        store_id:{type:"string",required:true},
        store_passwd:{type:"string",required:true},
            currency:{type:"string",required:true},
        success_url:{type:"string",required:true},
        fail_url:{type:"string",required:true},
        cancel_url:{type:"string",required:true},
        ipn_url:{type:"string",required:true},
        init_url:{type:"string",required:true},

    },
    {timestamps:true,versionKey:false});

const PaymentSettingModel=mongoose.model('paymenteettings',DataSchema)
module.exports=PaymentSettingModel;