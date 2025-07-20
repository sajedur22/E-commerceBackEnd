const express=require('express');
const ProductController=require("../controller/ProductController")
const UserController=require("../controller/UserController")
const WishListController=require("../controller/WishListController")
const CartListController=require("../controller/CartListController")
const InvoiceController=require("../controller/InvoiceController")
const FeaturesController=require("../controller/FeaturesController")




const AuthVerification=require("../middleware/AuthVerification")

const router=express.Router();

//PRODUCT
router.get("/ProductBrandList",ProductController.ProductBrandList)
router.get("/ProductCategoryList",ProductController.ProductCategoryList)
router.get("/ProductSliderList",ProductController.ProductSliderList)

router.get("/ProductListByBrand/:BrandID",ProductController.ProductListByBrand)
router.get("/ProductListByCategory/:CategoryID",ProductController.ProductListByCategory)
router.get("/ProductListByRemark/:Remark",ProductController.ProductListByRemark)

router.get("/ProductListBySmilier/:CategoryID",ProductController.ProductListBySmilier)
router.get("/ProductDetails/:ProductID",ProductController.ProductDetails)
router.get("/ProductListByKeyword/:Keyword",ProductController.ProductListByKeyword)

router.get("/ProductReviewList/:ProductID",ProductController.ProductReviewList)

router.get("/CreateProductReview",ProductController.CreateProductReview)
router.post("/PorductListByFiltter",ProductController.ProductListByFiltter)


//user
router.get("/UserOTP/:email",UserController.UserOTP)
router.get("/VerifyLogin/:email/:otp",UserController.VerifyLogin)
router.get("/UserLogout",AuthVerification,UserController.UserLogout)

//create&updte profile
router.post("/CreateProfile",AuthVerification,UserController.CreateProfile)
router.post("/UpdateProfile",AuthVerification,UserController.UpdateProfile)
router.get("/ReadProfile",AuthVerification,UserController.ReadProfile)

//wishlist
router.post("/SaveWishList",AuthVerification,WishListController.SaveWishList)
router.post("/RemoveWishList",AuthVerification,WishListController.RemoveWishList)
router.get("/WishList",AuthVerification,WishListController.WishList)

//cart
router.post("/SaveCartList",AuthVerification,CartListController.SaveCartList)
router.post("/UpdateCartList/:cartID",AuthVerification,CartListController.UpdateCartList)

router.post("/RemoveCartList",AuthVerification,CartListController.RemoveCartList)
router.get("/CartList",AuthVerification,CartListController.CartList)

//invoice&payment
router.get("/CreateInvoice",AuthVerification,InvoiceController.CreateInvoice)
router.get("/InvoiceList",AuthVerification,InvoiceController.InvoiceList)
router.get("/InvoiceProductList/:invoice_id",AuthVerification,InvoiceController.InvoiceProductList)

router.post("/PaymentSuccess/:trxID",InvoiceController.PaymentSuccess)
router.post("/PaymentCancel/:trxID",InvoiceController.PaymentCancel)
router.post("/PaymentFail/:trxID",InvoiceController.PaymentFail)
router.post("/PaymentIPN/:trxID",InvoiceController.PaymentIPN)

//features
router.get("/FeaturesList",FeaturesController.FeaturesList)
router.get("/LegalsDetails/:type",FeaturesController.LegalDetailsLis)


//router.get("/CreateReviewList",AuthVerification,ProductController.CreateReviewList)
router.post("/CreateReview",AuthVerification,ProductController.CreateReview)









module.exports=router;