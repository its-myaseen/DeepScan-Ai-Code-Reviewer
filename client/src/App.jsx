import { useState } from 'react'

import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AppReview from './Pages/AppReview'
import Home from './Pages/Home'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/app/codereview' element={<AppReview />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
