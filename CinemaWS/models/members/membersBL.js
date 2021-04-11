const membersDAL = require('../../DAL/membersREST');

exports.getMembers = async function(){
    let members = null, response = null;

    try{
        response = await membersDAL.getMembers();
        members = response.data;
    }
    catch(err){
        console.log(`An error occured while try to get all members: ${err}`);
    }

    return members;
}

exports.getMemberById = async function(id){
    let member = null, response = null;

    try{
        response = await membersDAL.getMemberById(id);
        member = response.data;
    }
    catch(err){
        console.log(`An error occured while try to get member: ${id} : ${err}`);
    }

    return member;
}

exports.updateMember = async function(id, member){
    let updateMember = null, response = null;

    try{
        response = await membersDAL.updateMember(id, member);
        updateMember = response.data;
    }
    catch(err){
        console.log(`An error occured while try to update updateMember: ${id} : ${err}`);
    }

    return updateMember;

}

exports.addMember = async function(member){
    let addedMember = null,  response = null;

    try{
        response = await membersDAL.addMember(member);
        addedMember = response.data;
    }
    catch(err){
        console.log(`An error occured while try to add member: ${member.name} : ${err}`);
    }

    return addedMember;
}

/* TODO  -  write delete member  including from theall his sourece */

