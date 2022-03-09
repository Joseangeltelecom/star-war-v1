import axios from "axios"
import { useEffect, useState } from "react"

export const useCharacter = (props) => {
  const [homeworld, setHomeworld] = useState()
  const [loading, setLoading] = useState(true)

  const getHomeworldName = async (url) => {
    const response = await axios.get(url)
    return response.data
  }

  useEffect(() => {
    const fetch = async () => {
      if (loading) {
        await getHomeworldName(`${props.homeworld}`).then((res) => {
          setHomeworld(res)
        })
      }
      setLoading(false)
    }

    fetch()
  }, [loading, props.homeworld])

  return { loading, homeworld }
}
