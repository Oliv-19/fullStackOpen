const resetDB = async(req) => {
    await req.post('http://localhost:3003/api/tests/reset')
}

const createUser = async(req,  username, password, name) => {
    await req.post('http://localhost:3003/api/users', {
        data: {
            name: name,
            username: username,
            password: password
        }
    })
}

module.exports= { resetDB, createUser}