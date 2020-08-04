import axios from 'axios'
const baseUrl = '/api/v1/users'

const getAll = async () => {
  const res = await axios.get(baseUrl)
  return res.data
}

const getId = async (id) => {
  const res = await axios.get(`${baseUrl}/${id}`)
  return res.data
}

const create = async (obj) => {
  const res = await axios.post(baseUrl, obj)
  return res.data
}

const update = async (id, obj) => {
  const res = await axios.put(`${baseUrl}/${id}`, obj)
  return res.data
}

const remove = async (id) => {
  const res = await axios.delete(`${baseUrl}/${id}`)
  return res.data
}

export default { getAll, getId, create }
