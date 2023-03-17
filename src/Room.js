import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import './Room.css';
import avatar from './modules/res/smile_face_icon.png'
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Button, Snackbar,CircularProgress, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import UserList from './modules/UserList'

import { db } from "./firebase/firebase"
import { onValue, ref } from "firebase/database";

import { getAuth, signInAnonymously } from "firebase/auth"




/*
Component for /room/roomID


*/

const Room = () => {

    const urlLink = "https://whatsyoursocial-bc1f4.web.app/"

    const { roomID } = useParams() // gets the roomID from the URL ex: ...com/room/01932 roomID is 01932

    const [roomName, setRoomName] = useState(""); // the room name from the json
    const [copied, setCopied] = useState(false); // used to bring up the snackbar that says "u copied a link"
    const [users, setUsers] = useState(null); // the list of users  
    const [socialMedias, setSocialMedias] = useState([])

    const [authenticated, setAuthenticated] = useState(false)


    const navigate = useNavigate();

    // make sure they authenticated
    const auth = getAuth();
    signInAnonymously(auth)

    useEffect(()=>{
        auth.onAuthStateChanged((user) => {
            if (user) {
                setAuthenticated(true)
                console.log("authenticated")
    
            }
    
        });

    },[]);


    const getRoomData = () => {
        if (authenticated) {
            onValue(ref(db), (snapshot) => {
                const snapshotData = snapshot.val();
                const data = snapshotData[roomID]
                if (data) {
                    if (data.hasOwnProperty("users")) {
                        setUsers(data.users)
                    }
                    setSocialMedias(data.socials)
                    setRoomName(data.roomName)
                }
                else {
                    navigate(`/room-not-found`)

                }

            });
        }
    }

    //This happens once in the beggining, because it happens 
    // after every dependency in the list changes, the list is empty as u see on line ~44
    useEffect(() => {
        getRoomData()

    }, [authenticated]);

    //This is the function to copy strings to the keyboard
    const copy = async () => {
        console.log("copied")
        setCopied(true);
        await navigator.clipboard.writeText(urlLink + `${roomID}/join`);
    }

    return (
        <div>
            <div className='main_background'>
                <IconButton onClick={() => { navigate(`/`) }}>
                    <ArrowBackIcon className='back-button' />
                </IconButton>

                {!authenticated &&
                    <div className='loading_container'>
                        <CircularProgress className='loading_indicator' />
                    </div>}
                {authenticated &&
                    <div>
                        <div className="title">
                            Welcome
                            <br></br>
                            {roomName}
                        </div>
                        <div className='share-button'>
                            <Button size='small' onClick={() => copy()}>
                                <div className="share-button-text">
                                    Room ID: {roomID}
                                    {/* <ContentCopyIcon className='copy_icon' /> */}
                                </div>
                            </Button>
                        </div>
                        {/* If the users exist and there is atleast one person,
                        generate the users with the UserList component */}
                        {users && Object.keys(users).length > 0 &&
                            <UserList users={users} socialMedias={socialMedias} />}

                        {/* If the users exist and there is no one,
                         show the no one "no one is here yet" screen. */}
                        {!users &&
                            <div className='center'>
                                <h2 className='title'>Nobody is here...<br></br>yet 😋</h2>
                                <button type="text" className="add_me_button" onClick={() => navigate(`/${roomID}/join`)}>Add my social</button>
                            </div>
                        }
                        {/* This is the pop up for when you copy the room id */}
                        <Snackbar
                            open={copied}
                            autoHideDuration={1200}
                            onClose={() => setCopied(false)}
                            message="Copied Room Link!"
                        />

                    </div>}

            </div>
        </div>
    );
}

export default Room;