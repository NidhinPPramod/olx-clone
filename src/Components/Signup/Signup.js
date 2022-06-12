import React, {useContext} from 'react';
import useForms from "../Useforms/useForms"
import Logo from '../../olx-logo.png';
import './Signup.css';
import {Link, useHistory} from 'react-router-dom'
import {FirebaseContext} from "../../Firebase/Context";
import {createUserWithEmailAndPassword, updateProfile} from "firebase/auth"
import {addDoc, collection} from "firebase/firestore"


export default function Signup() {

    const [value, handleChange] = useForms({name: "", email: "", phone: "", password: ""})

    const {db, auth} = useContext(FirebaseContext)

    const history = useHistory()

    const handleSubmit = (event) => {
        event.preventDefault()
        console.log(value)
        createUserWithEmailAndPassword(auth, value.email, value.password).then((result) => {
            updateProfile(result.user, {displayName: value.name,}).then(() => {
                addDoc(collection(db, "users"), {
                    id: result.user.uid,
                    username: value.name,
                    phone: value.phone
                }).then(() => {
                    history.push("/login")
                })
            })
        })
    }

    return (
        <div>
            <div className="signupParentDiv">
                <img width="200px" height="200px" src={Logo}/>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="fname">Username</label>
                    <br/>
                    <input
                        value={value.name}
                        onChange={handleChange}
                        className="input"
                        type="text"
                        id="fname"
                        name="name"
                        defaultValue="John"
                    />
                    <br/>
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
                    <label htmlFor="lname">Phone</label>
                    <br/>
                    <input
                        value={value.phone}
                        onChange={handleChange}
                        className="input"
                        type="number"
                        id="lname"
                        name="phone"
                        defaultValue="Doe"
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
                    <button>Signup</button>
                </form>
                <Link to="/login">
                    <a>Login</a>
                </Link>
            </div>
        </div>
    );
}
