const EmailSend = require("../utility/EmailHelper");
const UserModel=require("../models/UserModel")
const ProfileModel=require("../models/ProfileModel")
const {EncodeToken} = require("../utility/TokenHelper");




const UserOTPService = async (req) => {
    try {
        let email=req.params.email;
        let code=Math.floor(100000+Math.random()*900000);

        let EmailText=`Your Verification Code is= ${code}`
        let EmailSubject='Email Verification'

        await EmailSend(email,EmailText,EmailSubject);

        await UserModel.updateOne({email:email},{$set:{otp:code}},{upsert:true})

        return {status:"success", message:"your 6 digit OTP verification code"}
    }catch (e) {
        return {status:"fail", message:e}
    }
}
const VerifyOTPServise=async (req)=>{

    try{
        let email=req.params.email;
        let otp=req.params.otp;
        //User count
        let total = await UserModel.countDocuments({ email: email, otp: otp });
        if(total===1){
            //user id read
            let user_id=await UserModel.find({email:email,otp:otp}).select("_id");
            //user token create
            let token=EncodeToken(email,user_id[0]['_id'].toString())
            //otp update
            await UserModel.updateOne({email:email},{$set:{otp:"0"}})
            return {status:"success", message:"Valid OTP",token:token}
        }else {
            return {status:"fail", message:"Invalid OTP"};
        }
    }catch (e){
        return {status:"fail", message:"Invalid OTP"};
    }

}

const savefileService=async (req)=>{
try{
    let user_id=req.headers.user_id;
    let reqBody=req.body;
    reqBody.userID=user_id;
    await ProfileModel.updateOne({userID:user_id},{$set:reqBody},{upsert:true})
    return{status:"success",message:"Profile save success"}
}catch (e){
    return{status:"fail",message:"something went wrong"}

}
}


const ReadProfileService=async (req)=>{
    try{
        let user_id=req.headers.user_id;
        const result=await ProfileModel.find({userID:user_id})
        return{status:"success",data:result}
    } catch(e){
        return{status:"fail",message:"something went wrong"}
    }

    }



module.exports={
    UserOTPService,
    VerifyOTPServise,
    savefileService,
    ReadProfileService,

}