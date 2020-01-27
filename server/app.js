const express = require('express');
const app = express();
const bodyParser = require('body-parser')

const path = require('path');


app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')))

app.get('/first', (req, res) => {
    res.send('hello Ajax')
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
app.listen('3000');
console.log('服务器启动成功');