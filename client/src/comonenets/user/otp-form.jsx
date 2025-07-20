import React from 'react';
import Submitbutton from "./submitbutton.jsx";
import UserStore from "../../store/UserStore.js";
import {useNavigate} from "react-router-dom";
import ValidationHelper from "../../utility/ValidationHelper.js";
import toast from "react-hot-toast";

const OtpForm = () => {
    let navigate=useNavigate()
    const {OtpFormValue,OtpFormOnChange,VeryFyLoginRequest}=UserStore()

    const onFromSubmit=async ()=>{
        if(ValidationHelper.IsEmpty(OtpFormValue.otp)){
            toast.error("valid otp Required")
        }else {
            let res= await VeryFyLoginRequest(OtpFormValue.otp);
            res?navigate("/profile"):toast.error("something went wrong");
        }
    }
    return (
        <div className="container section">
            <div className="row d-flex justify-content-center">
                <div className="col-md-5">
                    <div className="card p-5">
                        <h4>Enter Verification Code</h4>
                        <p>A verification code has been sent to the email address you provide</p>
                        <input value={OtpFormValue.otp} onChange={(e)=>{OtpFormOnChange("otp",e.target.value)}} placeholder="Verification" type="text" className="form-control"/>
                        <Submitbutton  onClick={onFromSubmit} className="btn mt-3 btn-success" text="Submit"/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OtpForm;