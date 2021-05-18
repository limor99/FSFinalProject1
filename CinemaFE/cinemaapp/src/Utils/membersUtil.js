import axios from 'axios';

import globalUtil from './globalUtil';

const membersUrl = 'http://localhost:5000/api/members/';
                   
const loadMembers = async() =>{
    let resp = await axios.get(membersUrl);
    return resp.data;
}

const addMember = async (newMember) =>{
    let resp = {};
    try{
        const header = globalUtil.getHeader();
        //resp = await axios.post(membersUrl, newMember);
        resp = await axios.post(membersUrl, newMember, header);
        
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
        const header = globalUtil.getHeader();
        //resp = await axios.put(`${membersUrl}/${updatedMember.id}`, updatedMember);
        resp = await axios.put(`${membersUrl}/${updatedMember.id}`, updatedMember, header);
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
    let resp = {};
    
    try{
        const header = globalUtil.getHeader();
        //resp = await axios.delete(`${membersUrl}${id}`);
        resp = await axios.delete(`${membersUrl}${id}`, header);
    }
    catch(err){
        console.log(`An Error occured while try to delete member: ${err}`);
        resp.data = {
            succrss : false,
            msg : 'An Error occured while try to delete member'
        }
    }

    return resp.data;
}

export default { loadMembers, addMember, updateMember, deleteMember };