import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Logo from "../Images/logo.png"
import { useContext } from "react"
import { UserContext } from "../context/userContext"
const CryptoJS = require("crypto-js")

function Login(props) {
  let navigate = useNavigate()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const { setUser, setFilms, setLoading } = useContext(UserContext)

  useEffect(() => {
    document.title = props.title || "Login"
  }, [props.title])

  //Encrypt
  const ciphertext = CryptoJS.AES.encrypt(
    JSON.stringify(password),
    "Star*Wars*SWAPI*-Test/2022-03-03"
  ).toString()

  // Decrypt
  const bytes = CryptoJS.AES.decrypt(
    ciphertext,
    "Star*Wars*SWAPI*-Test/2022-03-03"
  )
  const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))

  const getData = async (e) => {
    try {
      e.preventDefault()
      setLoading(true)
      let array = []
      const firstData = await axios.get(
        `https://swapi.dev/api/people/?search=${username}`
      )
      await Promise.all(
        firstData.data.results[0]["films"].map((url) => {
          return axios.get(url).then((film) => {
            array.push(film.data)
          })
        })
      ).then((result) => {
        if (firstData.data.results[0].hair_color === decryptedData) {
          localStorage.setItem(
            "user",
            JSON.stringify(firstData.data.results[0])
          )
          setUser(firstData.data.results[0])

          setFilms(array)
          navigate("/list")
          setLoading(false)
        } else {
          setError("Usuario y/o contraseña incorrectos")
        }
      })
    } catch (err) {
      setError("Usuario y/o contraseña incorrectos")
      // errors
      console.log(err, "connection error")
    }
  }

  return (
    <div className="root">
      <main className="container-fluid d-flex flex-column justify-content-center align-items-center h-100 pt-5 mt-5 ">
        <div className="login-container">
          <p className="text-center pb-3 display-6 fw-bold">
            <img src={Logo} className="logo-title mx-1 mb-1" alt="" />

            <h1>E M B R A C E</h1>
          </p>
          <form onSubmit={getData}>
            <p hidden={error ? false : true} className="text-danger fw-bold">
              &#9888; {error}
            </p>
            <input
              type="text"
              name="username"
              className="input-username mb-3"
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="   USERNAME"
            />
            <input
              type="password"
              name="password"
              className="input-password mb-3"
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="   PASSWORD"
            />

            <button
              type="submit"
              name="password"
              className="button-login"
              onChange={(e) => setPassword(e.target.value)}
              required
              value="LOG IN"
            >
              LOG IN
            </button>
          </form>
        </div>
      </main>
    </div>
  )
}

export default Login
