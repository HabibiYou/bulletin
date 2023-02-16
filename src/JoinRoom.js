import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Home.css';

const JoinRoom = () => {

    const [data, setData] = useState(null); // the entire set of data we need
    const [canJoin, setCanJoin] = useState(false); // are all the inputs valid for us to let them join

    const [placeholderText, setPlaceholderText] = useState("placeholder text notCorrect") // used to turn text from green to red

    const [roomID, setRoomID] = useState("") // the room id we will use

    const navigate = useNavigate(); // needed for navigation in reactJS


    // fetch the data from the json and set our data to it.
    useEffect(() => {
        fetch('http://localhost:8000/Rooms')
            .then(res => {
                return res.json();
            })
            .then((data) => {
                setData(data); // sets the const data as the new data we just got
            })
    }, []);




    return (
        
        <div className='body'>
            <div className="form">
                <div className="title text">Join a room</div>
                <div className="subtitle text"></div>
                <div className="input-container ic2">
                    {/* Everytime we change the room we want to check if it exists 
                    note: r.target.value just is the value of the string inside the input at the moment.
                    So basically everytime they type a new letter it will call this and update the roomID
                    */}
                    <input id="room" className="input" type="text" onChange={r => doesRoomExist(data, r.target.value, setCanJoin, setRoomID, setPlaceholderText)} placeholder=" " />
                    <div className="cut cut-short"></div>
                    <label htmlFor="room" className={placeholderText}>Room code</label>
                </div>
                {/* Disable Join Button unless they type in a good Room number */}
                {!canJoin && <button type="text" className="submit text" disabled>Join</button>}
                {canJoin && <button type="text" className="submit text" onClick={() =>

                    navigate(`/room/${roomID}/join`)}>Join</button>}

                <br></br>
            </div>
        </div>

    );
}

//This function is used to check whether a room exists
function doesRoomExist(data, roomID, setCanJoin, setRoomID, setPlaceholderText) {
    if (data[roomID]) {
        console.log("can join")
        setCanJoin(true)
        setPlaceholderText("placeholder correct") // This turns text greem
    }
    else {
        console.log("cant join")
        setCanJoin(false)
        setPlaceholderText("placeholder notCorrect") // this turns text red
    }
    setRoomID(roomID)
}



export default JoinRoom;