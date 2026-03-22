import { useEffect, useState } from "react";
import UsersService from '../services/users'
import { useParams } from "react-router-dom";

export const User = () => {
    const [user, setUser] = useState({});
    const params = useParams()
    useEffect(()=> {
        const getUser = async() => {
            const users = await UsersService.getUser(params.id)
            setUser(users)
        }
        getUser()
    }, [params.id])

    if(!user){
        return (
            <div>loading...</div>
        )
    }else {
        return (
            <>
                <h1>{user.name}</h1>
                <p>added blogs</p>
                {user.blogs?.map((blogs) => (
                    <ul key={blogs.id}>
                        <li>{blogs.title}</li>
                    </ul>
                ))} 
            </>
        )
    }
}