import React, {useContext, useEffect, useState} from 'react';
import {getDocs, collection} from 'firebase/firestore'

import Heart from '../../assets/Heart';
import './Post.css';
import {FirebaseContext} from "../../Firebase/Context";
import {PostContext} from "../Context/Post Context";
import {useHistory} from "react-router-dom";

function Posts() {

    const [products, setProducts] = useState([])

    const {postDetails,setPostDetails}=useContext(PostContext)

    const {db} = useContext(FirebaseContext)

    const history=useHistory()


    useEffect(() => {
        const collectionRef = collection(db, "products")
        getDocs(collectionRef).then((response) => {
            const product=response.docs.map((obj) => ({...obj.data(), id: obj.id}))
            setProducts(product)
        })
    }, [])

    return (
        <div className="postParentDiv">
            <div className="moreView">
                <div className="heading">
                    <span>Quick Menu</span>
                    <span>View more</span>
                </div>
                <div className="cards">
                    {products.map((value, key) => {
                        return (
                            <div key={key} className="card" onClick={()=> {
                                setPostDetails(products)
                                console.log(postDetails)
                                history.push('/view')
                            }}>
                                <div className="favorite">
                                    <Heart/>
                                </div>
                                <div className="image">
                                    <img src={value.url} alt=""/>
                                </div>
                                <div className="content">
                                    <p className="rate">&#x20B9; {value.price}</p>
                                    <span className="kilometer">{value.category}</span>
                                    <p className="name"> {value.name}</p>
                                </div>
                                <div className="date">
                                    <span>{value.createdDate}</span>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className="recommendations">
                <div className="heading">
                    <span>Fresh recommendations</span>
                </div>
                <div className="cards">
                    <div className="card">
                        <div className="favorite">
                            <Heart></Heart>
                        </div>
                        <div className="image">
                            <img src="../../../Images/R15V3.jpg" alt=""/>
                        </div>
                        <div className="content">
                            <p className="rate">&#x20B9; 250000</p>
                            <span className="kilometer">Two Wheeler</span>
                            <p className="name"> YAMAHA R15V3</p>
                        </div>
                        <div className="date">
                            <span>10/5/2021</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Posts;
