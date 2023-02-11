import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

import './Room.css';
import UserList from './modules/UserList'

//newData is to keep track if we received something
// If a user comes to the link they will find all users
// if a user comes from join, we don't need to fetch
const Room = (newData = null) => {
    const { roomID } = useParams()
    const [users, setUsers] = useState(null);
    const [data, setData] = useState(null);

    const [room, setRoom] = useState("")



    useEffect(() => {
        console.log(newData.newData)
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
    }, []);

    return (
        <div>
            {users && <UserList users={users} />}
        </div>
    );
}

export default Room;