import { toast } from 'react-toastify';
import { API_BASE_URL } from "src/variable"
const axios = require('axios');


const headers = {
    // "accept": "application/json",
    'authorization': localStorage.getItem("token"),
    'language': "en"
}

const patchReq = (url, body) => new Promise((resolve, reject) => {
    const apiurl = API_BASE_URL + url
    console.log('apiurl---->>', apiurl)
    console.log('headers---->>', headers)
    axios.patch(apiurl, body, { headers }).then((response) => {
        // console.log("res-->>", response)

        resolve(response.data);
        console.log("state updated", response.data)
        // setIsLoading(false)
        toast.success('Data updated...!', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });

        // getAdminsData()
        // alert("data uodated..");


    })
        .catch((error) => {
            console.log('error-->', error);
            reject(error.response);
            // setIsLoading(false)
            if (error.response.status == 500) {
                error.data = {}
                error.data.message = "Internal server error.."
            }
            if (error.response.status == 401) {
                error.data = {}
                error.data.message = "Session Expire.."
                toast.error(error.response.data.message, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                localStorage.setItem('auth', "false");
            }
            // setIsLoading(false)
            toast.error(error.response.data.message, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        });
})

// const myfunction = () => { }
export default patchReq


// module.exports = patchReq