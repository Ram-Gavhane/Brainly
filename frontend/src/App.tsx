
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Signup } from './pages/signup'
import { Signin } from './pages/signin'
import { Dashboard } from './pages/dashboard'
import { Layout } from './pages/layout'
import { Test } from './pages/test'

import { Landing } from './pages/landing'
// ...

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout/>} >
          <Route index element={<Landing />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/signin' element={<Signin />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/test' element={<Test/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
