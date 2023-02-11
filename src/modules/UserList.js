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






        <div className="room">
            <List>

                {users.map((user, i) => (
                    <div key={i}>
                        <ListItem>
                        <ListItemText
                                primary={user.first_name +" "+  user.last_name}
                                secondary=''
                            />
                            <ListItemAvatar>
                            <a href={makeIGLink(user.instagram)}> 
                                <Avatar src={instagram_icon}></Avatar>
                                </a>                                        
                            </ListItemAvatar>
                            <ListItemAvatar>
                                
                                <a href={makeIGLink(user.instagram)}> 
                                <Avatar src={twitter_icon}></Avatar>
                                </a>                                
                                
                            </ListItemAvatar>
                        </ListItem>
                         

                    </div>
                ))}


            </List>






            {/* <h1>People</h1>
            <ListGroup className="itemList">
            {users.map((user,i) => (
                <div key= {i}>
                    {<ListGroup.Item >
                        {user.first_name} {user.last_name} <a href={makeIGLink(user.instagram)}> <img className = "icon" src={logo}></img></a>
                        </ListGroup.Item>}
                </div>
            ))}
            </ListGroup> */}


        </div>
    );
}

function makeIGLink(ig) {
    return `https://www.instagram.com/${ig}/`

}

export default UserList;