import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import './App.css';
import Home from './Pages/Home';
import Signup from "./Pages/Signup";

function App() {
    return (
        <div>
            <Router>
                <Route path="/" component={Home}/>
                <Route path="/signup" component={Signup}/>
            </Router>
        </div>
    );
}

export default App;
