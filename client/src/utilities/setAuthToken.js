import axios from "axios"
const setAuthTokoen = (token) => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = "Bearer " + token
  } else {
    delete axios.defaults.headers.common["Authorization"]
  }
}

export default setAuthTokoen
