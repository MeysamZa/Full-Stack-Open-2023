import axios from 'axios'

const baseUrl="/api/persons"

const getAll=()=>{
    return axios.get(baseUrl)
    .then(response=>response.data)
}

const addNew=(newPerson)=>{
    return axios.post(baseUrl,newPerson)
    .then(response=>response.data)
    .catch(error=>{
        throw new Error(error.response.data.error)
    })
}

const deleteById=(id)=>{
    return axios.delete(`${baseUrl}/${id}`)
}

const update=(updatedPerson)=>{
    return axios.put(`${baseUrl}/${updatedPerson.id}`,updatedPerson)
    .then(response=>response.data)
    .catch(error=>{
        throw new Error(error.response.data.error)
    })
}

export default {getAll,addNew,deleteById,update}