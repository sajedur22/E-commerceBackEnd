
const ProfileModel=require("../models/ProfileModel");

const InvoiceModel=require("../models/InvoiceModel");
const InvoiceProductModel=require("../models/InvoiceProductModel");
const PaymentSettingModel=require("../models/PaymentSettingModel");
const mongoose = require("mongoose");
const ObjectID=mongoose.Types.ObjectId;
const FormData=require('form-data');
const axios=require("axios");
const CartModel= require("../models/CartModel");




const CreateInvoiceService=async (req)=>{
    try{
        let user_id=new ObjectID(req.headers.user_id);
        let cus_email=req.headers.email;

        //st1:Calculate Total Payable & vat
        let matchStage={$match:{userID:user_id}}
        let JoinStageProduct={$lookup:{from:"products",localField:"productID",foreignField:"_id",as:"product"}}
        let UnwindStage={$unwind:"$product"};

        let CartProducts=await CartModel.aggregate([
            matchStage,
            JoinStageProduct,
            UnwindStage

        ])

        let totalAmound=0;
        CartProducts.forEach((element)=>{
            let price;
        if(element['product']['discount']){
            price=parseFloat(element['product']['discountPrice'])
        }else {
            price=parseFloat(element['product']['price'])
        }
        totalAmound +=parseFloat(element['qty'])*price;
        })
        let vat=totalAmound*0.05 //5%vat
        let payable=totalAmound+vat;


        //st2: Prepare Customer Details & Shiping Details
        let Profile=await ProfileModel.aggregate([matchStage])
        let cus_details=`Name:${Profile[0]['cus_name']},Email:${cus_email},Address:${Profile[0]['cus_add']},Phone:${Profile[0]['cus_phone']}`
        let ship_details=`Name:${Profile[0]['ship_name']},city:${Profile[0]['ship_city']},Address:${Profile[0]['ship_add']},Phone:${Profile[0]['ship_phone']}`

        //st3:Transaction &Others
        let tran_id=Math.floor(10000000+Math.random()*90000000);

        //let val_id=0;
        let delivery_status="pending";
        let payment_status="pending";


        //st4:Create Invoice

        let createInvoice=await InvoiceModel.create({
            userID:user_id,
            payable:payable,
            cus_details:cus_details,
            shop_details:ship_details,
            train_id:tran_id,
            delivary_status:delivery_status,
            payment_status:payment_status,
            total:totalAmound,
            vat:vat,
        })

        //st5:Create Invoice Product
        let invoice_id=createInvoice['_id'];
        CartProducts.forEach(async (element)=> {
            await InvoiceProductModel.create({
                userID: user_id,
                productID: element['productID'],
                invoiceID: invoice_id,
                qty: element['qty'],
                price: element['product']['dicount'] ? element['product']['dicountPrice'] : element['product']['price'],
                color: element['color'],
                size: element['size']
            });
        });


        //st6:Remove Cart
        await CartModel.deleteMany({userID:user_id});

        //Prepare ssl payment====

        let PaymentSettings=await PaymentSettingModel.find();
        let form=new FormData();
        form.append('store_id',PaymentSettings[0]['store_id'])
        form.append('store_passwd',PaymentSettings[0]['store_passwd'])
        form.append('total_amount',payable.toString())
        form.append('currency',PaymentSettings[0]['currency'])
        form.append('tran_id',tran_id)
        form.append('success_url',`${PaymentSettings[0]['success_url']}/${tran_id}`)
        form.append('fail_url',`${PaymentSettings[0]['fail_url']}/${tran_id}`)
        form.append('cancel_url',`${PaymentSettings[0]['cancel_url']}/${tran_id}`)
        form.append('ipn_url',`${PaymentSettings[0]['ipn_url']}/${tran_id}`)

        form.append('cus_name',Profile[0]['cus_name'])
        form.append('cus_email',cus_email)
        form.append('cus_add1',Profile[0]['cus_add'])
        form.append('cus_add2',PaymentSettings[0]['cus_add'])
        form.append('cus_city',Profile[0]['cus_city'])
        form.append('cus_state',PaymentSettings[0]['cus_state'])
        form.append('cus_postcode',Profile[0]['cus_postcode'])
        form.append('cus_country',PaymentSettings[0]['cus_country'])
        form.append('cus_phone',Profile[0]['cus_phone'])
        form.append('cus_fax',PaymentSettings[0]['cus_phone'])

        form.append('shipping_method','YES')

        form.append('num_of_item',Profile[0]['qty'])
        form.append('ship_name',Profile[0]['ship_name'])
        form.append('ship_add1',Profile[0]['ship_add'])
        form.append('ship_add2',Profile[0]['ship_add'])
        form.append('ship_area',PaymentSettings[0]['ship_add'])
        form.append('ship_city',Profile[0]['ship_city'])
        form.append('cus_country',PaymentSettings[0]['cus_country'])
        form.append('ship_state',Profile[0]['ship_state'])
        form.append('ship_postcode',PaymentSettings[0]['ship_postcode'])
        form.append('ship_country',PaymentSettings[0]['ship_country'])

        form.append('product_name','According to invoice')
        form.append('product_category','According to invoice')
        form.append('product_profile','According to invoice')
        form.append('product_amount','According to invoice')

        let SSLRes=await axios.post(PaymentSettings[0]['init_url'],form)


        return{status:"success",data:SSLRes.data};
    }catch (e){
        return {
            status: "fail",
            message: e?.message || "Unknown error",
            error: e?.response?.data || null
        };
    }
}

const PaymentSuccessService=async (req)=>{
    try{
        let trxID=req.params.trxID;
        await InvoiceModel.updateOne({tran_id:trxID},{payment_status:"success"})
        return{status:"success"};
    }catch (e){
        return{status:"fail",message:"something went wrong"};
    }
}

const PaymentFailService=async (req)=>{
    try{
        let trxID=req.params.trxID;
        await InvoiceModel.updateOne({tran_id:trxID},{payment_status:"fail"})
        return{status:"fail"};
    }catch (e){
        return{status:"fail",message:"something went wrong"};
    }
}



const PaymentCancelService=async (req)=>{
    try{
        let trxID=req.params.trxID;
        await InvoiceModel.updateOne({tran_id:trxID},{payment_status:"cancel"})
        return{status:"cancel"};
    }catch (e){
        return{status:"fail",message:"something went wrong"};
    }
}

const PaymentIPNService=async (req)=>{
    try{
        let trxID=req.params.trxID;
        let status=req.body['status'];
        await InvoiceModel.updateOne({tran_id:trxID},{payment_status:status})
        return{status:"success"};
    }catch (e){
        return{status:"fail",message:"something went wrong"};
    }
}




const InvoiceListService=async (req)=>{
    try{
        let user_id=req.headers.user_id;
        let invoice=await InvoiceModel.find({userID:user_id});
        return{status:"success",data:invoice};
    }catch (e){
        return{status:"fail",message:"something went wrong"};
    }
}

const InvoiceProductListService=async (req)=>{
    try{
        let user_id=new ObjectID(req.headers.user_id);
        let invoice_id=new ObjectID(req.params.invoice_id);
         let matchStage={$match:{userID:user_id,invoiceID:invoice_id}};
         let JoinStageProduct={$lookup:{from:"products",localField:"productID",foreignField: "_id",as:"product"}};
         let unwindStage={$unwind: "$product"};




        let products=await InvoiceProductModel.aggregate([
            matchStage,JoinStageProduct,unwindStage
        ])

        return{status:"success",data:products};
    }catch (e){
        return{status:"fail",message:"something went wrong", error:e.message};
    }
}

module.exports={
    CreateInvoiceService,
    PaymentFailService,
    PaymentCancelService,
    PaymentIPNService,
    PaymentSuccessService,
    InvoiceListService,
    InvoiceProductListService
}