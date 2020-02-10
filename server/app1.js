const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const fs = require('fs')
const path = require('path');


// app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))
    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!重要
    //ajax跨域方法
    // 拦截所有请求
app.use((req, res, next) => {
    // 1.允许哪些客户端访问我
    // * 代表允许所有的客户端访问我
    // 注意：如果跨域请求中涉及到cookie信息传递，值不可以为*号 比如是具体的域名信息
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
        // 2.允许客户端使用哪些请求方法访问我
    res.header('Access-Control-Allow-Methods', 'get,post')
        // 允许客户端发送跨域请求时携带cookie信息
    res.header('Access-Control-Allow-Credentials', true);
    next();
});
app.post('/first', (req, res) => {
    res.status(400).send('hello Ajax')
})
app.post('/responseText', (req, res) => {
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
app.get('/jsonp', (req, res) => {
    let result = req.query.callback
    res.send(result + '({name: "dengyu"})')
        // res.jsonp({ name: 'qqccyv', age: 18 })
})
app.listen('3001');
console.log('服务器启动成功');