import React, {useContext} from 'react';
import Logo from '../../olx-logo.png';
import './Login.css';
import useForms from "../Useforms/useForms";
import {FirebaseContext} from "../../Firebase/Context";
import {signInWithEmailAndPassword} from "firebase/auth"
import {Link, useHistory} from 'react-router-dom'


function Login() {

    const [value, handleChange] = useForms({email: "", password: ""})

    const {auth} = useContext(FirebaseContext)

    const history=useHistory()

    const handleLogin=(event)=>{
        event.preventDefault()
        signInWithEmailAndPassword(auth,value.email,value.password).then(()=>{
            alert("Login successful")
            history.push("/")
        }).catch((err)=>{
            alert(err.message)
        })
    }

    return (
        <div>
            <div className="loginParentDiv">
                <img width="200px" height="200px" src={Logo}></img>
                <form onSubmit={handleLogin}>
                    <label htmlFor="fname">Email</label>
                    <br/>
                    <input
                        value={value.email}
                        onChange={handleChange}
                        className="input"
                        type="email"
                        id="fname"
                        name="email"
                        defaultValue="John"
                    />
                    <br/>
                    <label htmlFor="lname">Password</label>
                    <br/>
                    <input
                        value={value.password}
                        onChange={handleChange}
                        className="input"
                        type="password"
                        id="lname"
                        name="password"
                        defaultValue="Doe"
                    />
                    <br/>
                    <br/>
                    <button>Login</button>
                </form>
                <Link to="/signup">
                <a >Signup</a>
                </Link>
            </div>
        </div>
    );
}

export default Login;
