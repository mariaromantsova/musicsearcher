import React, {useContext} from 'react';
import {NavLink, useHistory} from 'react-router-dom';
import {AuthContext} from '../context/AuthContext';
import M from "materialize-css/dist/js/materialize.min.js";

export const Navbar = ({ isAuthenticated, email, username }) => {
  const history = useHistory()
  const auth = useContext(AuthContext)

  const logoutHandler = (event) => {
    event.preventDefault()
    auth.logout()
    history.push('/')
  }

  const sidenav = document.querySelector(".sidenav");
  M.Sidenav.init(sidenav, {
      edge: "left",
      inDuration: 250
  });

  return isAuthenticated ? (
    <div>
      <div className="navbar-fixed">
        <nav>
          <div className="nav-wrapper pink darken-4">
            <div className="container">

              <NavLink to="#" data-target="slide-out" className="sidenav-trigger show-on-medium-and-down">
                  <i className="material-icons" style={{ fontSize: '37px' }}>menu</i>
              </NavLink>
              <NavLink to='/home'>
                <span className="brand-logo">
                  MusicSearcher
                </span>
              </NavLink>
              <ul id="nav-mobile" className="right">
                <li className="hide-on-med-and-down">
                  <NavLink to='/albums'>My Albums</NavLink>
                </li>
                <li className="hide-on-med-and-down">
                  <NavLink to='/users'>Users</NavLink>
                </li>
                <li>
                  <a href='/' onClick={logoutHandler}><i className="material-icons right">logout</i></a>
                </li>
              </ul>
            </div>
          </div>
        </nav>

      </div>

      <ul id="slide-out" className="sidenav">
        <li><div className="user-view center-align">
          <div className="background">
            <img alt="" src="https://merehead.com/blog/wp-content/uploads/gradient-design.jpeg" />
          </div>
          <img alt="" className="circle" style={{
             position: 'relative',
             left: '50%',
             marginLeft: '-25px'
          }} src="https://sun9-50.userapi.com/c850024/v850024986/c3654/Sd5DUQOKadU.jpg" />
          <span className="white-text name">{username}</span>
          <span className="white-text email">{email}</span>
        </div></li>
        {/* <li><div className="divider"></div></li> */}
        <li>
          <NavLink to='/home'>Home</NavLink>
        </li>
        <li>
          <NavLink to='/albums'>My Albums</NavLink>
        </li>
        <li>
          <NavLink to='/users'>Users</NavLink>
        </li>
      </ul>

    </div>
  ) : (
    <div className="navbar-fixed">
      <nav>
        <div className="nav-wrapper pink darken-4">
          <div className="container">
            <NavLink to='/'>
              <span className="brand-logo">
                MusicSearcher
              </span>
            </NavLink>
            <ul id="nav-mobile" className="right">
              <li>
                <NavLink to='/signin'>Sign In</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
