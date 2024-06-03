import { useEffect } from "react"
import Chat from "./Components/Chat/Chat"
import Details from "./Components/Details/Details"
import List from "./Components/List/List"
import Login from "./Components/Login/Login"
import Notification from "./Components/Notification/Notification"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "./Lib/firebase"
import { useUserStore } from "./Lib/userStore"
import { useChatStore } from "./Lib/chatStore"


const App = () => {

  let { currentUser, isLoading, fetchUserInfo } = useUserStore()
  const { chatId } = useChatStore()

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      fetchUserInfo(user?.uid)
    })
    return () => {
      unSub();
    }
  }, [fetchUserInfo]);

  // console.log(currentUser)   

  if (isLoading) return <div className="loading">Loading...</div>


  return (
    <div className='container'>
      {
        currentUser ? (
          <>
            <List />
            {chatId && <Chat />}
            {chatId && <Details />}
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