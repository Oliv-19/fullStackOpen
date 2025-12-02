export default function Notification({message}){
    const styleObj={
        border: '1px solid green',
    }
    return(
        <>
        {message && (
            <div style={styleObj}>
                <h4>{message}</h4>
            </div>
            )
        }
        </>
    )
}