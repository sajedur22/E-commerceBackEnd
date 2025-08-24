const {UserOTPService, VerifyOTPServise, savefileService, ReadProfileService} =require("../services/UserServices")

exports.UserOTP=async (req,res)=>{
    let result=await UserOTPService(req);
    return res.status(200).json(result);
}

exports.VerifyLogin=async (req,res)=>{
    let result=await VerifyOTPServise(req);
    
    if (result['status'] === "success") {
       res.cookie("token", result['token'], {
    maxAge: 365 * 24 * 60 * 60 * 1000,
    httpOnly: true,       // JS থেকে access করা যাবে না, safe
    secure: false,        // development localhost এর জন্য
    sameSite: "Lax"       // localhost এ safe
});

    }


    return res.status(200).json(result);
}

exports.UserLogout=async (req,res)=>{
res.cookie("token", "", {
  maxAge: 0,
  httpOnly: true,
  secure: true,
  sameSite: "None"
});
  return res.status(200).json({status:"success"});
}


exports.CreateProfile=async (req,res)=>{
    let result=await savefileService(req);
    return res.status(200).json(result);
}


exports.UpdateProfile=async (req,res)=>{
    let result=await savefileService(req);
    return res.status(200).json(result);
}
exports.ReadProfile=async (req,res)=>{
    let result=await ReadProfileService(req);
    return res.status(200).json(result);
}