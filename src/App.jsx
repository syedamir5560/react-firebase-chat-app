import Chat from "./Components/Chat/Chat"
import Details from "./Components/Details/Details"
import List from "./Components/List/List"
import Login from "./Components/Login/Login"
import Notification from "./Components/Notification/Notification"

const App = () => {
  let user = true
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