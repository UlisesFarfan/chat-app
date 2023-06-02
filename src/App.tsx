import { useEffect, useRef, useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Layout from './layouts/Layout'
import Message from './views/Message'
import Chat from './components/Chat'
import Login from './views/authviews/Login'
import AuthUserMiddleware from './middlewares/AuthUserMiddleware'
import AuthenticatedMiddleware from './middlewares/AuthenticatedMiddleware'
import AuthenticationLayout from './layouts/AuthenticationLayout'
import LoggedMiddleware from './middlewares/LoggedMiddleware'
import Contacts from './views/Contacts'
import Dashboard from './views/Dashboard'
import SocketIoMiddleware from './middlewares/SocketIoMiddleware'
import Register from './views/authviews/Register'
import Profile from './components/Profile'

function App() {

  return (
    <Routes>
      <Route element={<AuthUserMiddleware />}>
        {/* Private Rutes */}
        <Route element={<AuthenticatedMiddleware />}>
          <Route element={<SocketIoMiddleware />}>
            <Route element={<Layout />}>
              <Route path="/chats" element={<Message />}>
                <Route path=":id" element={<Chat />} />
              </Route>
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/" element={<Profile />} />
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
