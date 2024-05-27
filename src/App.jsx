import Chat from "./Components/Chat/Chat"
import Details from "./Components/Details/Details"
import List from "./Components/List/List"

const App = () => {
  return (
    <div className='container'>
      <List />
      <Chat />
      <Details />
    </div>
  )
}

export default App