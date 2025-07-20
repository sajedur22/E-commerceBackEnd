import React, {useEffect} from 'react';
import {BrowserRouter, Route, Routes, useLocation} from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import ProductByBrand from "./pages/product-by-brand.jsx";
import ProductByCategory from "./pages/product-by-category.jsx";
import ProductByKeyword from "./pages/product-by-keyword.jsx";
import ProdectByDetails from "./pages/prodect-by-details.jsx";
import AboutPage from "./pages/about-page.jsx";
import ComplainPage from "./pages/complain-page.jsx";
import ContactPage from "./pages/contact-page.jsx";
import HowtobuyPage from "./pages/howtobuy-page.jsx";
import RefundPolicyPage from "./pages/refund-policy-page.jsx";
import TermsPage from "./pages/terms-page.jsx";
import LoginPage from "./pages/login-page.jsx";
import OtpPage from "./pages/otp-page.jsx";
import ProfilePage from "./pages/profilePage.jsx";
import WishlistPage from "./pages/wishlistPage.jsx";
import CartlistPage from "./pages/cartlistPage.jsx";
import Orders from "./pages/orders.jsx";
import InvoicePage from "./pages/invoicePage.jsx";



function ScrollToTopOnNavigation() {
    const { pathname } = useLocation();
    useEffect(() => {
        const scroll = () => {
            window.scrollTo(0, 0);
        };
        requestAnimationFrame(scroll);
    }, [pathname]);
    return null;
}

const App = () => {
    return (
        <BrowserRouter>
            <ScrollToTopOnNavigation/>
            <Routes>
                <Route path={'/'} element={<HomePage/>}/>
                <Route path={'/by-brand/:id'} element={<ProductByBrand/>}/>
                <Route path={'/by-category/:id'} element={<ProductByCategory/>}/>
                <Route path={'/by-keyword/:keyword'} element={<ProductByKeyword/>}/>
                <Route path={'/details/:id'} element={<ProdectByDetails/>}/>
                <Route path={'/about'} element={<AboutPage/>}/>
                <Route path={'/complain'} element={<ComplainPage/>}/>
                <Route path={'/contact'} element={<ContactPage/>}/>
                <Route path={'/howtobuy'} element={<HowtobuyPage/>}/>
                <Route path={'/refund'} element={<RefundPolicyPage/>}/>
                <Route path={'/terms'} element={<TermsPage/>}/>
                <Route path={'/login'} element={<LoginPage/>}/>
                <Route path={'/veryfyotp'} element={<OtpPage/>}/>
                <Route path={'/profile'} element={<ProfilePage/>}/>
                <Route path={'/wish'} element={<WishlistPage/>}/>
                <Route path={'/cart'} element={<CartlistPage/>}/>
                <Route path={'/orders'} element={<Orders/>}/>
                <Route path={'/invoice/:id'} element={<InvoicePage/>}/>


            </Routes>
        </BrowserRouter>
    );
};

export default App;