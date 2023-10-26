const fs = require('fs')
const path = './storage/storage.json'


function getAllUsers() {
    const data = JSON.parse(fs.readFileSync(path));
    if (!data.length) throw new Error('data is empty')
    return data
}

function getById(id) {
    const data = JSON.parse(fs.readFileSync(path))
    const filtered = data.filter((el) => el.id == id)
    if (!filtered.length) throw new Error('id is not id')
    return filtered
}

function deleteUserById(id) {
    const data = JSON.parse(fs.readFileSync(path))
    const filtered = data.filter((el) => el.id != id)
    if (filtered.length == data.length) throw new Error('id is not found');
    fs.writeFileSync(path, JSON.stringify(filtered));
    return filtered
}

function updateUsersById(id) {
    const data = JSON.parse(fs.readFileSync(path))
    const filtered = data.filter((el) => el.id != id)
    if (filtered.length == data.length) throw new Error('id is not found')
    const item = {
        id, name, surname, email, pwd
    }
    filtered.push(item)
    fs.writeFileSync(path, JSON.stringify(filtered))
    return filtered
}

function createUser(id, name, surname, email, pwd) {
    const data = JSON.parse(fs.readFileSync(path))
    const filtered = data.filter((el) => el.email == email)
    if (filtered.length > 0) throw new Error('email already exist')
    const item = {
        id: data.length + 1, name, surname, email, pwd
    }
    data.push(item);
    fs.writeFileSync(path, JSON.stringify(filtered))
    return data;
}

function patchUser(id,clientObj){
    const data = JSON.parse(fs.readFileSync(path))
    const allData = data.filter((el)=>el.id==id)
    if(allData.length==0) throw new Error('id is not found')

    const newData = {...allData,...clientObj}
    const filtered = data.filter((el)=>el.id!=id)
    filtered.push(newData)
    fs.writeFileSync(path, JSON.stringify(filtered))
    return filtered;
}

module.exports = { getAllUsers, deleteUserById, getById, updateUsersById, createUser, patchUser }