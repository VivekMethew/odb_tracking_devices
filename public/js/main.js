var socket = io('http://localhost:3000');
let user = document.getElementById('username')
let grp = document.getElementById('group')



socket.on('message', (message) => {
    console.log('MESSAGES', message)
})


socket.on('groupData', (data) => {
    console.log('room users ', data)
})

function joinUsers() {
    let username = user.value;
    let group = grp.value;
    if (!username && !group) {
        alert('Username/group is required')
    } else {
        console.log(`username ${username} and group ${group}`)
        socket.emit('join', { username, group }, (error) => {
            if (error) {
                console.log(error)
            }
            console.log('joined...')
        })
    }
}

function startTracking() {
    console.log('clicked....')
    socket.emit('startTracking', 'start tracking', (error) => {
        if (error) {
            console.log(error)
        }
        console.log('starting...')
        socket.on('broadcast', (data) => {
            if (data) {
                console.log(data)
            }
        })
    })
}