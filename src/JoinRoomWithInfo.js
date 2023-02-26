import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button';

import { db } from "./firebase/firebase"

import { onValue, ref, push, set } from "firebase/database";


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

    const navigate = useNavigate();

    //updates data
    const getRoomData = () => {
        onValue(ref(db), (snapshot) => {
            const snapshotData = snapshot.val();
            if (snapshotData !== null) {
                if (snapshotData.hasOwnProperty(roomID)) {
                    setSocialMedias(snapshotData[roomID].socials)
                }
                else {
                    navigate(`/room-not-found`)
                }
                setSocialMedias(snapshotData[roomID].socials)
            }

        });
    }

    //GET ROOM DATA AS SOON AS WE INIT
    useEffect(() => {
        getRoomData()

    }, [])

    //only show the social media inputs we need
    useEffect(() => {
        //get all the true
        if (socialMedias.instagram === true) {
            setInstagram(true)
        }
        if (socialMedias.twitter === true) {
            setTwitter(true)
        }
        if (socialMedias.tiktok === true) {
            setTiktok(true)
        }
        if (socialMedias.snapchat === true) {
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
            const currentRoomData = ref(db, `${roomID}/users`);
            const newRoomData = push(currentRoomData);
            set(newRoomData, newUser);
            navigate(`/room/${roomID}`)
        }

    }

    //check to make sure inputs are valid
    function allParamsFilled() {
        if (name.length > 0) {
            return true
        }
        else { return false }
    }


    return (
        <div className='body'>
            <div className="form">
                <div className="subtitle">Create a profile</div>
                <div className="input-container ic1">
                    <input id="name" className="input" type="text" placeholder=" " onChange={(i) => setName(i.target.value)} />
                    <div className="cut cut-short"></div>
                    <label htmlFor="name" className="placeholder idle">Name</label>
                </div>
                {socialMedias.instagram && <div className="input-container ic2">
                    <input id="instagram" className="input" type="text" placeholder=" " onChange={(i) => setInstagram(i.target.value)} />
                    <div className="cut cut-mid"></div>
                    <label htmlFor="instagram" className="placeholder idle">Instagram</label>
                </div>}
                {socialMedias.twitter && <div className="input-container ic2">
                    <input id="twitter" className="input" type="text" placeholder=" " onChange={(i) => setTwitter(i.target.value)} />
                    <div className="cut cut-mid"></div>
                    <label htmlFor="twitter" className="placeholder idle">Twitter</label>
                </div>}
                {socialMedias.snapchat && <div className="input-container ic2">
                    <input id="snapchat" className="input" type="text" placeholder=" " onChange={(i) => setSnapchat(i.target.value)} />
                    <div className="cut cut-mid"></div>
                    <label htmlFor="snapchat" className="placeholder idle">Snapchat</label>
                </div>}
                {socialMedias.tiktok && <div className="input-container ic2">
                    <input id="tiktok" className="input" type="text" placeholder=" " onChange={(i) => setTiktok(i.target.value)} />
                    <div className="cut cut-short"></div>
                    <label htmlFor="tiktok" className="placeholder idle">Tiktok</label>
                </div>}
                {allParamsFilled() && <button type="text" className="submit" onClick={() => addMeToRoom()}>Join</button>}
                {!allParamsFilled() && <button type="text" className="submit" disabled >Join</button>}
                <div className='center'>
                    <Button variant="text" className='skip_button' onClick={() => navigate(`/room/${roomID}`)}>Join without adding</Button>
                </div>
            </div>
        </div>

    );
}

export default JoinRoomWithInfo;