import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import './Room.css';
import avatar from './modules/res/smile_face_icon.png'
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Button from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';
import UserList from './modules/UserList'

//newData is to keep track if we received something
//  If a user comes to the link they will find all users
//  if a user comes from join, we don't need to fetch
const Room = () => {
    const { roomID } = useParams()
    const [roomName, setRoomName] = useState("");
    const [copied, setCopied] = useState(false);
    const [users, setUsers] = useState(null);
    const [data, setData] = useState(null);

    const navigate = useNavigate();


    useEffect(() => {
        fetch('http://localhost:8000/Rooms')
            .then(res => {
                return res.json();
            })
            .then((data) => {
                setData(data);
                if (data.hasOwnProperty(roomID)) {
                    setRoomName(data[roomID].roomName)
                    setUsers(data[roomID].users)

                }

                
            })

    }, []);

    useEffect(() => {
        if (data && !data.hasOwnProperty(roomID)) {
            navigate(`/room-not-found`)
        }

    }, [data])


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

            {users && users.length > 0 && <UserList users={users} />}

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