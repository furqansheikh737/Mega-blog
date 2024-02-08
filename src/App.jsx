import { useEffect, useState } from 'react'
import './App.css'
import { useDispatch } from 'react-redux';
import authService from "./appwrite/auth" 
import { login, logout } from './store/authSlices';

function App() {
  console.log(import.meta.env.VITE_APPWRITE_URL);
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
     authService.getCurretUser()
     .then((userData) => {
        if (userData) {
          dispatch(login({userData}))
        }
        else{
          dispatch(logout())
        }
     })
     .finally(() => {setLoading(false)})
  }, [])
  return (
    <>
      <h1>A blog app with appwrite</h1>
    </>
  )
}

export default App
