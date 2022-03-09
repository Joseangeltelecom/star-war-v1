import { useContext } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import { UserContext } from "../context/userContext"
import Logo from "../Images/logo.png"

// import authService from "../service/auth.service"

function Navbar() {
  const { user, setUser } = useContext(UserContext)
  let navigate = useNavigate()
  // to logout a user we need to remove the user from our localStorage and set the User to undifined.
  const logout = () => {
    // localStorage.removeItem("user")
    setUser(undefined)
    navigate("/login")
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top" >
      <div className="container-fluid">
        <NavLink exact to="/list" className="navbar-brand px-3">
          <img src={Logo} className="logo m-2 text-white" alt="" />
          <span className="h4 fw-bold">E M B R A C E</span>
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse justify-content-end px-3"
          id="navbarNavAltMarkup"
        >
          <div className="navbar-nav text-center align-items-center">
            <div
              exact
              to="/"
              activeClassName="active fw-bold letter-spacing"
              className="nav-link mx-2 text-white"
              aria-current="page"
            >
              {user.name}
            </div>

            <div
              exact
              to="/dashboard"
              activeClassName="active fw-bold letter-spacing"
              className="nav-link text-white"
              aria-current="page"
            >
              Since: {user.created}
            </div>

            <NavLink
              exact
              to="/list"
              activeClassName="active"
              className="btn btn-light fw-bold rounded-pill m-2"
            >
              All Movies
            </NavLink>
            {/* Si hay user entonces el botton se vera. onClick removera el user y lo redirecionara hacia home. */}
            <NavLink
              exact
              to="/"
              activeClassName="active"
              className="btn btn-light fw-bold rounded-pill m-2"
              onClick={logout}
            >
              Logout
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
