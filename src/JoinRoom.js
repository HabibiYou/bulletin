import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Home.css';

const JoinRoom = () => {

    const [data, setData] = useState(null);
    const [canJoin, setCanJoin] = useState(false);

    const [placeholderText, setPlaceholderText] = useState("placeholder text notCorrect")

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
        <div className='body'>
            <div className="form">
                <div className="title text">Join a room</div>
                {/* <div className="subtitle text">Join a room</div> */}
                <div className="input-container ic2">
                    <input id="room" className="input" type="text" onChange={r => doesRoomExist(data, r.target.value, setCanJoin, setRoom, setPlaceholderText)} placeholder=" " />
                    <div className="cut cut-short"></div>
                    <label htmlFor="room" className={placeholderText}>Room code</label>
                </div>
                {/* Disable Join Button unless they type in a good Room number */}
                {!canJoin && <button type="text" className="submit text" disabled>Join</button>}
                {canJoin && <button type="text" className="submit text" onClick={() =>

                    navigate(`/room/${room}/join`)}>Join</button>}

                <br></br>
            </div>
        </div>

    );
}

function doesRoomExist(data, room, setCanJoin, setRoom, setPlaceholderText) {
    if (data[room]) {
        console.log("can join")
        setCanJoin(true)
        setPlaceholderText("placeholder correct")
    }
    else {
        console.log("cant join")
        setCanJoin(false)
        setPlaceholderText("placeholder notCorrect")
    }
    setRoom(room)
}



export default JoinRoom;