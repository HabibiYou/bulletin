import instagram_icon from './res/instagram_icon.png'
import twitter_icon from './res/twitter_icon.png'
import snapchat_icon from './res/snapchat-logo.svg'
import tiktok_icon from './res/tiktok_icon.webp'



import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';


import '../Room.css'
import { useEffect, useState } from "react";


const UserList = ({ users, socialMedias }) => {
    console.log(Object.keys(users).length)

    // used to determine what socials to show
    const [instagramStatus,setInstagramStatus] = useState(false)
    const [twitterStatus,setTwitterStatus] = useState(false)
    const [tiktokStatus,setTiktokStatus] = useState(false)
    const [snapchatStatus,setSnapchatStatus] = useState(false)

    useEffect(()=>{
        //get all the true
        if(socialMedias.instagram == true){
            setInstagramStatus(true)
        }
        if(socialMedias.twitter == true){
            setTwitterStatus(true)
        }
        if(socialMedias.tiktok == true){
            setTiktokStatus(true)
        }
        if(socialMedias.snapchat == true){
            setSnapchatStatus(true)
        }



    },[socialMedias]);

    // TODO make it so you need one thing in order to show ur tile
    return (
        <div>
                <div className="title-secondary">People</div>
            <div>
                <List>

                    {Object.entries(users).map(([id,user]) => (
                        
                        <div key={id}>
                            <ListItem className="listItem">
                                <ListItemText
                                    className='listItem-text'
                                    primary={user.name}
                                    secondary=''
                                />
                                {instagramStatus && user.instagram.length > 0 && <ListItemAvatar>
                                    <a href={makeIGLink(user.instagram)}>
                                        <Avatar className="icon" src={instagram_icon}></Avatar>
                                    </a>
                                </ListItemAvatar>}
                                {twitterStatus && user.twitter.length > 0 && <ListItemAvatar>
                                    <a href={makeTwitterLink(user.twitter)}>
                                        <Avatar className="icon" src={twitter_icon}></Avatar>
                                    </a>
                                </ListItemAvatar>}
                                {snapchatStatus && user.snapchat.length > 0 &&<ListItemAvatar>
                                    <a href={makeSnapchatLink(user.snapchat)}>
                                        <Avatar className="icon-small" src={snapchat_icon}></Avatar>
                                    </a>
                                </ListItemAvatar>}
                                {tiktokStatus && user.tiktok.length > 0 &&<ListItemAvatar>
                                    <a href={makeTiktokLink(user.tiktok)}>
                                        <Avatar className="icon" src={tiktok_icon}></Avatar>
                                    </a>
                                </ListItemAvatar>}
                            </ListItem>


                        </div>
                    ))}


                </List>

            </div>
        </div>
    );
}

function makeIGLink(ig) {
    return `https://www.instagram.com/${ig}/`
    // return `instagram://user?username=${ig}/`

}

function makeTwitterLink(t){
    return `https://twitter.com/${t}`
}

function makeSnapchatLink(t){
    return `https://snapchat.com/add/${t}`
}

function makeTiktokLink(t){
    return `https://www.tiktok.com/@${t}`
}



export default UserList;