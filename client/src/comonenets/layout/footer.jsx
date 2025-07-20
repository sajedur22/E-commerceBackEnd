import React from 'react';
import {Link} from "react-router-dom";

const Footer = () => {
    return (
        <div>
            <div className={'section-bottom shadow-sm bg-light'}>
                <div className={'container py-5'}>
                    <div className={'row'}>
                        <div className={'col-md-4'}>
                            <h1 className={'bodyMedium'}>Legals</h1>
                            <div className={'text-primary'}>
                                <p className={'my-2'}>
                                    <Link className={'nav-link'} to={'/about'}>About</Link>
                                </p>
                                <p className={'my-2 '}>
                                    <Link className={'nav-link'} to={'/refund'}>Refund Policy</Link>
                                </p>
                                <p className={'my-2 '}>
                                    <Link className={'nav-link'} to={'/terms'}>Terms</Link>
                                </p>
                            </div>
                        </div>
                            <div className={'col-md-4'}>
                                <h1 className={'bodyMedium'}>Information</h1>
                                <div className={'text-primary'}>
                                    <p className={'my-2'}>
                                        <Link className={'nav-link'} to={'/howtobuy'}>How to Buy</Link>
                                    </p>
                                    <p className={'my-2'}>
                                        <Link className={'nav-link'} to={'/contact'}>Contact</Link>
                                    </p>
                                    <p className={'my-2'}>
                                        <Link className={'nav-link'} to={'/complain'}>Complain</Link>
                                    </p>
                                </div>
                            </div>
                            <div className={'col-md-4'}>
                                <h1 className={'bodyMedium'}>About</h1>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. A, explicabo.</p>
                                <img className={'w-75'}
                                     src={"https://brookesphysiotherapy.files.wordpress.com/2017/03/card-payment-logos.png"}/>
                            </div>
                    </div>
                </div>
            </div>
            <div className={'bg-dark py-2 text-center'}>
                <p className={'text-white bodySmal'}>All Right Reserved</p>
            </div>
        </div>

    );
};

export default Footer;