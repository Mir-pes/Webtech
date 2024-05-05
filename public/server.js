const express = require('express');
const port = process.env.PORT || 5000;


const app = express();


app.use(express.json());//accept dara in json format

app.use(express.urlencoded());

app.use(express.static('public'));


app.get('/form',(req,res)=>{
    res.sendFile(__dirname + '/public/finalform.html');
})

app.post('/formPost',(req,res)=>{
    console.log(req.body);
})

app.listen(port,() =>{
    console.log('Server started aat http://localhost:${port}')
});