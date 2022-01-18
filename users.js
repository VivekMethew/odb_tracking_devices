const users = []
module.exports = {
    addUsers: ({ id, username, group }) => {
        username = username.trim().toLowerCase()
        group = group.trim().toLowerCase()

        if (!username || !group) {
            return {
                error: 'username and group are required'
            }
        }

        const existinguser = users.find((user) => user.username === username && user.group === group)

        // Validate username
        if (existinguser) {
            return {
                error: 'Username is in use!'
            }
        }

        // store user
        const user = { id, username, group }
        users.push(user)
        return { user }
    },
    getAllUsers: () => {
        return users.length !== 0 ? users : null
    },
    getAllUsersByGroup: () => {
        return users.length !== 0 ? users : null
    },
    generateMessage :(username, text) => {
        return {
            username,
            text,
            createdAt: new Date().getTime()
        }
    },
    getUser : (id) => {
        return users.find((user) => user.id === id)
    },
    removeUser : (id) => {
        const index = users.findIndex((user) => user.id === id)
    
        if (index !== -1) {
            return users.splice(index, 1)[0]
        }
    },
    getUsersInRoom : (group) => {
        group = group.trim().toLowerCase()
        return users.filter((user) => user.group === group)
    }
}