const {InvoiceListService, CreateInvoiceService, InvoiceProductListService, PaymentSuccessService, PaymentCancelService,
    PaymentFailService, PaymentIPNService
} = require("../services/InvoiceServices");
require('dotenv').config();

exports.CreateInvoice=async (req,res)=>{
    let result=await CreateInvoiceService(req);
    return res.status(200).json(result);
}

exports.InvoiceList=async (req,res)=>{
    let result=await InvoiceListService(req);
    return res.status(200).json(result);
}


exports.InvoiceProductList=async (req,res)=>{
    let result=await InvoiceProductListService(req);
    return res.status(200).json(result);
}

exports.PaymentSuccess=async (req,res)=>{
    let result=await PaymentSuccessService(req);

       return res.redirect(`${process.env.CLIENT_URL}/orders`);
}

exports.PaymentCancel=async (req,res)=>{
    let result=await PaymentCancelService(req);

       return res.redirect(`${process.env.CLIENT_URL}/orders`);
}

exports.PaymentFail=async (req,res)=>{
    let result=await PaymentFailService(req);

       return res.redirect(`${process.env.CLIENT_URL}/orders`);
}

exports.PaymentIPN=async (req,res)=>{
    let result=await PaymentIPNService(req);

    return res.status(200).json(result);
}
