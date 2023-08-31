import './App.css'
import { Routes, Route } from 'react-router-dom'
import Layout from './layouts/Layout'
import Login from './views/authviews/Login'
import AuthUserMiddleware from './middlewares/AuthUserMiddleware'
import AuthenticatedMiddleware from './middlewares/AuthenticatedMiddleware'
import AuthenticationLayout from './layouts/AuthenticationLayout'
import LoggedMiddleware from './middlewares/LoggedMiddleware'
import SocketIoMiddleware from './middlewares/SocketIoMiddleware'
import Register from './views/authviews/Register'
import Chats from './views/Chats'
import ArchiveChats from './views/ArchiveChats'

function App() {

  return (
    <Routes>
      <Route element={<AuthUserMiddleware />}>
        {/* Private Rutes */}
        <Route element={<AuthenticatedMiddleware />}>
          <Route element={<SocketIoMiddleware />}>
            <Route element={<Layout />}>
              <Route path="/" element={<Chats />} />
              <Route path="/archive" element={<ArchiveChats />} />
            </Route>
          </Route>
        </Route>
        {/* Public Rutes */}
        <Route element={<LoggedMiddleware />}>
          <Route element={<AuthenticationLayout />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>
        </Route>
        <Route path="*" element={<h1>404</h1>} />
      </Route>
    </Routes>
  )
}

export default App
