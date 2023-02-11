import { useEffect, useState } from 'react'
import UserList from './modules/UserList';
import {useNavigate } from 'react-router-dom'
import './Home.css';

const Home = () => {

    const [users, setUsers] = useState(null);
    const [data, setData] = useState(null);
    const [canJoin, setCanJoin] = useState(false);

    const [room, setRoom] = useState("")

    const navigate = useNavigate();


    useEffect(() => {
        fetch('http://localhost:8000/Rooms')
            .then(res => {
                return res.json();
            })
            .then((data) => {
                setData(data);
            })
    }, []);




    return (
        <div>
            <div className="form">
                <div className="title">Welcome to Bulletin</div>
                <div className="subtitle">Join a room</div>
                <div className="input-container ic2">
                    <input id="room" className="input" type="text" onChange={r => doesRoomExist(data,r.target.value, setCanJoin, setRoom)} placeholder=" " />
                    <div className="cut cut-short"></div>
                    <label htmlFor="room" className="placeholder">Room Number</label>
                </div>
                {/* Disable Join Button unless they type in a good Room number */}
                {!canJoin && <button type="text" className="submit" disabled>Join</button>}
                {canJoin && <button type="text" className="submit" onClick={() => 
                
                    navigate(`/room/${room}/join`)}>Join</button>}

                <br></br>
            </div>

        </div>

    );
}

function doesRoomExist(data, room, setCanJoin, setRoom) {
    if (data[room]) {
        console.log("can join") 
        setCanJoin(true) }
    else { 
        console.log("cant join") 
        setCanJoin(false) }
    setRoom(room)
}



export default Home;