import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Home from './Home';
import Room from './Room';
import JoinRoom from './JoinRoom';

function App() {



  return (
    <Router>
    <div>
      <Routes >
        <Route path ='/' element = {<Home />}></Route>
        <Route path ='/room/:roomID' element = {<Room />}></Route>
        <Route path ='/room/:roomID/join' element = {<JoinRoom />}></Route>


      </Routes>

    </div>
    </Router>

  )

}



export default App;
