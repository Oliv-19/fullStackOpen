import { useEffect, useState } from "react";
import UsersService from '../services/users'
export const Users = () => {
    const [allUsers, setAllUsers] = useState([]);
    const getUsers = async() => {
        const users = await UsersService.getAllUsers()
        setAllUsers(users)
    }
    useEffect(() => {
        getUsers();
    }, []);
    return (
    <>
        <h1>users</h1>
        <div style={{width:'150px',display:'flex', justifyContent:'space-between'}}>
            <p></p> 
            <p>Blogs created</p>
            </div>
        {allUsers.map((user) => (
            <div key={user.id} style={{width:'150px',display:'flex', justifyContent:'space-between'}}>
            <p>{user.username}</p> 
            <p>{user.blogs.length}</p>
            </div>
        ))}
    </>
    )
}