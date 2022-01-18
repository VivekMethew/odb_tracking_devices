const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server);
const path = require('path');
const router = require('./routes/routes');

app.use(express.static('public'))

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/api',require('./routes/index'))

require('./socket/socket.io')(io)

server.listen(3000, () => {
    console.log('listening on *:3000');
});