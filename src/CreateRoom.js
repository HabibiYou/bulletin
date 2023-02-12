import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import './Home.css';

const CreateRoom = () => {


    const [room, setRoom] = useState("")
    const [canCreate, setCanCreate] = useState(false);

    // initally the data will be null bc we havem't reached the server
    const [data, setData] = useState(null);

    const [placeholderText, setPlaceholderText] = useState("placeholder text notCorrect")

    const navigate = useNavigate();


    //updates data
    const getRoomData = () => {
        // get all the data
        fetch('http://localhost:8000/Rooms')
            .then(res => {
                return res.json();
            })
            .then((d) => {
                setData(d)
            })
    }

    //GET ROOM DATA AS SOON AS WE INIT
    useEffect(() => {
        getRoomData()

    }, [])

    //Create Room with same params as the JSON
    const createRoom = () => {
        const newRoom = { room: [] }
        return newRoom
    }

    const addMyRoom = () => {
        data[room] = []
        fetch('http://localhost:8000/Rooms', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        }).then(() => {
            console.log("added")
            navigate(`/room/${room}`,
                { newData: data }
            )
        })

    }

    return (
        <div>
            <div className="form">
                <div className="title">Create a room</div>
                <div className="subtitle"></div>
                <div className="input-container ic1">
                    <input id="room" className="input" type="text" placeholder=" " 
                    onChange={(r)=>doesRoomExist(data,r.target.value,setCanCreate,setRoom,setPlaceholderText)} />
                    <div className="cut"></div>
                    <label htmlFor="room" className={placeholderText}>Room ID</label>
                </div>
                {!canCreate && <button type="text" className="submit" disabled >Create</button>}
                {canCreate && <button type="text" className="submit" onClick={() => addMyRoom()} >Create</button>}

                <br></br>
            </div>

        </div>
    );
}

function doesRoomExist(data, room, setCanCreate, setRoom, setPlaceholderText) {
    setRoom(room)
    console.log(room)
    if (data[room]) {
        console.log("cant create")
        setCanCreate(false)
        // TODO will need to move these Text functions to a different function to check if valid
        setPlaceholderText("placeholder notCorrect")
    }
    else {
        console.log("can create")
        setCanCreate(true)
        setPlaceholderText("placeholder correct")
    }
    
}

export default CreateRoom;