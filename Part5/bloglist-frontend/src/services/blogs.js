import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null
const setToken = newToken =>{
  token =`Bearer ${newToken}`
}
const getAll = async() => {
  const response = await axios.get(baseUrl)
  return response.data
}
const create = async(info) => {
  const config = {
    headers : {Authorization: token}
  } 
  const response = await axios.post(baseUrl, info, config)
  return response.data
}
const update = async(info) => {
  const config = {
    headers : {Authorization: token}
  } 
  const response = await axios.put(`${baseUrl}/${info.id}`, info, config)
  return response.data
}
const destroy = async(info) => {
  const config = {
    headers : {Authorization: token}
  }
  const response = await axios.delete(`${baseUrl}/${info.id}`, config)
  return response.data
}

export default { getAll, create, update, setToken, destroy}