import React, {useState, useEffect, useContext} from 'react';
import { Link } from 'react-router-dom';
import { useHttp } from '../hooks/http.hook';
import { useMessage } from '../hooks/message.hook';
import { AuthContext } from '../context/AuthContext';
import queryString from "query-string";


export const AuthPage = () => {
  const auth = useContext(AuthContext)

  const message = useMessage()
  const {loading, request, error, clearError} = useHttp()
  const [form, setForm] = useState({
    email: '', password: ''
  })

  useEffect(() => {
    let query = queryString.parse(window.location.search);
    if (query.status === 'Blocked') {
      message('Пользователь заблокирован')
      clearError()
      setTimeout(() => window.location.replace('/signin'), 2500)
    }

    message(error)
    clearError()
  }, [error, message, clearError])

  useEffect(() => {
    window.M.updateTextFields()
  }, [])

  const changeHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const loginHandler = async () => {
    try {
      const data = await request('/api/auth/login', 'POST', {...form})
      auth.login(data.token, data.userId, data.email, data.username)
    } catch (e) {}
  }


  return (
    <div className='row' style={{ marginBottom: '0' }}>
      <div className="col s10 m6 offset-s1 offset-m3" style={{ textAlign: 'center', marginTop: '2em' }}>
        <div className="card">
          <div className="card-content">
            <span className="card-title">
              <h5>Sign In</h5>
            </span>
            <div>

              <div className="input-field">
                <i className="material-icons prefix">email</i>
                <input
                  className="pink-input"
                  id="email"
                  type="text"
                  name="email"
                  onChange={changeHandler}
                />
                <label htmlFor="email">Email</label>
              </div>
              <div className="input-field">
                <i className="material-icons prefix">lock</i>
                <input
                  className="pink-input"
                  id="password"
                  type="password"
                  name="password"
                  onChange={changeHandler}
                />
                <label htmlFor="password">Password</label>

                <div style={{paddingTop: '1.5em'}}>
                  <a href="http://localhost:5000/api/auth/google" className="waves-effect waves-light btn deep-orange accent-4">Sign in with Google</a>
                </div>
                <div style={{paddingTop: '.5em'}}>
                  <a href="http://localhost:5000/api/auth/spotify" className="waves-effect waves-light btn green accent-4">Sign in with Spotify</a>
                </div>
                <p style={{paddingTop: '1.5em'}}>
                  Don't have an account?
                </p>
                <div>
                  <Link to="/signup" className="pink-text">Sign Up</Link>
                </div>
              </div>

            </div>
          </div>
          <div className="card-action">
            <button
              className="btn pink darken-2"
              style={{marginRight: '10px'}}
              onClick={loginHandler}
              disabled={loading}
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
