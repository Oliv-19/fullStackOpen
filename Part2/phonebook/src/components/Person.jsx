export default function Person({obj, deletePerson}){
    return(
        <>
            <p key={obj.name}>{obj.name} {obj.number}</p>
            <button onClick={()=>{deletePerson(obj)}}>delete</button>
        </>
    )
}