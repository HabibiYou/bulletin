import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import './Home.css';


const JoinRoom = () => {
    //get room id from url param
    const { roomID } = useParams()
    //Inital vals for the user info
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [ig, setIg] = useState("")
    const [twitter, setTwitter] = useState("")
    
    // initally the data will be null bc we havem't reached the server
    const [data, setData] = useState(null);

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

    //Create user with same params as the JSON
    const createUser = () => {
        const id = 5
        const first_name = firstName
        const last_name = lastName
        const instagram = ig
        const newUser = { id, first_name, last_name, instagram, twitter }
        return newUser
    }


    const addMeToRoom = () => {
        // add ourselves to the list
        if(allParamsFilled()){
            const newUser = createUser();
            data[roomID].push(newUser)
            fetch('http://localhost:8000/Rooms', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            }).then(() => {
                console.log("added")
                navigate(`/room/${roomID}`,
                {newData:data}
                )
            })
        }

    }

    //check to make sure inputs are valid
    function allParamsFilled() {
        if (firstName.length > 0 && lastName.length > 0 
            && ig.length > 0 && twitter.length > 0) {
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
                    <input id="instagram" className="input" type="text" placeholder=" " onChange={(i) => setIg(i.target.value)} />
                    <div className="cut cut-short"></div>
                    <label htmlFor="instagram" className="placeholder">Instagram</label>
                </div>
                <div className="input-container ic2">
                    <input id="twitter" className="input" type="text" placeholder=" " onChange={(i) => setTwitter(i.target.value)} />
                    <div className="cut cut-short"></div>
                    <label htmlFor="twitter" className="placeholder">Twitter</label>
                </div>
                {allParamsFilled() && <button type="text" className="submit" onClick={() => addMeToRoom()}>Join</button>}
                {!allParamsFilled() && <button type="text" className="submit" disabled >Join</button>}
                <br></br>
            </div>

        </div>

    );
}

export default JoinRoom;