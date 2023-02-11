import UserItem from "./UserItem";
import ListGroup from 'react-bootstrap/ListGroup';
import logo from './res/instagram_icon.png'


const UserList = ({ users }) => {
    return (
        <div className="room">
            <h1>People</h1>
            {users.map((user) => (
                <div >

                    {
                    <ListGroup key = {user.id}>
                        <ListGroup.Item>{user.first_name} {user.last_name} <a href={makeIGLink(user.instagram)}> <img src={logo}></img></a></ListGroup.Item>
                    </ListGroup>
                    }
                </div>
            ))}


        </div>
    );
}

function makeIGLink(ig) {
    return `https://www.instagram.com/${ig}/`

}

export default UserList;