import React from 'react';
import { Redirect, Route } from 'react-router';
import useAuth from '../../../hooks/useAuth';

const AdminRoute = ({ children, ...rest }) => {
    const { user, isLoading, isAdmin, adminChecking } = useAuth()
    if(!adminChecking && isAdmin){
        return (
            <Route
                {...rest}
                render={({ location }) =>
                    user.email && isAdmin?
                        children :
                        <Redirect
                            to={{
                                pathname: '/',
                                state: { from: location }
                            }}
                        ></Redirect>
                }
            >
    
    
            </Route>
        );
    }
    if(!adminChecking){
        <Route
                {...rest}
                render={({ location }) =>
                <Redirect
                to={{
                    pathname: '/',
                    state: { from: location }
                }}
            ></Redirect>
                }
            >
    
    
            </Route>
    }
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
    
};

export default AdminRoute;