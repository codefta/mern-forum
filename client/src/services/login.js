import axios from 'axios'
const baseUrl = '/api/v1/login'

const login = async (credentials) => {
  const res = await axios.post(baseUrl, credentials)
  return res.data
}

export default { login }
