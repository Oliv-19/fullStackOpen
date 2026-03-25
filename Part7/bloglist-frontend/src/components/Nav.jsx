import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button, Table } from "react-bootstrap";

export const Nav = ({handleLogout}) => {
    const user = useSelector(state => state.user)
    return (
        <Table >
            <tbody>
                <tr >
                    <td><h2>Blog app</h2></td>
                    <td><Link to='/'>blogs</Link> </td>
                    <td><Link to='/users'>users</Link></td>
                    <td>
                        <h4>
                            {user? `${user.username} logged in `: ''} 
                            <Button onClick={handleLogout}>log out</Button>
                        </h4>
                    </td>
                </tr>
        </tbody>
        </Table>
    )
    
}