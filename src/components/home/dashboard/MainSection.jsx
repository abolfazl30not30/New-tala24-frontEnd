import React, {useContext, useEffect, useState} from "react";
import {Route,Routes} from "react-router-dom";
import ProtectedRoute from "../../protectedRoute";
import Bazaar from "./Bazaar";
import BuyRequest from "./Requests/BuyRequest";
import SellRequest from "./Requests/SellRequest";
import SellReport from "./Reports/SellReport";
import BuyReport from "./Reports/BuyReport";
import BuyGold from "./BuyGold/BuyGold";
import SellGold from "./SellGold/SellGold";
import UserTicket from "./Ticket/UserTicket";
import UserChat from "./Ticket/UserChat";
import Dashboard from "./Dashboard";
import dashboard from "../../../contexts/dashboard";
import BuyCoin from "./BuyCoin/BuyCoin";
import NotFound from "../../Other/NotFound";
import InventoryIncrease from './InventoryIncrease'
import UserProfile from './UserProfile/UserProfile'
import BankAccounts from "./BankAccounts";
import signup from "../../../contexts/signup";
import WithDrawMoney from "./WithDrawMoney";
import ProtectVerify from "./ProtectVerify";

const MainSection = () => {
    const context = useContext(signup)
    return (
        <>
            <Routes>
                <Route path="/buy-coin" element={<ProtectedRoute><BuyCoin/></ProtectedRoute>}/>
                <Route path="/home" element={<ProtectedRoute><Bazaar/></ProtectedRoute>}/>
                <Route path="/buy-request" element={<ProtectedRoute><BuyRequest/></ProtectedRoute>}/>
                <Route path="/sell-request" element={<ProtectedRoute><SellRequest/></ProtectedRoute>}/>
                <Route path="/sell-report" element={<ProtectedRoute><SellReport/></ProtectedRoute>}/>
                <Route path="/buy-report" element={<ProtectedRoute><BuyReport/></ProtectedRoute>}/>
                <Route path="/inventory-increase" element={<ProtectedRoute><InventoryIncrease/></ProtectedRoute>}/>
                <Route path="/with-draw-money" element={<ProtectedRoute><WithDrawMoney/></ProtectedRoute>}/>
                <Route path="/user-profile" element={<ProtectedRoute><UserProfile/></ProtectedRoute>}/>
                <Route path="/bank-accounts" element={<ProtectedRoute><BankAccounts/></ProtectedRoute>}/>
                {

                        <Route path="/buy-gold" element={<ProtectedRoute><BuyGold/></ProtectedRoute>}/>
                }
                {

                        <Route path="/sell-gold" element={<ProtectedRoute><SellGold/></ProtectedRoute>}/>
                }
                <Route path="/ticket" element={<ProtectedRoute><UserTicket/></ProtectedRoute>}/>
                <Route path="/ticket/:id" element={<ProtectedRoute><UserChat/></ProtectedRoute>}/>
            </Routes>
        </>
    )
}
export default MainSection;
