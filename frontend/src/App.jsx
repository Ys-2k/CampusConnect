import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import LogIn from './pages/LogIn'
import Register from './pages/Register'
import { UserData } from './context/UserContext'
import Account from './pages/Account'
import NotFound from './pages/NotFound'
import Create from './pages/Create'
import Reels from './pages/Reels'
import Loading from './components/Loading'
import UserAccount from './pages/UserAccount'
import ChatPage from './pages/ChatPage'

const App = () => {

  const {loading, isAuth, user} = UserData();
  return (
    <>
      { loading? (<Loading/>) : <Routes>
        <Route path='/' element={isAuth? <Home/> : <LogIn/>} />
        <Route path='/chat' element={isAuth? <ChatPage/> : <LogIn/>} />
        <Route path='/account' element={isAuth? <Account/> : <LogIn/>} />
        <Route path='/user/:id' element={isAuth? <UserAccount/> : <LogIn/>} />
        <Route path='/login' element={!isAuth? <LogIn/> : <Home/>} />
        <Route path='/create' element={!isAuth? <LogIn/> : <Create/>} />
        <Route path='/reels' element={!isAuth? <LogIn/> : <Reels/>} />
        <Route path='/register' element={!isAuth? <Register/>: <Home/>} />
        <Route path='*' element={<NotFound/>} />
      </Routes>}
    </>
  )
}

export default App