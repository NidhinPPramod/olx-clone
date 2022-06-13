import React, {useContext, useEffect, useState} from 'react';
import './View.css';
import {PostContext} from "../Context/Post Context";
import {FirebaseContext} from "../../Firebase/Context";
import {collection, getDocs, where} from "firebase/firestore";

function View() {

    const [userDetails, setUserDetails] = useState([])
    const {postDetails} = useContext(PostContext)
    const {db} = useContext(FirebaseContext)

    const collectionRef = collection(db, "users")

    useEffect(() => {
        const {userid} = postDetails
        console.log(postDetails)
        getDocs(collectionRef, where('id', '==', userid)).then((response) => {
            setUserDetails((response.docs.map((obj) => ({...obj.data()}))))
            console.log(userDetails)
        })
    }, [])

    return (
        <div className="viewParentDiv">

            {postDetails.map((value) => {
                return (
                    <div>
                        <div className="imageShowDiv">
                            <img
                                width="50px"
                                height="50px"
                                src={value.url}
                                alt=""
                            />
                        </div>
                        <div className="rightSection">
                            <div className="productDetails">
                                <p>&#x20B9; {value.price} </p>
                                <span>{value.name}</span>
                                <p>{value.category}</p>
                                <span>{value.createdDate}</span>
                            </div>
                        </div>
                    </div>

                )
            })}
            {userDetails.map((value)=>{
                return(
                    <div className="contactDetails">
                        <p>Seller details</p>
                        <p>{value.username}</p>
                        <p>{value.phone}</p>
                    </div>
                )
            })
           }
        </div>
    );
}

export default View;
