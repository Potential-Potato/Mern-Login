import { useContext } from 'react'
import { UserContext } from '../../context/userContext' //this is the user token keeps tab of user

export default function Dashboard() {
    const {user} = useContext(UserContext)
    
  return (
    <div>
        <h1>Dashboard</h1>
        {!!user && (<h2>Hi {user.name}!</h2>)}
    </div>
  )
}
