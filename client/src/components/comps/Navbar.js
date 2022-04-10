import { Link } from 'react-router-dom'
import './Navbar.css'

const Navbar = () => {
  return (
    <div>
        <div className="container">
       <nav className="navbar__nav">
          <h3 className="nav__brand">
            <Link to="/login">
               TV SHOW SEARCH
            </Link>
          </h3>
          <ul className="nav__links">
            <li className="links__link">
              <Link to="/movies">MOVIES</Link>
            </li>
            <li className="links__link">
              <Link to="/favourites">FAVOURITES</Link>
            </li>
            <li className="links__link">
              <Link to="/admin">ADMIN</Link>
            </li>
            <li className="links__link">
              <Link to="/logout">LOGOUT</Link>
            </li>
          </ul>
        </nav>
        </div>
    </div>
  )
}

export default Navbar
