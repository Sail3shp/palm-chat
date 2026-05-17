import { useState } from 'react'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import SignupPage from './pages/SignupPage'
import Header from './components/Header'
import ChatPage from './pages/ChatPage'
import { Routes, Route } from 'react-router'

function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route index element={<HomePage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<SignupPage />} />
        <Route path='/chat' element={<ChatPage />} />

      </Routes>
    </>
  )
}

export default App
