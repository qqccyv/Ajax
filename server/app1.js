const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const fs = require('fs')
const path = require('path');
const formidable = require('formidable')

// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: false }))
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
app.get('/server', (req, res) => {
    res.send('ok')
})
app.post('/login', (req, res) => {
    // 创建表单解析对象
    var form = formidable.IncomingForm();
    // 解析表单
    form.parse(req, (err, fields, file) => {
        // 接收客户端传递过来的用户名和密码
        const { username, password } = fields;
        // 用户名密码比对
        if (username == 'itheima' && password == '123456') {
            // 设置session
            req.session.isLogin = true;
            res.send({ message: '登录成功' });
        } else {
            res.send({ message: '登录失败, 用户名或密码错误' });
        }
    })
});

app.get('/checkLogin', (req, res) => {
    // 判断用户是否处于登录状态
    if (req.session.isLogin) {
        res.send({ message: '处于登录状态' })
    } else {
        res.send({ message: '处于未登录状态' })
    }
});


app.listen('3001');
console.log('服务器启动成功');