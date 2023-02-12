import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import './Room.css';
import avatar from './modules/res/smile_face_icon.png'

import UserList from './modules/UserList'

//newData is to keep track if we received something
//  If a user comes to the link they will find all users
//  if a user comes from join, we don't need to fetch
const Room = (newData = null) => {
    const { roomID } = useParams()
    const [users, setUsers] = useState(null);
    const [data, setData] = useState(null);

    const navigate = useNavigate();


    useEffect(() => {
        //Check if we already have data to optimize fetching again
        if (newData.newData == null) {
            fetch('http://localhost:8000/Rooms')
                .then(res => {
                    return res.json();
                })
                .then((data) => {
                    setData(data);
                    setUsers(data[roomID])
                })
        }
        else{
            setUsers(data)
        }
    }, []);

    return (
        <div className='main_background'>
            {users && users.length > 0 && <UserList users={users} />}

            {users && users.length ==0 &&
            <div className='listItem'>
                <div className='center'>
                    <h2 >Nobody is here...</h2>
                    <h2 >yet!</h2>
                    <img className='avatar' src={avatar}/>
                    <br></br>
                    <button type="text" className="add_me_button" onClick={() => navigate(`/room/${roomID}/join`)}>Add my social</button>
                </div>
            </div>
            }
        </div>
    );
}

export default Room;