import { useEffect } from "react"
import Chat from "./Components/Chat/Chat"
import Details from "./Components/Details/Details"
import List from "./Components/List/List"
import Login from "./Components/Login/Login"
import Notification from "./Components/Notification/Notification"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "./Lib/firebase"

const App = () => {
  let user = false

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      console.log(user)
    })
    return () => {
      unSub();
    }
  }, []);
  
  return (
    <div className='container'>
      {
        user ? (
          <>
            <List />
            <Chat />
            <Details />
          </>
        ) : (
          <Login />
        )
      }
      <Notification />
    </div>
  )
}

export default App