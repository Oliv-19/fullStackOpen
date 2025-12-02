export default function Notification({message}){
    const styleObj={
        border: `1px solid ${message.isError ? 'red': 'green'}`,
    }
    return(
        <>
        {message.msg && (
            <div style={styleObj}>
                <h4>{message.msg}</h4>
            </div>
            )
        }
        </>
    )
}