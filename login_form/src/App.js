import React, { useState } from "react";
import "./App.css";
import Error from "./components/Error";
import Profile from "./components/Profile";
import LoginForm from "./components/LoginForm";
import Auth, { VALIDATION_ERROR, CONNECTION_ERROR } from "./services/Auth";

function App() {
  let [isLoggedIn, setIsLoggedIn] = useState(false)
  let [isLoading, setIsLoading] = useState(false)
  let [error, setError] = useState('')
  let [user, setUser] = useState({})

  const login = async ({ username, password }) => {
    setIsLoading(true)
    await Auth.login({ username, password }).then(val => {
      setIsLoggedIn(true)
      setIsLoading(false)
      setUser(val)
    }).catch(error => {
      setError(error.message)
      setIsLoading(false)
    })
  }
  return (
    <>
      {
        isLoading ? "Loading. Please wait." : (
          isLoggedIn === true ?

            <Profile name={user.name} logout={() => setIsLoggedIn(false)}></Profile> :

            (error === CONNECTION_ERROR ? <Error message={'Connection Problem!'} tryAgain={() => setError('')}></Error> :

              (<LoginForm submit={login}></LoginForm>))
        )
      }
      {
        error === VALIDATION_ERROR ? <>missing or invalid data</> : null
      }
    </>
  );
}

export default App;
