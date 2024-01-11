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

export default {getAll,addNew}