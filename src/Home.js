import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {getAuth,signInAnonymously } from "firebase/auth"
import './Home.css';

//Home menu 
const Home = () => {
    const navigate = useNavigate();
    // make sure they authenticated
    const auth = getAuth();
    auth.onAuthStateChanged((user)=>{
        if(user){
            console.log("already authenticated",auth.currentUser.uid)

        }
        else{
            signInAnonymously(auth)
        }

    });
    





    return (
        <div className='body'>
            <div className="form">
                <div className="title-main">Yo, add me!</div>
                <br></br>
                <div className="subtitle-main">Connecting groups faster than ever!</div>
                <button type="text" className="submit" onClick={() => navigate(`/join`)}>Join</button>
                <button type="text" className="submit" onClick={() => navigate(`/create`)}>Create a room</button>
                <br></br>
            </div>
        </div>

    );
}



export default Home;