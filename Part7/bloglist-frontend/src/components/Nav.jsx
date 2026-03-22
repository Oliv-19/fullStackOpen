import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export const Nav = ({handleLogout}) => {
    const user = useSelector(state => state.user)
    return (
        <div style={{display:'flex', justifyContent: 'space-evenly', width:'500px', alignItems:'center'}}>
            <Link to='/'>blogs</Link> 
            <Link to='/users'>users</Link>
            <h4>
                {user.username} logged in
                <button onClick={handleLogout}>log out</button>
            </h4>
        </div>
    )
    
}