import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { IconButton, FormControl, FormControlLabel, FormLabel, FormGroup, FormHelperText, Checkbox, Box } from '@mui/material';
import TipsAndUpdatesOutlinedIcon from '@mui/icons-material/TipsAndUpdatesOutlined';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { db } from "./firebase/firebase"
import { set, ref, onValue } from "firebase/database"

import './Home.css';

const CreateRoom = () => {
    const [roomID, setRoomID] = useState("")
    const [newRoomName, setNewRoomName] = useState("")

    //Socials

    //Social list to see how many they checked
    const [socialstate, setSocialState] = useState({
        instagram: false,
        twitter: false,
        tiktok: false,
        snapchat: false,
    });


    //states for social errors
    const [maxSocialsError, setMaxSocialsError] = useState(false)
    const [minSocialsError, setMinSocialsError] = useState(true)

    //states for each social check
    const { instagram, twitter, tiktok, snapchat } = socialstate

    // is true when valid inputs to create a room
    const [canCreate, setCanCreate] = useState(false);

    // initally the data will be null bc we haven't reached the server
    const [data, setData] = useState(null);

    //this is for roomID error
    const [placeholderText, setPlaceholderText] = useState("placeholder text idle")

    const navigate = useNavigate();


    //updates data
    const getRoomData = () => {
        onValue(ref(db), (snapshot) => {
            const snapshotData = snapshot.val();
            if (snapshotData !== null) {
                setData(snapshotData)

            }

        });
    }

    //GET ROOM DATA AS SOON AS WE INIT
    // useEffect runs once bc no deps in the list
    useEffect(() => {
        getRoomData()

    }, [])

    // check and make sure room exist and is valid
    // change colors of roomID as necesarry 
    useEffect(() => {
        if (roomID.length < 6 || (data && data[roomID])) {
            setPlaceholderText("placeholder idle")
        }
        else {
            setPlaceholderText("placeholder correct")
        }
    }, [roomID])

    // check all params and make sure it is valid
    useEffect(() => {
        if (roomID.length < 6 || (data && data[roomID]) || minSocialsError == true || maxSocialsError == true) {
            setCanCreate(false)
        }
        else {
            setCanCreate(true)
        }

    }, [roomID, minSocialsError, maxSocialsError])



    useEffect(() => {
        const totalChecked = [instagram, twitter, tiktok, snapchat].filter((v) => v).length
        if (totalChecked == 0) {
            //Need atleast one
            setMinSocialsError(true)
            setMaxSocialsError(false)
        }
        else if (totalChecked > 3) {
            setMinSocialsError(false)
            setMaxSocialsError(true)

        }
        else {
            setMinSocialsError(false)
            setMaxSocialsError(false)
        }
    }, [socialstate])

    // check for checkbox validation 

    const handleChecked = (event) => {
        setSocialState({
            ...socialstate,
            [event.target.name]: event.target.checked,
        });
    };


    //Create Room with same params as the JSON
    const createRoom = () => {
        // data[roomID] = { roomName: `${newRoomName}`, socials:{instagram:instagram,snapchat:snapchat, twitter:twitter, tiktok:tiktok }, users: [] }
        return { roomName: `${newRoomName}`, socials: { instagram: instagram, snapchat: snapchat, twitter: twitter, tiktok: tiktok }, users: [] }
    }


    // function to generate an id for the room if user does not want to do it
    const generateID = () => {
        const validChars = 'abcdefghijklmnopqrstuvwxyz1234567890';
        const charactersLength = validChars.length;
        let newCode = '';

        while (newCode == '' || (data && data.hasOwnProperty(newCode))) {
            newCode = '';
            for (let i = 0; i < 7; i++) {
                newCode += validChars.charAt(Math.floor(Math.random() * charactersLength));
            }
        }
        setRoomID(newCode);

    }

    const addMyRoom = () => {
        //create
        const r = createRoom()
        set(ref(db, `${roomID.toLowerCase()}`), r)
        navigate(`/room/${roomID}`)
    }

    return (
        <div>
            <div className="form">
                <IconButton onClick={()=>{navigate(`/`)}}>
                    <ArrowBackIcon className='back-button' />
                </IconButton>

                <div className="title">Create a room</div>
                <div className="subtitle"></div>
                <div className="input-container ic1">
                    <input id="room" className="input" type="text" placeholder=" " value={roomID}
                        onChange={(r) => setRoomID(r.target.value)} pattern="[a-zA-Z0-9]+" />
                    <div className="cut cut-mid"></div>
                    <label htmlFor="room" className={placeholderText}>Room ID</label>
                </div>
                <div className='center'>
                    <IconButton color="primary" aria-label="generate room id" onClick={() => generateID()} className='iconButton'>
                        <TipsAndUpdatesOutlinedIcon />
                    </IconButton>
                </div>
                <div className="input-container ic1">
                    <input id="roomName" className="input" type="text" placeholder=" "
                        onChange={(r) => setNewRoomName(r.target.value)} />
                    <div className="cut cut-long"></div>
                    <label htmlFor="roomName" className='placeholder idle'>Room Name</label>
                </div>
                <br></br>

                <Box sx={{ display: 'flex' }}>
                    <FormControl component="fieldset" variant="standard">
                        <div className="subtitle">Social options</div>
                        <FormGroup>
                            <FormControlLabel
                                control={
                                    <Checkbox name="instagram" checked={instagram} onChange={handleChecked} className="checkbox" />
                                }
                                label="Instagram"
                                className='form_item_text'
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox name="twitter" checked={twitter} onChange={handleChecked} className="checkbox" />
                                }
                                label="Twitter"
                                className='form_item_text'
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox name="tiktok" checked={tiktok} onChange={handleChecked} className="checkbox" />
                                }
                                label="TikTok"
                                className='form_item_text'
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox name="snapchat" checked={snapchat} onChange={handleChecked} className="checkbox" />
                                }
                                label="Snapchat"
                                className='form_item_text'
                            />
                        </FormGroup>
                        {minSocialsError &&
                            <FormHelperText className="form_helper_text_incorrect" >1 Choice Minimum!</FormHelperText>}
                        {maxSocialsError &&
                            <FormHelperText className="form_helper_text_incorrect">3 Choice Maximum</FormHelperText>
                        }



                    </FormControl>


                </Box>

                <br></br>
                {!canCreate && <button type="text" className="submit" disabled >Create</button>}
                {canCreate && <button type="text" className="submit" onClick={() => addMyRoom()} >Create</button>}


            </div>

        </div>
    );
}

export default CreateRoom;