import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Home.css';

const CreateRoom = () => {
    const [roomID, setRoomID] = useState("")
    const [newRoomName, setNewRoomName] = useState("")
    const [canCreate, setCanCreate] = useState(false); // is true when valid inputs to create a room

    // initally the data will be null bc we haven't reached the server
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
    // useEffect runs once bc no deps in the list
    useEffect(() => {
        getRoomData()

    }, [])

    //Create Room with same params as the JSON
    const createRoom = () => {
        data[roomID] = {roomName: `${newRoomName}`,users:[]}
        
    }

    const addMyRoom = () => {
        createRoom() // since this edits our const data we can just use that in the POST req
        fetch('http://localhost:8000/Rooms', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        }).then(() => {
            console.log("added")
            navigate(`/room/${roomID}`)
        })

    }

    return (
        <div>
            <div className="form">
                <div className="title">Create a room</div>
                <div className="subtitle"></div>
                <div className="input-container ic1">
                    <input id="room" className="input" type="text" placeholder=" " 
                    onChange={(r)=>doesRoomExist(data,r.target.value,setCanCreate,setRoomID,setPlaceholderText)} />
                    <div className="cut"></div>
                    <label htmlFor="room" className={placeholderText}>Room ID</label>
                </div>
                <div className="input-container ic1">
                    <input id="roomName" className="input" type="text" placeholder=" " 
                    onChange={(r)=> setNewRoomName(r.target.value)} />
                    <div className="cut"></div>
                    <label htmlFor="roomName" className={placeholderText}>Room Name</label>
                </div>
                {!canCreate && <button type="text" className="submit" disabled >Create</button>}
                {canCreate && <button type="text" className="submit" onClick={() => addMyRoom()} >Create</button>}

                <br></br>
            </div>

        </div>
    );
}

// check and make sure room exist
function doesRoomExist(data, roomID, setCanCreate, setRoomID, setPlaceholderText) {
    setRoomID(roomID)
    console.log(roomID)
    if (data[roomID]) {
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