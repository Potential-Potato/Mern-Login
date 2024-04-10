import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

export default function Register() {
  const navigate = useNavigate()
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
  })

  const registerUser = async (event) => {
    event.preventDefault()
    const {name, email, password} = data
    try{  
      //sends the information to backend
      const {data} = await axios.post('/register', { 
        name, email, password 
      })
      if(data.error){ //shows the json.(error) from the backend
        toast.error(data.error)
      }else{
        setData({})
        toast.success('Register Successful!')
        //logins the user
        const {...data} = await axios.post('/login', {
          email,
          password
        })
        window.location.href = '/dashboard'; 
      }
    }catch(error){
     console.log(error)
    } 

    // Add useEffect hook to reload the page after successful registration
    useEffect(() => {
      const handleReload = () => {
        if (!data.error) {
          window.location.reload(); // Reload the page after successful registration
        }
      };

      handleReload();
    }, [data.error]);
    }

  return (
    <div>
      <form onSubmit={registerUser}>
        <label>Name</label>
        <input type='text' placeholder='enter name' value={data.name} onChange={(e) => setData({...data, name: e.target.value})}/>
          <label>Email</label>
          <input type='email' placeholder='enter email' value={data.email} onChange={(e) => setData({...data, email: e.target.value})}/>
        <label>Password</label>
        <input type='password' placeholder='enter password' value={data.password} onChange={(e) => setData({...data, password: e.target.value})}/>
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}
