const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const fs = require('fs')
const path = require('path');
const formidable = require('formidable')
var session = require('express-session');
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
        // 2.允许客户端使用哪些请求方法访问我
    res.header('Access-Control-Allow-Methods', 'get,post')
        // 允许客户端发送跨域请求时携带cookie信息
    res.header('Access-Control-Allow-Credentials', true);
    next();
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
            // 设置session  需要express-session模块支持！！！！
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