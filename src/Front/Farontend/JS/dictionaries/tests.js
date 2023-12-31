 
 //Axios 

const { default: axios } = require("axios");
const { response } = require("express");

//Post
axios.post(URL, data)
.then(response => {
    ...
})
.then(data=>{
    ....
})
.catch(err => {
    ...
})
//Get
const z  = async() => {
    try{
        const data = await axios,get(URL)
        const jsonData = JSON.stringify(data);   
        if(data?.data) {
            throw new Error('err')

        }
    }catch( err) {
        ...
    }
}



 //Fetch
 //Post 
 
 
 //Get