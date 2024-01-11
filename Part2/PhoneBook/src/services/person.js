import axios from 'axios'

const baseUrl="http://localhost:3001/persons"

const getAll=()=>{
    return axios.get(baseUrl)
    .then(responce=>responce.data)
}

const addNew=(newPerson)=>{
    return axios.post(baseUrl,newPerson)
    .then(responce=>responce.data)
}

const deleteById=(id)=>{
    return axios.delete(`${baseUrl}/${id}`)
}

export default {getAll,addNew,deleteById}