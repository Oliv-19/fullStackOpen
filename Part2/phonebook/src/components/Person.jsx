export default function Person({obj}){
    return(
        <p key={obj.name}>{obj.name} {obj.number}</p>
    )
}