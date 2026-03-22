import { useEffect, useState } from "react";
import UsersService from '../services/users'
import { Link } from "react-router-dom";

export const Users = () => {
    const [allUsers, setAllUsers] = useState([]);
    useEffect(()=> {
        const getUsers = async() => {
            const users = await UsersService.getAllUsers()
            setAllUsers(users)
        }
        getUsers()
    },[])
    if(!allUsers){
        return (
            <div>loading...</div>
        )
    }else{
       return (
        <>
            <h1>users</h1>
            <div style={{width:'150px',display:'flex', justifyContent:'space-between'}}>
                <p></p> 
                <p>Blogs created</p>
                </div>
            {allUsers.map((user) => (
                <div key={user.id} style={{width:'150px',display:'flex', justifyContent:'space-between'}}>
                <Link to={`/users/${user.id}`}>{user.username}</Link> 
                <p>{user.blogs.length}</p>
                </div>
            ))}
        </>
        ) 
    }
    
}