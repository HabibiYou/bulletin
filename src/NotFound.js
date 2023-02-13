import { useNavigate } from 'react-router-dom'

const NotFound = () => {
    
    const navigate = useNavigate();

    return ( 
        <div className='main_background'>
        <div className='listItem'>
            <div className='center'>
                <h2 >404 Error</h2>
                <h2 >Wrong code?</h2>
                
                <button type="text" className="add_me_button" onClick={()=>{navigate('/') }} >Main Menu</button>
            </div>
        </div>
    </div>
     );
}
 
export default NotFound;