import React, {useEffect, useState} from 'react';
import cartStore from "../../store/CartStore.js";
import {useParams} from "react-router-dom";
import CartSkeleton from "../../skeleton/cart-skeleton.jsx";
import NoData from "../layout/no-data.jsx";
import toast from "react-hot-toast";
import ValidationHelper from "../../utility/ValidationHelper.js";
import {Modal} from "react-bootstrap";
import ReviewSubmitButton from "./ReviewSubmitButton.jsx";
import ReviewStore from "../../store/ReviewStore.jsx";

const Invoicedetails = () => {


    const{InvoiceDetails,InvoiceDetailsRequest}=cartStore()
    const{id}=useParams()
    useEffect(()=>{
        (async ()=>{
            await InvoiceDetailsRequest(id);
        })()
    },[id])

//bootstrap modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);


    let {ReviewFormData,ReviewFormOnChange,ReviewSaveRequest}=ReviewStore()
    const ReviewModal=(id)=>{
        setShow(true);
        ReviewFormOnChange('productID',id)
    }



    const submitReview=async ()=>{
        if(ValidationHelper.IsEmpty(ReviewFormData.des)){
            toast.error("Review Required")
        }else {
            let res=await ReviewSaveRequest(ReviewFormData);
            res?toast.success("New Review Created"):toast.error("Something Went Wrong !")
            setShow(false)
        }
    }



    if(InvoiceDetails==null){
        return <CartSkeleton/>
    }else if(InvoiceDetails.length===0){
        return <NoData/>
    }else {
        return (
            <div className="container mt-3">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card p-4">
                            <ul className="list-group list-group-flush ">
                                {
                                    InvoiceDetails.map((item, i) => {
                                        return (
                                            <li key={i} className="list-group-item m-2 shadow-lg">
                                                <div className="d-flex flex-column flex-md-row align-items-start gap-3">
                                                    <img
                                                        className="rounded-1 img-fluid"
                                                        alt=""
                                                        style={{maxWidth: '90px', height: 'auto'}}
                                                        src={item.product.image}
                                                    />
                                                    <div className="flex-grow-1">
                                                        <div className="fw-medium h6">{item.product.title}</div>
                                                        <span>Unit Price: {item.price}, Total: {item.price * parseInt(item.qty)}</span><br/>
                                                        <span>Qty: {item.qty}, Size: {item.size}, Color: {item.color}</span>
                                                    </div>
                                                    <div>
                                                        <button onClick={()=>ReviewModal(item['productID'])} className="btn btn-success">Create Review</button>
                                                    </div>
                                                </div>
                                            </li>

                                        )
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                </div>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <h6>Create Review</h6>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="container">
                            <div className="row">
                                <div className="col-12 p-2">
                                    <label className="form-label">Rating</label>
                                    <select onChange={(e)=>ReviewFormOnChange('rating',e.target.value)} className="form-select">
                                        <option value="5">5 Star</option>
                                        <option value="4">4 Star</option>
                                        <option value="3">3 Star</option>
                                        <option value="2">2 Star</option>
                                        <option value="1">1 Star</option>
                                    </select>
                                </div>
                                <div className="col-12 p-2">
                                    <label className="form-label">Review</label>
                                    <textarea onChange={(e)=>ReviewFormOnChange('des',e.target.value)} className="form-control" rows={7}/>
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <button className="btn btn-dark" onClick={handleClose}>Close</button>
                        <ReviewSubmitButton text="Submit" className="btn btn-success" onClick={submitReview}/>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }

};

export default Invoicedetails;