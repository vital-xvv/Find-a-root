const express = require('express');
const path = require('path');
const findRoot = require("./js/newton");
const validInterval = require('./js/validateInterval');
const createPath = (page) => path.resolve(__dirname, "view", `${page}.html`);



// ---------- Creating Server ---------- //
const server = express();
const PORT = process.env.PORT || 3000;;
server.listen(PORT, '0.0.0.0', (error) => {
if(error) console.log(error);
else console.log(`listening port ${PORT}`)});


// ---------- Middlewares ---------- //
server.use(express.static('view'));
server.use(express.static('styles'));
server.use(express.static("js"));
server.use(express.urlencoded({extended:false}));



// ---------- Routing ---------- //
server.get('/', (req, res) => {
    res.sendFile(createPath("index"));
});

server.get('/home', (req, res) => {
    res.redirect('/');
});

server.post('/data', (req, res) => {
    var a = parseFloat(req.body.a)
    var b = parseFloat(req.body.b)
    var e = parseFloat(req.body.e)
    var root = {}
    if(validInterval(a, b)){
        root = findRoot(b, e)
        res.json(root);
    }
    else {
        root = {x: null, iter: 0}
        res.json(root);
    }
    
});


// ---------- Middlewares ---------- //
server.use((req, res) => {
    res.statusCode = 404;
    res.send("error");
})