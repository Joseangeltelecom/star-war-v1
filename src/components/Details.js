import React, { useContext } from "react"
import { UserContext } from "../context/userContext"
import Character from "./Character"
import { Chart } from "react-google-charts"

import Navbar from "./Navbar"

function Details(props) {
  const { character, user, vista } = useContext(UserContext)

  const nombreDelDiaSegunFecha = (fecha) =>
    ["domingo", "lunes", "martes", "miercoles", "jueves", "viernes", "sabado"][
      new Date(fecha).getDay()
    ]

  const vistaFiltered = vista
    .filter((item) => {
      return item.user === user.name && item.movie === props.title
    })
    .map((date) => {
      return nombreDelDiaSegunFecha(date.time)
    })

  const Monday = vistaFiltered.filter((day) => {
    return day === "lunes"
  })
  const Tuesday = vistaFiltered.filter((day) => {
    return day === "martes"
  })
  const Wednesday = vistaFiltered.filter((day) => {
    return day === "miercoles"
  })
  const Thursday = vistaFiltered.filter((day) => {
    return day === "jueves"
  })
  const Friday = vistaFiltered.filter((day) => {
    return day === "viernes"
  })
  const Saturday = vistaFiltered.filter((day) => {
    return day === "sabado"
  })
  const Sunday = vistaFiltered.filter((day) => {
    return day === "domingo"
  })

  const data = [
    ["Days", "Views", { role: "style" }],
    ["Monday", Monday.length, "#3366CC"],
    ["Tuesday", Tuesday.length, "#3366CC"],
    ["Wednesday", Wednesday.length, "#3366CC"],
    ["Thursday", Thursday.length, "#3366CC"],
    ["Friday", Friday.length, "#3366CC"],
    ["Saturday", Saturday.length, "#3366CC"],
    ["Sunday", Sunday.length, "#3366CC"],
  ]

  return (
    <div className="details-container">
      <div className="peliculas">
        <Navbar />
        <ul className="list-group">
          <li
            className="list-group-item list-group-item-primary"
            key={props.episode_id}
          >
            {props.title}
          </li>
          <li
            className="list-group-item list-group-item-secondary"
            key={props.episode_id}
          >
            {props.director}
          </li>
          <li
            className="list-group-item list-group-item-success "
            key={props.episode_id}
          >
            {props.opening_crawl}
          </li>
        </ul>
        <hr />
        <h3>Characters:</h3>

        <div className="container d-flex justify-content-center align-items-center">
          <div className="row">
            {character &&
              character.map((char) => {
                return (
                  <div className="col-md-4 col-sm-6 col-12">
                    <Character {...char} />
                  </div>
                )
              })}
          </div>
        </div>

        <div>
          <h2>Nro of visitors to {user.name}</h2>
          <Chart
            chartType="ColumnChart"
            width="100%"
            height="400px"
            data={data}
          />
        </div>
      </div>
    </div>
  )
}

export default Details
