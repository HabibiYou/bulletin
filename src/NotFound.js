import { useNavigate } from 'react-router-dom'

const NotFound = () => {
    
    const navigate = useNavigate();

    return ( 
        <div className='main_background'>
            <div className='center'>
                <h2 className='title'>404 Error</h2>
                <h2 className='title'>Wrong code?</h2>
                
                <button type="text" className="add_me_button" onClick={()=>{navigate('/') }} >Main Menu</button>
            </div>
    </div>
     );
}
 
export default NotFound;