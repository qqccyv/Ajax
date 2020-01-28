const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const fs = require('fs')
const path = require('path');


// app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

app.post('/first', (req, res) => {
    res.status(400).send('hello Ajax')
})
app.get('/responseText', (req, res) => {
    res.send({ "name": "dengyu" })
})
app.get('/get', (req, res) => {
    res.send(req.query)
})
app.post('/post', (req, res) => {
    res.send(req.body)
})
app.post('/json', (req, res) => {
    res.send(req.body)
})
app.post('/readystate', (req, res) => {
    res.send('hello state')
})
app.get('/error', (req, res) => {
    res.status(400).send('not ok')
})
app.get('/cache', (req, res) => {
    // fs.readFile('./test.txt', 'utf8', (err, data) => {
    //     res.send(data)
    // })
    res.send(req.query)
})
app.listen('3000');
console.log('服务器启动成功');