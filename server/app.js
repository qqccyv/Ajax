const express = require('express');
const app = express();
const path = require('path');



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
app.listen('3000');
console.log('服务器启动成功');