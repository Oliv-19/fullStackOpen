import { useDispatch } from "react-redux"
import { changeNotification, removeNotification } from "../reducers/notificationReducer"

const Notification = ({notification}) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 10
  }
  return <div style={style}>{notification.message}</div>
}

export default Notification
