import React, {useContext, useEffect} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import './App.css';
import Home from './Pages/Home';
import Signup from "./Pages/Signup";
import Login from "./Pages/Login"
import {AuthContext, FirebaseContext} from "./Firebase/Context";
import {onAuthStateChanged} from 'firebase/auth'

function App() {

    const{setUser}=useContext(AuthContext)
    const{auth}=useContext(FirebaseContext)

    useEffect(()=>{
        onAuthStateChanged(auth,(user)=>{
            setUser(user)
        })
    })

    return (
        <div>
            <Router>
                <Route path="/" exact component={Home}/>
                <Route path="/signup" component={Signup}/>
                <Route path="/login" component={Login}/>
            </Router>
        </div>
    );
}

export default App;
