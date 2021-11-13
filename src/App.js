
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import Header from './Components/Header/Header';
import PrivateRoute from './Components/Header/PrivateRoute/PrivateRoute';
import AuthProvider from './context/AuthProvider';
import Dashboard from './Pages/Dashboard/Dashboard';
import Drones from './Pages/Drones/Drones';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import PlaceOrder from './Pages/PlaceOrder/PlaceOrder';
import Register from './Pages/Register/Register';

function App() {
  return (
    <AuthProvider>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/">
                        <Home></Home>
                    </Route>
                    <Route path="/home">
                        <Home></Home>
                    </Route>
                    <Route path="/login">
                        <Login></Login>
                    </Route>
                    <Route path="/register">
                        <Register></Register>
                    </Route>
                    <Route path="/drones">
                        <Drones></Drones>
                    </Route>
                    <PrivateRoute path="/placeOrder/:id">
                        <PlaceOrder></PlaceOrder>
                    </PrivateRoute>
                    <PrivateRoute path="/dashboard">
                        <Dashboard></Dashboard>
                    </PrivateRoute>
                </Switch>
            </BrowserRouter>
        </AuthProvider>
  );
}

export default App;
