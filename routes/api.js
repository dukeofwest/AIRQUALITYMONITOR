//NOTE: All db connections are managed here
const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/user')

const mongoose = require('mongoose')
const db = "mongodb+srv://dukeovie:applemacbook@eventsdb.3dawe.mongodb.net/eventsdb?retryWrites=true&w=majority"

mongoose.connect(db, err => {
    if (err) {
        console.error('Error! ' + err)
    } else {
        console.log('Connected to mongodb')
    }
})

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
            res.status(200).send({token})
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
            if (user.password != userData.password) {
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
    let countries = [
        {
            "_id": "1",
            "countryName": "Austria",
            "flag": "AUT",
            "population": "230",
            "airQuality": "90",
            "rankAirQuality": "4"
        },
        {
            "_id": "2",
            "countryName": "United States",
            "flag": "USA",
            "population": "500",
            "airQuality": "76",
            "rankAirQuality": "7"
        },
        {
            "_id": "3",
            "countryName": "Canada",
            "flag": "CAN",
            "population": "142",
            "airQuality": "92",
            "rankAirQuality": "3"
        },
        {
            "_id": "4",
            "countryName": "Germany",
            "flag": "DEU",
            "population": "120",
            "airQuality": "98",
            "rankAirQuality": "1"
        },
        {
            "_id": "5",
            "countryName": "Nigeria",
            "flag": "NGA",
            "population": "540",
            "airQuality": "85",
            "rankAirQuality": "5"
        },
        {
            "_id": "6",
            "countryName": "Nepal",
            "flag": "NPL",
            "population": "378",
            "airQuality": "80",
            "rankAirQuality": "6"
        },
        {
            "_id": "7",
            "countryName": "Portugal",
            "flag": "PRT",
            "population": "116",
            "airQuality": "93",
            "rankAirQuality": "2"
        },
    ]
    res.json(countries)
})

router.get('/details', (req, res) => {
    let countries = [
        {
            "_id": "1",
            "countryName": "Austria",
            "flag": "AUT",
            "population": "230",
            "airQuality": "90",
            "rankAirQuality": "4"
        },
        {
            "_id": "2",
            "countryName": "United States",
            "flag": "USA",
            "population": "500",
            "airQuality": "76",
            "rankAirQuality": "7"
        },
        {
            "_id": "3",
            "countryName": "Canada",
            "flag": "CAN",
            "population": "142",
            "airQuality": "92",
            "rankAirQuality": "3"
        },
        {
            "_id": "4",
            "countryName": "Germany",
            "flag": "DEU",
            "population": "120",
            "airQuality": "98",
            "rankAirQuality": "1"
        },
        {
            "_id": "5",
            "countryName": "Nigeria",
            "flag": "NGA",
            "population": "540",
            "airQuality": "85",
            "rankAirQuality": "5"
        },
        {
            "_id": "6",
            "countryName": "Nepal",
            "flag": "NPL",
            "population": "378",
            "airQuality": "80",
            "rankAirQuality": "6"
        },
        {
            "_id": "7",
            "countryName": "Portugal",
            "flag": "PRT",
            "population": "116",
            "airQuality": "93",
            "rankAirQuality": "2"
        },
    ]
    res.json(countries)
})

module.exports = router;