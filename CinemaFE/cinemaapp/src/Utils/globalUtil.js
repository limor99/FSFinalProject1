const getHeader = () =>{
    const token = sessionStorage.getItem("id");
    const header = {headers: 
                        {"Authorization" : `Bearer ${token}`}
                    }
    return header;
}

export default {getHeader};