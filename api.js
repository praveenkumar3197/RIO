const express = require("express");
const cors = require("cors");
const pool = require("./connection.js");
const { response } = require("express");

const app = express();

app.use(express.json());
app.use(cors());

const bodyParser = require("body-parser");
app.use(bodyParser.json());

app.post('/students', (req, res)=> {
    const firstname = req.body["firstname"];
    const lastname = req.body["lastname"];
    const location = req.body["location"];

    console.log("firstname:" + firstname);
    console.log("lastname:" + lastname);
    console.log("location:" + location);
    
    const user = req.body;
    let insertQuery = `insert into students(firstname, lastname, location) 
                       values('${firstname}', '${lastname}', '${location}')`

    pool.query(insertQuery, (err, result)=>{
        if(!err){
            res.send('Insertion was successful')
        }
        else{ console.log(err.message) }
    })
    pool.end;
})


app.get('/students', (req, res)=>{
    pool.query(`Select * from students`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
    });
    pool.end;
})

app.get('/students/:id', (req, res)=>{
    pool.query(`Select * from students where id=${req.params.id}`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
    });
    pool.end;
})


app.put('/students/:id', (req, res)=> {
    let user = req.body;
    let updateQuery = `update students
                       set firstname = '${user.firstname}',
                       lastname = '${user.lastname}',
                       location = '${user.location}'
                       where id = ${user.id}`

                       pool.query(updateQuery, (err, result)=>{
        if(!err){
            res.send('Update was successful')
        }
        else{ console.log(err.message) }
    })
    pool.end;
})

app.delete('/students/:id', (req, res)=> {
    let insertQuery = `delete from students where id=${req.params.id}`

    pool.query(insertQuery, (err, result)=>{
        if(!err){
            res.send('Deletion was successful')
        }
        else{ console.log(err.message) }
    })
    pool.end;
})
app.get('/', (req, res) => {
    res.send('hello world');
})


app.listen(3300, () => console.log("Server on localhost:3300"));
