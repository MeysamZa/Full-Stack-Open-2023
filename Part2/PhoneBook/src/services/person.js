import axios from 'axios'

const baseUrl="/api/persons"

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

const update=(updatedPerson)=>{
    return axios.put(`${baseUrl}/${updatedPerson.id}`,updatedPerson)
    .then(responce=>responce.data)
}

export default {getAll,addNew,deleteById,update}