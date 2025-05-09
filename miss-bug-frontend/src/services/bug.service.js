
import { utilService } from './util.service.js'
// import { userService } from './user.service.js'

import Axios from 'axios'
const axios = Axios.create({
    withCredentials: true,
})

const STORAGE_KEY = 'bugDB'
const BASE_URL = 'http://127.0.0.1:3031/api/bug/'
// const BASE_URL = '/api/bug/'

export const bugService = {
    query,
    getById,
    save,
    remove,
    getEmptyBug,
    // getRandomBug,
    getDefaultFilter
}

async function query(filterBy = {}) {
    try {
        const { data: bugs } = await axios.get(BASE_URL, { params: filterBy })
        return bugs
    } catch (err) {
        console.log('err:', err)
        throw err
    }
}

async function getById(bugId) {
    try {
        const { data: bug } = await axios.get(BASE_URL + bugId)
        return bug
    } catch (err) {
        console.log('err:', err)
        throw err
    }
}

function remove(bugId) {
    try {
        return axios.get(BASE_URL + bugId )
    } catch (err) {
        console.log('err:', err)
        throw err
    }
}


async function save(bug) {

    const method = bug._id ? 'put' : 'post'

    try {
        const { data: savedBug } = await axios[method](BASE_URL + (bug._id || ''), bug)
        return savedBug
    } catch (err) {
        console.log('err:', err)
        throw err
    }
}

function getEmptyBug() {
    return {
        title: '',
        severity: '',
        labels: '',
    }
}

// function getRandomBug() {
//     return {
//         vendor: 'Susita-' + (Date.now() % 1000),
//         price: utilService.getRandomIntInclusive(1000, 9000),
//         speed: utilService.getRandomIntInclusive(90, 200),
//     }
// }

function getDefaultFilter() {
    return { title: '', severity: '', labels: '' }
}

// TEST DATA
// storageService.post(STORAGE_KEY, {vendor: 'Subali Rahok 6', price: 980}).then(x => console.log(x))


