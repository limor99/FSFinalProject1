import axios from 'axios';

const membersUrl = 'http://localhost:5000/api/members/';
                   
const loadMembers = async() =>{
    let resp = await axios.get(membersUrl);
    return resp.data;
}

const addMember = async (newMember) =>{
    let resp = {};
    try{
        resp = await axios.post(membersUrl, newMember);
        
    }
    catch(err){
        console.log(`An Error occured while try to add new member: ${err}`);
        resp.data = {
            succrss : false,
            msg : 'An Error occured while try to add new member'
        }

        console.log(resp.data)
    }

    return resp.data;
}

const updateMember = async (updatedMember) =>{
    let resp = {};
    
    try{
        resp = await axios.put(`${membersUrl}/${updatedMember.id}`, updatedMember);
    }
    catch(err){
        console.log(`An Error occured while try to update member: ${err}`);
        resp.data = {
            succrss : false,
            msg : 'An Error occured while try to update member'
        }

        //console.log(resp.data)
    }

    return resp.data;
}

const deleteMember = async (id) =>{
    let resp = await axios.delete(`${membersUrl}${id}`);
    return resp.data;
}

export default { loadMembers, addMember, updateMember, deleteMember };