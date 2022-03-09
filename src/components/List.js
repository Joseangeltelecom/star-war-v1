import { useContext } from "react"
import { UserContext } from "../context/userContext"
import ListItem from "./Listitem"
import Navbar from "./Navbar"

function List() {
  const { films } = useContext(UserContext)

  return (
    <div>
      <Navbar />
      <div className="list-container">
        {films.map((film) => (
          <ul>
            <li key={film.episode_id} className="list-unstyled">
              <ListItem {...film} />
            </li>
          </ul>
        ))}
      </div>
    </div>
  )
}

export default List
