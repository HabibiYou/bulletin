import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
// import {getAuth,signInAnonymously } from "firebase/auth"
import './Home.css';

//Home menu 
const Home = () => {
    const navigate = useNavigate();
    //make sure they authenticated
    // const auth = getAuth();
    // signInAnonymously(auth);
    return (
        <div className='body'>
            <head>
                <meta property="og:title" content="Yo, add me!" />
                <meta property="og:type" content="website" />
                {/* CHANGE URL LINNK HERE */}
                <meta property="og:image" content="./modules/res/YoAddMeLogo.png" />
                <meta property="og:url" content="https://whatsyoursocial-bc1f4.web.app/" />
            </head>
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