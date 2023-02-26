import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Home.css';

//Home menu 
const Home = () => {
    const navigate = useNavigate();
    return (
        <div className='body'>
            <div className="form">
                <div className="title text">What's your social?</div>
                <button type="text" className="submit text" onClick={() => navigate(`/join`)}>Join</button>
                <button type="text" className="submit text" onClick={() => navigate(`/create`)}>Create a room</button>
                <br></br>
            </div>
        </div>

    );
}



export default Home;