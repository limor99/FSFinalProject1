import axios from 'axios';
const subscriptionsUrl = "http://localhost:5000/api/subscriptions/";

const getSubscriptions = async () =>{
    let resp = await axios.get(`${subscriptionsUrl}`);
    return resp.data;

}

export default {getSubscriptions};