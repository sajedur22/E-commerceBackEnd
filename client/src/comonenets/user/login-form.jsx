import React from 'react';
import Submitbutton from "./submitbutton.jsx";
import UserStore from "../../store/UserStore.js";
import ValidationHelper from "../../utility/ValidationHelper.js";
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom";
const LoginForm = () => {
    let navigate=useNavigate()
    const {LoginFormValue,LoginFormOnChange,UserOTPRequest}=UserStore()

    const onFromSubmit=async ()=>{
        if(!ValidationHelper.IsEmail(LoginFormValue.email)){
      toast.error("valid Email Address Required")
        }else {
         let res= await UserOTPRequest(LoginFormValue.email);
         res?navigate("/veryfyotp"):toast.error("Something went wrong");
        }
    }


    return (
        <div className="container section">
            <div className="row d-flex justify-content-center">
                <div className="col-md-5">
                    <div className="card p-5">
                        <h4>Enter Your Email</h4>
                        <p>A verification code will be sent to the email address you provide</p>
                        <input value={LoginFormValue.email} onChange={(e)=>{LoginFormOnChange("email",e.target.value)}} placeholder="Email Address" type="email" className="form-control"/>
                        <Submitbutton onClick={onFromSubmit} className="btn mt-3 btn-success" text="Next" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;