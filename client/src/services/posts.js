import axios from 'axios'
const baseUrl = '/api/v1/posts'
let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const res = await axios.get(baseUrl)
  return res.data
}

const getId = async (id) => {
  const res = await axios.get(`${baseUrl}/${id}`)
  return res.data
}

const create = async (obj) => {
  const config = {
    headers: {
      Authorization: token,
    },
  }

  console.log(config)
  const res = await axios.post(baseUrl, obj, config)
  return res.data
}

const update = async (id, obj) => {
  const config = {
    headers: {
      Authorization: token,
    },
  }

  const res = await axios.put(`${baseUrl}/${id}`, obj, config)
  return res.data
}

const remove = async (id) => {
  const config = {
    headers: {
      Authorization: token,
    },
  }

  const res = await axios.delete(`${baseUrl}/${id}`, config)
  return res.data
}

const like = async (id) => {
  const config = {
    headers: {
      Authorization: token,
    },
  }

  const res = await axios.get(`${baseUrl}/${id}/likes`, config)
  return res.data
}

const comment = async (id, obj) => {
  const config = {
    headers: {
      Authorization: token,
    },
  }

  const res = await axios.post(`${baseUrl}/${id}/comments`, obj, config)
  return res.data
}

export default {
  getAll,
  getId,
  create,
  update,
  remove,
  like,
  comment,
  setToken,
}
