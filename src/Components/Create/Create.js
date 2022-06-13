import React, {Fragment, useContext, useState} from 'react';
import './Create.css';
import Header from '../Header/Header';
import useForms from "../Useforms/useForms"
import {AuthContext, FirebaseContext} from "../../Firebase/Context";
import {ref, uploadBytes, getDownloadURL} from "firebase/storage"
import {addDoc, collection} from "firebase/firestore"
import {v4} from "uuid"
import {useHistory} from "react-router-dom";


const Create = () => {

    const [value, handleChange] = useForms({Name: "", Category: "", Price: ""})
    const [image, setImage] = useState(null)

    const {storage, db} = useContext(FirebaseContext)
    const {user} = useContext(AuthContext)

    const history = useHistory()

    const date=new Date()


    const handleSubmit = () => {
        if (image === null) return
        const ImageRef = ref(storage, `/image/${image.name + v4()}`)
        uploadBytes(ImageRef, image).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                console.log(url)
                const collectionRef = collection(db, 'products')
                addDoc(collectionRef, {
                    name: value.Name,
                    category: value.Category,
                    price: value.Price,
                    url: url,
                    userid: user.uid,
                    createdDate: date.toDateString()
                }).then(() => {
                    history.push("/")
                })
            })
        })
    }

    return (
        <Fragment>
            <Header/>
            <card>
                <div className="centerDiv">

                    <label htmlFor="fname">Name</label>
                    <br/>
                    <input
                        className="input"
                        value={value.Name}
                        onChange={handleChange}
                        type="text"
                        id="fname"
                        name="Name"
                        defaultValue="John"
                    />
                    <br/>
                    <label htmlFor="fname">Category</label>
                    <br/>
                    <input
                        className="input"
                        value={value.Category}
                        onChange={handleChange}
                        type="text"
                        id="fname"
                        name="Category"
                        defaultValue="John"
                    />
                    <br/>
                    <label htmlFor="fname">Price</label>
                    <br/>
                    <input className="input" value={value.Price} onChange={handleChange} type="number" id="fname"
                           name="Price"/>
                    <br/>

                    <br/>
                    <img alt="Posts" width="200px" height="200px" src={image ? URL.createObjectURL(image) : ''}/>

                    <br/>
                    <input type="file" onChange={(event) => setImage(event.target.files[0])}/>
                    <br/>
                    <button className="uploadBtn" onClick={handleSubmit}>upload and Submit</button>

                </div>
            </card>
        </Fragment>
    );
};

export default Create;
