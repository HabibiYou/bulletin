import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Home.css';

import { db } from "./firebase/firebase"
import { onValue, ref } from "firebase/database";

const JoinRoom = () => {

    const [canJoin, setCanJoin] = useState(false); // are all the inputs valid for us to let them join

    const [placeholderText, setPlaceholderText] = useState("placeholder idle") // used to turn text from green to red

    const [roomID, setRoomID] = useState("") // the room id we will use

    const navigate = useNavigate(); // needed for navigation in reactJS




    //This checks if roomExists and sets up the screen accordingly
    const getRoomData = () => {
        onValue(ref(db), (snapshot) => {
            const snapshotData = snapshot.val();
            //If there is no data means there are no rooms at all
            if (snapshotData !== null) {
                //if it has the roomID set the data as the data in roomID
                if (snapshotData.hasOwnProperty(roomID.toLowerCase())) {
                    setCanJoin(true);
                    setPlaceholderText("placeholder correct"); // This turns text green

                }
                else {
                    setCanJoin(false);
                    setPlaceholderText("placeholder idle"); // this turns text red
                }
            }
        });
    }
    // fetch the data from the json and set our data to it.
    // every time the roomid changes we will update getRoomData
    useEffect(() => {
        getRoomData();
    }, [roomID]);




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
                    <input id="room" className="input" type="text" onChange={r => setRoomID(r.target.value.toLowerCase())} placeholder=" "  pattern="[a-zA-Z0-9]+"/>
                    <div className="cut cut-long"></div>
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


export default JoinRoom;