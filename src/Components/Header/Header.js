import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const Header = () => {
  const { user, logOut } = useAuth()



  return (
    <nav className="bg-secondary-dark">


      <div className="container mx-auto px-2 sm:px-6 lg:px-8 py-2">
        <div className="relative flex items-center justify-between h-16">

          <div className="flex-1 flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <NavLink to="/home"><h3 className="text-2xl lg:text-3xl font-bold"><span className="text-primary">Dronet</span></h3></NavLink>
            </div>
            <div className="hidden lg:block flex items-center mx-auto">
              <NavLink className="mx-2 font-medium text-white hover:bg-secondary px-5 py-2 rounded-md transition-all" to="/home" activeClassName="bg-secondary">Home</NavLink>
              <NavLink className="mx-2 font-medium text-white hover:bg-secondary px-5 py-2 rounded-md transition-all" to="/drones" activeClassName="bg-secondary">Drones</NavLink>
              {
                user.email && <>
                  <NavLink className="mx-2 font-medium text-white hover:bg-secondary px-5 py-2 rounded-md transition-all" to="/dashboard" activeClassName="bg-secondary">Dashboard</NavLink>
                </>
              }
            </div>
          </div>

          {
            user.email && <div className="flex items-center">
              <img width="30px" height="30px" className="rounded-full	mr-2 border-primary border-2" src={user.photoURL || 'https://i.ibb.co/FVdSWWM/download.jpg'} alt="" />
              <p className="text-white">{user.displayName ? user.displayName : "Unknown"}</p>

            </div>
          }

          <div className="flex items-center pr-2">
            {
              user.email ? <div className="flex">
                <button onClick={logOut} className="border border-1 border-primary text-primary hover:bg-gray-100 transition-all px-6 py-2 rounded-full ml-2">Log out</button>
                





              </div>
                :
                <div>
                  <NavLink to="/login" className="border border-1 border-primary text-primary hover:bg-primary hover:text-white transition-all px-6 py-2 rounded-full ml-2 ">Login</NavLink>
                  <NavLink to="/register" className="bg-primary  transition-all text-white px-6 py-2 rounded-full ml-2  bg-gradient-to-b  from-primary to-primary-dark hover:from-primary-dark hover:to-primary transition-all">Register</NavLink>
                </div>
            }



          </div>

        </div>

      </div >
    </nav >
  );
};

export default Header;