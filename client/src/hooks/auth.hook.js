import {useState, useCallback, useEffect} from 'react';

const storageName = 'userData'

export const useAuth = () => {
  const [token, setToken] = useState(null)
  const [userId, setUserId] = useState(null)
  const [email, setEmail] = useState(null)
  const [username, setUsername] = useState(null)

  const login = useCallback((jwtToken, id, email, username) => {
    setToken(jwtToken)
    setUserId(id)
    setEmail(email)
    setUsername(username)

    localStorage.setItem(storageName, JSON.stringify({
      userId: id, token: jwtToken, email: email, username: username
    }))
  }, [])

  const logout = useCallback(() => {
    setToken(null)
    setUserId(null)
    setEmail(null)
    setUsername(null)
    localStorage.removeItem(storageName)
  }, [])

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(storageName))
    if (data && data.token) {
      login(data.token, data.userId, data.email, data.username)
    }
  }, [login])

  return { login, logout, token, userId, email, username}
}
