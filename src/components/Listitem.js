// import React, { useEffect } from "react"
import axios from "axios"
import { useContext } from "react"
import { Link } from "react-router-dom"
import { UserContext } from "../context/userContext"

function ListItem(props) {
  const { setCharacter, setLoading, vista, setVista, user } =
    useContext(UserContext)

  console.log("Array vista peliculas", vista)
  const date = new Date()
  const getData2 = async () => {
    setCharacter(null)
    setLoading(true)
    try {
      let array = []
      const firstData = await axios.get(
        `https://swapi.dev/api/films/${props.episode_id}/`
      )

      await Promise.all(
        firstData.data["characters"].map((url) => {
          return axios.get(url).then((character) => {
            array.push(character.data)
          })
        })
      ).then(() => {
        setVista([
          ...vista,
          { user: user.name, movie: props.title, time: date },
        ])
        localStorage.setItem("vistas", JSON.stringify(vista))
        setCharacter(array)
        setLoading(false)
      })
    } catch (err) {
      // errors
      console.log(err, "connection error")
    }
  }

  return (
    <div onClick={getData2}>
      <ul class="list-group">
        <Link
          exact="true"
          to={`/list/${props.episode_id}`}
          className="text-decoration-none"
        >
          <div className="peliculas">
            <ul className="list-group">
              <li
                className="list-unstyled list-group-item list-group-item-primary list-unstyled"
                key={props.episode_id}
              >
                {props.title}
              </li>
              <li
                className="list-group-item list-group-item-secondary list-unstyled"
                key={props.episode_id}
              >
                {props.director}
              </li>
              <li
                className="  text-decoration-nonelist-group-item list-group-item-success list-unstyled"
                key={props.episode_id}
              >
                {props.opening_crawl}
              </li>
            </ul>
          </div>
        </Link>
      </ul>
    </div>
  )
}

export default ListItem
