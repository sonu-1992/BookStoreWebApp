import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Amplify } from "aws-amplify";

import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

import awsExports from "./config";
import Home from "./scenes/home/Home";
import Navbar from "./scenes/global/Navbar";
import Footer from "./scenes/global/Footer";
import ItemDetails from "./scenes/itemDetails/ItemDetails";
import CartMenu from "./scenes/global/CartMenu";
import Checkout from "./scenes/checkout/Checkout";
import Confirmation from "./scenes/checkout/Confirmation";
import Chat from "./components/chat";

Amplify.configure(awsExports);
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default function App() {
  return (
      <Authenticator socialProviders ={['amazon','apple','facebook','google']}>
        {({signOut, user}) => {
          console.log("user",user);
          return (
            <>
              <BrowserRouter>
                <Navbar />
                <ScrollToTop />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="item/:itemId" element={<ItemDetails />} />
                  <Route path="checkout" element={<Checkout />} />
                  <Route path="checkout/success" element={<Confirmation />} />
                </Routes>
                <Chat/>
                <CartMenu />
                <Footer />
                
              </BrowserRouter>
            </>
            )
        }}
      </Authenticator>
  ); 
}


