import { makeId, readJsonFile, writeJsonFile } from '../../services/utils.js'

export const bugService = {
    query,
    getById,
    remove,
    save
}

const PAGE_SIZE = 3

const bugs = readJsonFile('./data/bug.json')
console.log(bugs)

async function query(filterBy) {
    let bugsToDisplay = bugs
    console.log(bugs)

    try {
        if (filterBy.title) {
            const regExp = new RegExp(filterBy.title, 'i')
            bugsToDisplay = bugsToDisplay.filter(bug => regExp.test(bug.title))
        }

        if (filterBy.severity) {
            bugsToDisplay = bugsToDisplay.filter(bug => bug.severity >= filterBy.severity)
        }
        
        if (filterBy.labels) {
            bugsToDisplay = bugsToDisplay.filter(bug => bug.labels = filterBy.labels)
        }
        
        if (filterBy.pageIdx !== undefined && !isNaN(filterBy.pageIdx)) {
            const startIdx = filterBy.pageIdx * PAGE_SIZE
            bugsToDisplay = bugsToDisplay.slice(startIdx, startIdx + PAGE_SIZE)
        }

        return bugsToDisplay
    } catch (err) {
        throw err
    }
}

async function getById(bugId) {
    try {
        const bug = bugs.find(bug => bug._id === bugId)
        if (!bug) throw new Error('Cannot find bug')
        return bug
    } catch (err) {
        throw err
    }
}

async function remove(bugId) {
    try {
        const bugIdx = bugs.findIndex(bug => bug._id === bugId)
        if (bugIdx === -1) throw new Error('Cannot find bug')
        bugs.splice(bugIdx, 1)
        await saveBugsToFile()
    } catch (err) {
        console.log('err:', err)
    }
}

async function save(bugToSave) {
    try {
        if (bugToSave._id) {
            const bugIdx = bugs.findIndex(bug => bug._id === bugToSave._id)
            if (bugIdx === -1) throw new Error('Cannot find bug')
            bugs[bugIdx] = bugToSave
        } else {
            bugToSave._id = makeId()
            bugs.unshift(bugToSave)
        }
        await saveBugsToFile()
        return bugToSave
    } catch (err) {
        throw err
    }
}


function saveBugsToFile() {
    return writeJsonFile('./data/bug.json', bugs)
}
