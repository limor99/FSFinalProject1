import axios from 'axios';
const usersUrl = "http://localhost:5000/api/users/";

const login = async (userLogin) =>{
    console.log(userLogin)    
    let resp = await axios.post(`${usersUrl}login`, userLogin);
//console.log(resp)
    return resp.data;
}

const createAccount = async (createdUser) =>{
    let resp = await axios.post(`${usersUrl}createAccount`, createdUser);
    return resp.data;
}

const addUser = async (newUser) =>{
    let resp = await axios.post(`${usersUrl}add`, newUser);
    return resp.data;
}

const deleteUser = async (id) =>{
    let resp = await axios.delete(`${usersUrl}${id}`);
    return resp.data;
}

const updateUser = async(updatedUser) =>{
    let resp = await axios.put(usersUrl, updatedUser);
    return resp.data;
}

const getUsers = async () =>{
    let resp = await axios.get(`${usersUrl}`);
    return resp.data;
}

export default {login, createAccount, addUser, getUsers, deleteUser, updateUser};