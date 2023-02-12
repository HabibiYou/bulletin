import UserItem from "./UserItem";
import ListGroup from 'react-bootstrap/ListGroup';
import instagram_icon from './res/instagram_icon.png'
import twitter_icon from './res/twitter_icon.png'
import avatar from './res/smile_face_icon.png'



import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';


import '../Room.css'


const UserList = ({ users }) => {
    return (
        <div>


            <div className="main_background">
                <List>

                    {users.map((user, i) => (
                        <div key={i}>
                            <ListItem className="listItem">
                                <ListItemText
                                    primary={user.first_name + " " + user.last_name}
                                    secondary=''
                                />
                                <ListItemAvatar>
                                    <a href={makeIGLink(user.instagram)}>
                                        <Avatar className="icon" src={instagram_icon}></Avatar>
                                    </a>
                                </ListItemAvatar>
                                <ListItemAvatar>
                                    <a href={makeTwitterLink(user.twitter)}>
                                        <Avatar className="icon" src={twitter_icon}></Avatar>
                                    </a>
                                </ListItemAvatar>
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

}

function makeTwitterLink(t){
    return `https://twitter.com/${t}`
}

export default UserList;