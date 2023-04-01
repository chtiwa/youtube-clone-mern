import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/navbar/Navbar'
import Layout from './Layout'
import Home from './pages/home/Home'
import Watch from './pages/watch/Watch'
import History from './pages/history/History'
import Results from './pages/results/Results'
import Channel from './pages/channel/Channel'
import Subscriptions from './pages/subscriptions/Subscriptions'
import Create from './pages/create/Create'
import PrivateRoute from './PrivateRoute'
import Redirect from './Redirect'
import Explore from './pages/explore/Explore'

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="results" element={<Results />} />
          <Route path="explore" element={<Explore />} />
          <Route path="/channel/:name" element={<Channel />} />
          <Route path="/history" element={
            <PrivateRoute>
              <History />
            </PrivateRoute>
          } />
          <Route path="/subscriptions" element={
            <PrivateRoute>
              <Subscriptions />
            </PrivateRoute>
          } />
          <Route path="/watch/:id" element={<Watch />} />
          <Route path="/create" element={
            <PrivateRoute>
              <Create />
            </PrivateRoute>
          } />
        </Route>
        <Route path="*" element={<Redirect />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App