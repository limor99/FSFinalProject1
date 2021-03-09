const axios = require('axios');
const membersWSUrl = ('http://localhost:8000/api/members/');

exports.getMembers = function(){
    return axios.get(membersWSUrl);

}

exports.getMemberById = function(id){
    return axios.get(`${membersWSUrl}${id}`);
}

exports.updateMember = function(memberId ,member){
    return axios.put(`${membersWSUrl}${memberId}`, member);
}

exports.addMember = function(member){
    return axios.post(`${membersWSUrl}`, member);
}