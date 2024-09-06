import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
  return axios.get(baseUrl)
}

const create = newObject => {
  return axios.post(baseUrl, newObject).then(response => response.data)
}

const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject).then(response => response.data)
}


const remove = (id) => {
    console.log("persons.js trying to remove" ,id)
    return axios.delete(`${baseUrl}/${id}`)
}
export default {getAll, create, update, remove}