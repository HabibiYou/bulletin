import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Home from './Home';
import Room from './Room';
import JoinRoom from './JoinRoom';
import JoinRoomWithInfo from './JoinRoomWithInfo';
import CreateRoom from './CreateRoom';


function App() {



  return (
    <Router>
    <div>
      <Routes >
        <Route path ='/' element = {<Home />}></Route>
        <Route path ='/join' element = {<JoinRoom />}></Route>
        <Route path ='/create' element = {<CreateRoom />}></Route>
        <Route path ='/room/:roomID' element = {<Room />}></Route>
        <Route path ='/room/:roomID/join' element = {<JoinRoomWithInfo />}></Route>


      </Routes>

    </div>
    </Router>

  )

}



export default App;
