//import dataservice file
const dataService = require('./service/dataservice')

//import cors 
const cors=require("cors")

//import json web token
const jwt = require('jsonwebtoken')

//import express

const express = require("express")


//create app using express

const app = express()

//connection string to frontend integration
app.use(cors({origin:'http://localhost:4200'}))

//to parse json data from req body
app.use(express.json())


//middleware

const jwtMiddleware = (req, res, next) => {
    try {
        const token = req.headers['access_token']
        //verify token
        const data = jwt.verify(token, "supersecretkey123")
        console.log(data);

        next()
    }
    catch {
        res.status(422).json({
            statusCode: 422,
            status: false,
            message: 'please login first'
        })

    }
}

// register - post
app.post('/register', (req, res) => {

    dataService.register(req.body.uname, req.body.acno, req.body.pasw).then(result => {

        //convert object to json and send as response
        res.status(result.statusCode).json(result)

    })


})


//login
app.post('/login', (req, res) => {

    dataService.login(req.body.acno, req.body.pasw).then(result => {

        //convert object to json and send as response
        res.status(result.statusCode).json(result)

    })

    // console.log(req.body);
    // res.send('success')

})

//deposite
app.post('/deposite', jwtMiddleware, (req, res) => {

    dataService.deposite(req.body.acnum, req.body.password, req.body.amount).then(result => {
        //convert object to json and send as response
        res.status(result.statusCode).json(result)
    })




})

//withdraw
app.post('/withdraw', jwtMiddleware, (req, res) => {

    dataService.withdraw(req.body.acnum, req.body.password, req.body.amount).then(result => {
        //convert object to json and send as response
        res.status(result.statusCode).json(result)
    })


    // console.log(req.body);
    // res.send('success')

})

//getTransaction   
app.post('/transaction', jwtMiddleware, (req, res) => {

    dataService.getTransaction(req.body.acno).then(result => {
        
        res.status(result.statusCode).json(result)
        //  res.json(result)
    })


    // console.log(req.body);
    // res.send('success')

})

//delete
app.delete('/delete/:acno',jwtMiddleware,(req,res)=> {
    
    dataService.deleteAcc(req.params.acno).then(result=>{
        
        res.status(result.statusCode).json(result)
    })
})










//create port

app.listen(3000, () => { console.log("server started at port number 3000"); })