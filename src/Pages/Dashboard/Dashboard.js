import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams,
    useRouteMatch
  } from "react-router-dom";
import { NavLink } from 'react-router-dom';
import AdminRoute from '../../Components/Header/AdminRoute/AdminRoute';
import AddProduct from '../../Components/Header/Dashboard/AddProduct/AddProduct';
import DashHome from '../../Components/Header/Dashboard/DashHome/DashHome';
import MakeAdmin from '../../Components/Header/Dashboard/Make Admin/MakeAdmin';
import ManageProducts from '../../Components/Header/Dashboard/Manage Products/ManageProducts';
import ManageAllOrders from '../../Components/Header/Dashboard/ManageAllOrders/ManageAllOrders';
import MyOrders from '../../Components/Header/Dashboard/MyOrders/MyOrders';
import Pay from '../../Components/Header/Dashboard/Pay/Pay';
import Review from '../../Components/Header/Dashboard/Review/Review';
import UserRoute from '../../Components/UserRoute/UserRoute';
import useAuth from '../../hooks/useAuth';



const Dashboard = () => {
    let { path, url } = useRouteMatch();
    const {isAdmin, logOut,  setIsAdmin} = useAuth()
    const { user, isLoading } = useAuth()
    
    if (isLoading) {
        return (
            <div className="flex justify-center items-center my-40">
                <div
                    className="
                animate-spin
                rounded-full
                h-32
                w-32
                border-t-2 border-b-2 border-purple-500
              "
                ></div>
            </div>
        )
    }

    

    return (
        <div className="min-h-screen flex">
            <div className="py-12 px-10 w-1/6 bg-gradient-to-b from-secondary to-secondary-dark">
                <div className="flex space-2 items-center pb-4">
                    <div className="ml-3">
                        <NavLink to="/">
                        <h1 className="text-3xl font-bold text-primary">Dronet</h1>
                        </NavLink>
                    </div>
                </div>
                <hr />
                <div>
                    <ul className="">
                    <li>
                            
                            <NavLink to={`${url}`} className="my-1 flex items-center text-sm font-semibold hover:bg-gray-100 hover:text-white hover:bg-secondary-dark transition duration-200 p-3 rounded-md" activeClassName="bg-secondary-dark text-white">
                            <i className="fas fa-chart-line text-2xl mr-4"></i>
                                Dashboard</NavLink>
                        </li>
                        {
                            !isAdmin && <div>
                                
                        <li>
                            <NavLink to={`${url}/pay`} className="my-1 flex items-center text-sm font-semibold text-white hover:bg-gray-100 hover:text-white hover:bg-secondary-dark transition duration-200 p-3 rounded-md" activeClassName="bg-secondary-dark text-white">
                            <i className="fas fa-credit-card text-2xl mr-4"></i>
                                Pay</NavLink>
                        </li>
                        <li>
                            <NavLink to={`${url}/myOrders`} className="my-1 flex items-center text-sm font-semibold text-white hover:bg-gray-100 hover:text-white hover:bg-secondary-dark transition duration-200 p-3 rounded-md" activeClassName="bg-secondary-dark text-white">
                            <i className="fas fa-shopping-cart text-2xl mr-4"></i>
                                My Orders</NavLink>
                        </li>
                        <li>
                            <NavLink to={`${url}/review`} className="my-1 flex items-center text-sm font-semibold text-white hover:bg-gray-100 hover:text-white hover:bg-secondary-dark transition duration-200 p-3 rounded-md" activeClassName="bg-secondary-dark text-white">
                            <i className="fas fa-star-half-alt text-2xl mr-4"></i>
                                Review</NavLink>
                        </li>
                            </div>
                        }

                        <br /><br />
                        {
                            isAdmin  && <div>
                                <li>
                                <NavLink to={`${url}/makeAdmin`} className="my-1 flex items-center text-sm font-semibold text-white hover:bg-gray-100 hover:text-white hover:bg-secondary-dark transition duration-200 p-3 rounded-md" activeClassName="bg-secondary-dark text-white">
                                <i className="fas fa-user-cog text-2xl mr-4"></i>
                                    Make Admin</NavLink>
                            </li>
                            <li>
                                <NavLink to={`${url}/manageAllOrders`} className="my-1 flex items-center text-sm font-semibold text-white hover:bg-gray-100 hover:text-white hover:bg-secondary-dark transition duration-200 p-3 rounded-md" activeClassName="bg-secondary-dark text-white">
                                <i className="fas fa-tasks text-2xl mr-4"></i>
                                    Manage All Orders</NavLink>
                            </li>
                            <li>
                                <NavLink to={`${url}/manageProducts`} className="my-1 flex items-center text-sm font-semibold text-white hover:bg-gray-100 hover:text-white hover:bg-secondary-dark transition duration-200 p-3 rounded-md" activeClassName="bg-secondary-dark text-white">
                                <i className="fas fa-luggage-cart text-2xl mr-4"></i>
                                    Manage Products</NavLink>
                            </li>
                            <li>
                                <NavLink to={`${url}/addProduct`} className="my-1 flex items-center text-sm font-semibold text-white hover:bg-gray-100 hover:text-white hover:bg-secondary-dark transition duration-200 p-3 rounded-md" activeClassName="bg-secondary-dark text-white">
                                <i className="fas fa-plus-circle text-2xl mr-4"></i>
                                    Add a Product</NavLink>
                            </li>
                            
                            
                            </div>
                        }
                    </ul>
                </div>
                <div className="mt-20 ">
                    <button onClick={logOut} className="w-full bg-red-600 my-1 flex items-center text-sm font-semibold text-white hover:bg-red-700 hover:text-white hover:bg-secondary-dark transition duration-200 p-3 rounded-md"><i className="fas fa-sign-out-alt text-2xl mr-4"></i> Logout</button>
                </div>
            </div>
            <div className="bg-indigo-50 flex-grow py-12 px-10">
            <Switch>
        <Route exact path={path}>
          <DashHome></DashHome>
        </Route>
        <UserRoute path={`${path}/pay`}>
            <Pay></Pay>
        </UserRoute>
        <UserRoute path={`${path}/review`}>
            <Review></Review>
        </UserRoute>
        <UserRoute path={`${path}/myOrders`}>
            <MyOrders></MyOrders>
        </UserRoute>


        <AdminRoute path={`${path}/manageAllOrders`}>
            <ManageAllOrders></ManageAllOrders>
        </AdminRoute>
        <AdminRoute path={`${path}/addProduct`}>
            <AddProduct></AddProduct>
        </AdminRoute>
        <AdminRoute path={`${path}/makeAdmin`}>
            <MakeAdmin></MakeAdmin>
        </AdminRoute>
        <AdminRoute path={`${path}/manageProducts`}>
            <ManageProducts></ManageProducts>
        </AdminRoute>
      </Switch>
                <div></div>
                <div></div>
            </div>
        </div>

    );
};
export default Dashboard;