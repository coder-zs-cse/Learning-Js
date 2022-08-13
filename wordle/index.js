const PORT = 8000
const axios = require("axios");
const express = require("express")
const app = express()

app.get('/word',(req,res)=>{
    const options = {
        method: 'GET',
        url: 'https://random-words5.p.rapidapi.com/getMultipleRandom',
        params: {count: '1', wordLength: '5'},
        headers: {
          'X-RapidAPI-Key': '829165370amshdcccfaa5cb9b037p164ebbjsn210fc016fc91',
          'X-RapidAPI-Host': 'random-words5.p.rapidapi.com'
        }
      };
      
      axios.request(options).then( (response)=> {
          console.log(response.data);
      }).catch( (error)=>{
          console.error(error);
      });
})


app.listen(PORT,()=> console.log('Server running on PORT '+ PORT))