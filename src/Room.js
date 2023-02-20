import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import './Room.css';
import avatar from './modules/res/smile_face_icon.png'
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Button from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';
import UserList from './modules/UserList'

/*
Component for /room/roomID


*/

const Room = () => {

    const { roomID } = useParams() // gets the roomID from the URL ex: ...com/room/01932 roomID is 01932

    const [roomName, setRoomName] = useState(""); // the room name from the json
    const [copied, setCopied] = useState(false); // used to bring up the snackbar that says "u copied a link"
    const [users, setUsers] = useState(null); // the list of users  
    const [socialMedias, setSocialMedias] = useState([])

    const navigate = useNavigate();

    //This happens once in the beggining, because it happens 
    // after every dependency in the list changes, the list is empty as u see on line ~44
    useEffect(() => {
        //fetch from this link ...
        fetch('http://localhost:8000/Rooms')
            .then(res => {
                return res.json(); // ..return the result as a json 
            })
            .then((data) => { // .. takes the return as (data) from 2 lines up and 
                if (data.hasOwnProperty(roomID)) { // if the room exists then set the vars to be correct
                    setRoomName(data[roomID].roomName)
                    setUsers(data[roomID].users)
                    setSocialMedias(data[roomID].socials)
                }
                else { // if the room does not exist then navigate to the /room-not-found link
                    navigate(`/room-not-found`)
                }
            })

    }, []);

    //This is the function to copy strings to the keyboard
    const copy = async () => {
        console.log("copied")
        setCopied(true);
        await navigator.clipboard.writeText(roomID);
    }

    return (
        <div className='main_background'>

            <div className="title">
                Welcome
                <br></br>
                {roomName}
            </div>

            <Button size='small' onClick={() => copy()}>
                <div className="subtitle">
                    Room ID: {roomID}
                    <ContentCopyIcon className='copy_icon' />
                </div>
            </Button>

            {/* If the users exist and there is atleast one person,
             generate the users with the UserList component */}
            {users && users.length > 0 &&
                <UserList users={users} socialMedias = {socialMedias}/>}

            {/* If the users exist and there is no one,
             show the no one "no one is here yet" screen. */}
            {users && users.length === 0 &&
                <div className='listItem'>
                    <div className='center'>
                        <h2 >Nobody is here...</h2>
                        <h2 >yet!</h2>
                        <img className='avatar' src={avatar} />
                        <br></br>
                        <button type="text" className="add_me_button" onClick={() => navigate(`/room/${roomID}/join`)}>Add my social</button>
                    </div>
                </div>
            }
            {/* This is the pop up for when you copy the room id */}
            <Snackbar
                open={copied}
                autoHideDuration={1200}
                onClose={() => setCopied(false)}
                message="Copied Room Link!"
            />
        </div>
    );
}

export default Room;