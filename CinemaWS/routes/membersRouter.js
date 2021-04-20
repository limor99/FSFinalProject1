const express = require('express');
const router = express.Router();

const membersBL = require('../models/members/membersBL');

router.route('/').get(async function(req, res){
    let data  = await membersBL.getMembers();
    res.send(data);
    
})

router.route('/:id').get(async function(req, res){
    let id = req.params.id;
    let data = await membersBL.getMemberById(id)
    res.send(data);
})

router.route('/').post(async function(req, res){
    let addedMemeber = req.body;

    let data = await membersBL.addMember(addedMemeber);

    res.send(data);
})

router.route('/:id').put(async function(req, res){
    let id = req.params.id;
    let updateMember = req.body;

    let data = await membersBL.updateMember(id, updateMember);

    res.send(data);
})

router.route('/:id').delete(async function(req, res){
    let id = req.params.id;
    
    let data = await membersBL.deleteMember(id);

    res.send(data);
})




module.exports = router;

