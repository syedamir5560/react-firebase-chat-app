import Chat from "./Components/Chat/Chat"
import Details from "./Components/Details/Details"
import List from "./Components/List/List"
import Login from "./Components/Login/Login"

const App = () => {
  let user =false
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
    </div>
  )
}

export default App