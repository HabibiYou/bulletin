import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button';


import './Home.css';


const JoinRoomWithInfo = () => {
    //get room id from url param
    const { roomID } = useParams()
    //Inital vals for the user info
    const [name, setName] = useState("")
    //socials
    const [instagram, setInstagram] = useState("")
    const [twitter, setTwitter] = useState("")
    const [snapchat, setSnapchat] = useState("")
    const [tiktok, setTiktok] = useState("")

    const [socialMedias, setSocialMedias] = useState([])


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
                setSocialMedias(d[roomID].socials)
            })
    }

    //GET ROOM DATA AS SOON AS WE INIT
    useEffect(() => {
        getRoomData()

    }, [])

    //only show the social media inputs we need
    useEffect(() => {
        console.log(socialMedias)
        //get all the true
        if (socialMedias.instagram == true) {
            setInstagram(true)
        }
        if (socialMedias.twitter == true) {
            setTwitter(true)
        }
        if (socialMedias.tiktok == true) {
            setTiktok(true)
        }
        if (socialMedias.snapchat == true) {
            setSnapchat(true)
        }



    }, [socialMedias]);

    //Create user with same params as the JSON
    const createUser = () => {
        const id = 5
        const newUser = { id, name, instagram, twitter, snapchat, tiktok }
        return newUser
    }


    const addMeToRoom = () => {
        // add ourselves to the list
        if (allParamsFilled()) {
            const newUser = createUser();
            data[roomID].users.push(newUser)
            fetch('http://localhost:8000/Rooms', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            }).then(() => {
                console.log("added with ", data)
                //TODO fix optimization
                navigate(`/room/${roomID}`)
            })
        }

    }

    //check to make sure inputs are valid
    function allParamsFilled() {
        if (name.length > 0) {
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
                    <input id="name" className="input" type="text" placeholder=" " onChange={(i) => setName(i.target.value)} />
                    <div className="cut"></div>
                    <label htmlFor="name" className="placeholder">Name</label>
                </div>
                {instagram && <div className="input-container ic2">
                    <input id="instagram" className="input" type="text" placeholder=" " onChange={(i) => setInstagram(i.target.value)} />
                    <div className="cut cut-short"></div>
                    <label htmlFor="instagram" className="placeholder">Instagram</label>
                </div>}
                {twitter && <div className="input-container ic2">
                    <input id="twitter" className="input" type="text" placeholder=" " onChange={(i) => setTwitter(i.target.value)} />
                    <div className="cut cut-short"></div>
                    <label htmlFor="twitter" className="placeholder">Twitter</label>
                </div>}
                {snapchat && <div className="input-container ic2">
                    <input id="snapchat" className="input" type="text" placeholder=" " onChange={(i) => setSnapchat(i.target.value)} />
                    <div className="cut cut-short"></div>
                    <label htmlFor="snapchat" className="placeholder">Snapchat</label>
                </div>}
                {tiktok && <div className="input-container ic2">
                    <input id="tiktok" className="input" type="text" placeholder=" " onChange={(i) => setTiktok(i.target.value)} />
                    <div className="cut cut-short"></div>
                    <label htmlFor="tiktok" className="placeholder">Tiktok</label>
                </div>}
                {allParamsFilled() && <button type="text" className="submit" onClick={() => addMeToRoom()}>Join</button>}
                {!allParamsFilled() && <button type="text" className="submit" disabled >Join</button>}
                <div className='center'>
                    <Button variant="text" className='skip_button' onClick={() => navigate(`/room/${roomID}`)}>Join without adding</Button>
                </div>
                <br></br>
            </div>

        </div>

    );
}

export default JoinRoomWithInfo;