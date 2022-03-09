import React, { useEffect, useMemo } from "react"
import { Route, Routes, Navigate } from "react-router-dom"
import Login from "./components/Login"
import Details from "./components/Details"
import List from "./components/List"
import { useState } from "react"
import { UserContext } from "./context/userContext"
import { ScaleLoader } from "react-spinners"
import "./App.css"

function App() {
  const [user, setUser] = useState(null)
  console.log(user)
  const [films, setFilms] = useState([])
  const [character, setCharacter] = useState(null)
  const [loading, setLoading] = useState(false)
  const [vista, setVista] = useState([])

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"))
    const vistas = JSON.parse(localStorage.getItem("vistas"))

    if (vistas && user) {
      setVista(vistas)
      setUser(user)
    }
  }, [])

  // prevents the provider value from changing unless "value" or setValue changes"

  const value = useMemo(
    () => ({
      user,
      setUser,
      films,
      setFilms,
      character,
      setCharacter,
      loading,
      setLoading,
      vista,
      setVista,
    }),
    [
      user,
      setUser,
      films,
      setFilms,
      character,
      setCharacter,
      loading,
      setLoading,
      vista,
      setVista,
    ]
  )

  const style = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  }
  return (
    <div className="App h-100">
      <UserContext.Provider value={value}>
        <div style={style}>
          <ScaleLoader color={"#123abc"} size={80} loading={loading} />
        </div>

        <Routes>
          <Route path="/" element={<Login title="Login" />} />

          {films.map((film) => (
            <Route
              path="/list"
              element={
                <RequireAuth redirectTo="/">
                  <List title="List" {...film} />
                </RequireAuth>
              }
            />
          ))}

          {character
            ? films.map((film) => (
                <Route
                  path={`/list/${film.episode_id}`}
                  element={<Details {...film} />}
                />
              ))
            : null}
        </Routes>
      </UserContext.Provider>
    </div>
  )

  function RequireAuth({ children, redirectTo }) {
    return user ? children : <Navigate to={redirectTo} />
  }
}

export default App
