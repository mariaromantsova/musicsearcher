import React, {useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {useHttp} from '../hooks/http.hook';
import {useMessage} from '../hooks/message.hook';


export const RegistrationPage = () => {
  const message = useMessage()
  const {loading, request, error, clearError} = useHttp()
  const [form, setForm] = useState({
    username: '', email: '', password: ''
  })

  useEffect(() => {
    message(error)
    clearError()
  }, [error, message, clearError])

  useEffect(() => {
    window.M.updateTextFields()
  }, [])

  useEffect(() => {
    window.M.updateTextFields()
  }, [])

  const changeHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const registerHandler = async () => {
    try {
      const data = await request('/api/auth/register', 'POST', {...form})
      message(data.message)
    } catch (e) {}
  }

  return (
    <div className='row' style={{ marginBottom: '0' }}>
      <div className="col s10 m6 offset-s1 offset-m3" style={{ textAlign: 'center', marginTop: '2em' }}>
        <div className="card">
          <div className="card-content">
            <span className="card-title">
              <h5>Sign Up</h5>
            </span>
            <div>

              <div className="input-field">
                <i className="material-icons prefix">account_circle</i>
                <input
                  className="pink-input"
                  id="username"
                  type="text"
                  name="username"
                  onChange={changeHandler}
                />
                <label htmlFor="username">Username</label>
              </div>
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
                  <Link to="/signin" className="pink-text">Sign In</Link>
                </div>
              </div>

            </div>
          </div>
          <div className="card-action">
            <button
              className="btn pink darken-2"
              style={{marginRight: '10px'}}
              onClick={registerHandler}
              disabled={loading}
            >
              Sign Up
            </button>
            {/* <button
              className="btn pink lighten-3"
              onClick={registerHandler}
              disabled={loading}
            >
              Register
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
}
