import { Link } from 'react-router-dom'

const UserItem = ({ username, email, password, permissions }) => {
  return (
    <Link to={`/singleuser/${username}`} className="useritem">
      <div className="listitem__info">
        <h4 className="info__name">{username}</h4>
        <h4 className="info__rating">{email}</h4>
        <h4 className="info__name">{password}</h4>
        <h4 className="info__rating">{permissions}</h4>
      </div>
    </Link>
  )
}

export default UserItem

