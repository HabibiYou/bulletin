const UserItem = (firstName,lastName,instagram) => {
    var igLink = `https://www.instagram.com/${instagram}/`
    return (  
        <div>
            <label>{firstName}</label>
            <label>{lastName}</label>
            <a href = {igLink}>Instagram</a>
        </div>
    );
}
 
export default UserItem ;