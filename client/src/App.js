import React, { useState, useEffect } from 'react'
import './App.css'
import { useDispatch, useSelector } from 'react-redux'
import Header from './components/Header'
import NewPost from './components/NewPost'
import Posts from './components/Posts'
import Footer from './components/Footer'
import Login from './components/Login'
import Register from './components/Register'
import Profile from './components/Profile'

import { initPosts } from './reduces/postReducer'
import { initAuth } from './reduces/authReducer'

import { Switch, Route, Link, Redirect } from 'react-router-dom'

const App = () => {
  const dispatch = useDispatch()
  const userLogged = useSelector((state) => state.userLogged)

  useEffect(() => {
    dispatch(initPosts())
    dispatch(initAuth())
  }, [dispatch])

  if (!userLogged) {
    return (
      <>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
        </Switch>
      </>
    )
  }

  return (
    <React.Fragment>
      <Header />
      <Switch>
        <Route path="/profile">
          <Profile />
        </Route>
        <Route path="/">
          <NewPost />
          <Posts />
        </Route>
      </Switch>
      <Footer />
    </React.Fragment>
  )
}

export default App
