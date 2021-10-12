//NOTE: All db connections are managed here
const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/user')
const countries = require('../models/countries')

const mongoose = require('mongoose')
const db = "mongodb+srv://dukeovie:applemacbook@eventsdb.3dawe.mongodb.net/eventsdb?retryWrites=true&w=majority"

mongoose.connect(db, err => {
    if (err) {
        console.error('Error! ' + err)
    } else {
        console.log('Connected to mongodb')
    }
})

function verifyToken(req, res, next) {
    if(!req.headers.authorization) {
        return res.status(401).send('Unauthorized request')
    }
    let token = req.headers.authorization.split(' ')[1]
    if (token === 'null') {
        return res.status(401).send('Unauthorized request')
    }
    let payload = jwt.verify(token, 'secretKey')
    if (!payload) {
        return res.status(401).send('Unauthorized request')
    }
    req.userId = payload.subject
    next()
}

router.get('/', (req, res) => {
    res.send('FROM API route');
})

router.post('/register', (req, res) => {
    let userData = req.body
    let user = new User(userData)
    user.save((error, registeredUser) => {
        if (error) {
            console.log(error)
        } else {
            let payload = { subject: registeredUser._id }
            let token = jwt.sign(payload, 'secretKey')
            console.log(token)
            res.status(200).json({token})
        }   
    })
})

router.post('/login', (req, res) => {
    //first extract the userData
    let userData = req.body
    //query the userID
    User.findOne({ email: userData.email}, (error, user) => {
        if (error) {
            console.log(error)
        } else {
            //check if user exist with emailID
            if (!user) {
                res.status(401).send('Invalid email')
            } else 
            //verify password
            if (user.password !== userData.password) {
                res.status(401).send('Invalid password')
            } else {
                //return user details if successful
                let payload = { subject: user._id }
                let token = jwt.sign(payload, 'secretKey')
                res.status(200).send({token})
            }
        }
    })
})

router.get('/countries', (req, res) => {   
    res.json(countries)
})

router.get('/details/:_id', verifyToken, (req, res) => {
    const id = req.params._id;
    const country = countries.filter(country => country._id == id)
    res.json(country)
})

module.exports = router;