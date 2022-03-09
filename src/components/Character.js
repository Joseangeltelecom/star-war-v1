import { useCharacter } from "../hooks/useCharacter"
import { ScaleLoader } from "react-spinners"

function Character(props) {
  const { homeworld, loading } = useCharacter(props)
  if (loading)
    return <ScaleLoader color={"#123abc"} size={80} loading={loading} />
  return (
    <div class="card border-info mb-3">
      <div class="card-header fs-4">{props.name}</div>
      <div class="card-body">
        <p class="card-text">Hair Color: {props.hair_color}</p>
        <p class="card-text">Height: {props.height}</p>
        <p class="card-text">Homeworld: {homeworld.name}</p>
      </div>
    </div>
  )
}

export default Character
