import {useParams} from 'react-router-dom'
import { useEffect, useState } from 'react'

import './Room.css';
import UserList from './modules/UserList'

const Room = () => {
    const {roomID} = useParams()
    const [users, setUsers] = useState(null);
    const [data, setData] = useState(null);

    const [room, setRoom] = useState("")

    

    useEffect(() => {
        fetch('http://localhost:8000/Rooms')
            .then(res => {
                return res.json();
            })
            .then((data) => {
                setData(data);
                setUsers(data[roomID])
            })
    }, []);

    // console.log(typeof(users))
    // console.log(users)



    
    return ( 
        <div>
            {users && <UserList users = {users} />}
        </div>
     );
}
 
export default Room;