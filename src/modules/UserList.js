import UserItem from "./UserItem";
import ListGroup from 'react-bootstrap/ListGroup';
import logo from './res/instagram_icon.png'


const UserList = ({ users }) => {
    return (
        <div className="room">
            <h1>People</h1>
            <ListGroup>
            {users.map((user,i) => (
                <div key= {i}>
                    {<ListGroup.Item >{user.first_name} {user.last_name} <a href={makeIGLink(user.instagram)}> <img src={logo}></img></a></ListGroup.Item>}
                </div>
            ))}
            </ListGroup>


        </div>
    );
}

function makeIGLink(ig) {
    return `https://www.instagram.com/${ig}/`

}

export default UserList;