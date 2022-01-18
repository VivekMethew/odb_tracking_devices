const { addUsers, getAllUsers, generateMessage, getUsersInRoom, getUser, removeUser } = require('../users');
const queryData = require('../entity/query')
module.exports=(io)=>{
    io.on('connection', (socket) => {
        console.log('Socket id >', socket.id)
        socket.on('join', (options, callback) => {
            const { error, user } = addUsers({ id: socket.id, ...options })
            if (error) {
                return callback(error)
            }
            console.log(user)
            socket.join(user.group)
    
            socket.emit('message', generateMessage('Track Activate', `${user.username} has joined!`))
            socket.broadcast.to(user.group).emit('message', generateMessage('Track Activate', `${user.username} has joined!`))
            io.to(user.group).emit('groupData', {
                group: user.group,
                users: getUsersInRoom(user.group)
            })
    
            callback()
        })
    
        socket.on('startTracking', (data, callback) => {
            let user = getUser(socket.id)
            if (!user) {
                callback('SocketId does not matched')
            } else {
                setInterval(() => {
                    io.to(user.group).emit('broadcast', getUsersInRoom(user.group))
                }, 5000)
            }
            callback()
        })
    
        socket.on('disconnect', () => {
            console.log('socket is disconnected : ', socket.id)
            let users = removeUser(socket.id)
            console.log('socket Id :=>',socket.id)
        })
    });
}