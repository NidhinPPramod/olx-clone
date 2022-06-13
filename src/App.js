import React, {useContext, useEffect} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import './App.css';
import Home from './Pages/Home';
import Signup from "./Pages/Signup";
import Login from "./Pages/Login"
import Create from "./Pages/Create"
import View from "./Pages/ViewPost"
import {AuthContext, FirebaseContext} from "./Firebase/Context";
import {onAuthStateChanged} from 'firebase/auth'
import Post from './Components/Context/Post Context'


function App() {

    const {setUser} = useContext(AuthContext)
    const {auth} = useContext(FirebaseContext)


    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setUser(user)
        })
    })

    return (
        <div>
            <Post>
                <Router>
                    <Route path="/" exact component={Home}/>
                    <Route path="/signup" component={Signup}/>
                    <Route path="/login" component={Login}/>
                    <Route path="/create" component={Create}/>
                    <Route path="/view" component={View}/>
                </Router>
            </Post>
        </div>
    );
}

export default App;
