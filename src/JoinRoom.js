import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import './Home.css';


const JoinRoom = () => {
    const { roomID } = useParams()

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [ig, setIg] = useState("")


    const [users, setUsers] = useState(null);
    const [data, setData] = useState(null);
    const [canJoin, setCanJoin] = useState(false);

    const [room, setRoom] = useState("")

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
                    console.log(data)
                })
    }

    //GET ROOM DATA AS SOON AS WE INIT
    useEffect(() => {
        getRoomData()

    }, [])

    const createUser = () => {
        const newId = "user11234"
        const newUser = { newId, firstName, lastName, ig }
        return newUser
    }


    const addMeToRoom = () => {
        const newUser = createUser();
        // add ourselves to the list
        data[roomID].push(newUser)
        fetch('http://localhost:8000/Rooms', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        }).then(() => {
            console.log("added")
            navigate(`/room/${roomID}`)
        })
    }

    function allParamsFilled() {
        console.log(firstName, lastName, ig)
        if (firstName.length > 0 && lastName.length > 0 && ig.length > 0) {
            console.log(true)
            return true
        }
        else { return false }
    }


    return (
        <div>
            <div className="form">
                <div className="title">Welcome to Bulletin</div>
                <div className="subtitle">Enter Socials</div>
                <div className="input-container ic1">
                    <input id="firstname" className="input" type="text" placeholder=" " onChange={(i) => setFirstName(i.target.value)} />
                    <div className="cut"></div>
                    <label htmlFor="firstname" className="placeholder">First name</label>
                </div>
                <div className="input-container ic2">
                    <input id="lastname" className="input" type="text" placeholder=" " onChange={(i) => setLastName(i.target.value)} />
                    <div className="cut"></div>
                    <label htmlFor="lastname" className="placeholder">Last name</label>
                </div>
                <div className="input-container ic2">
                    <input id="email" className="input" type="text" placeholder=" " onChange={(i) => setIg(i.target.value)} />
                    <div className="cut cut-short"></div>
                    <label htmlFor="email" className="placeholder">Instagram</label>
                </div>
                <button type="text" className="submit" onClick={() => addMeToRoom()}>Join</button>

                <br></br>
            </div>

        </div>

    );
}

export default JoinRoom;