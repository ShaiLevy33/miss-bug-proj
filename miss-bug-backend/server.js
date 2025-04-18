import express from 'express'
import { bugService } from './services/bug.service.js'
import { loggerService } from './services/logger.service.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express()

const corsOptions = {
    origin: [
        'http://127.0.0.1:5174',
        'http://localhost:5174'
    ],
    credentials: true
}

app.use(express.static('public'))
app.use(cors(corsOptions))
app.use(cookieParser())


// app.get('/', (req, res) => res.send('Hello there'))

//* ------------------- Bugs Crud -------------------
//* Read/List
app.get('/api/bug', async (req, res) => {

    const filterBy = {
        txt: req.query.txt,
        maxPrice: +req.query.maxPrice,
        minSpeed: +req.query.minSpeed
    }

    try {
        const bugs = await bugService.query(filterBy)
        res.send(bugs)
    } catch (err) {
        loggerService.error(`Couldn't get bugs`, err)
        res.status(400).send(`Couldn't get bugs`)
    }
})

//* Add/Update
app.get('/api/bug/save', async (req, res) => {
    const bugToSave = {
        _id: req.query._id,
        title: req.query.title,
        severity: req.query.severity,
        createdAt: req.query.createdAt,
        description: req.query.description
    }

    try {
        const savedBug = await bugService.save(bugToSave)
        res.send(savedBug)
    } catch (err) {
        loggerService.error(`Couldn't save bug`, err)
        res.status(400).send(`Couldn't save bug`)
    }

})

//* Read
app.get('/api/bug/:bugId', async (req, res) => {
    const { bugId } = req.params
    try {
        const bug = await bugService.getById(bugId)
        res.send(bug)
    } catch (err) {
        loggerService.error(`Couldn't get bug ${bugId}`, err)
        res.status(400).send(`Couldn't get bug`)
    }

})

//* Delete
app.get('/api/bug/:bugId/remove', async (req, res) => {
    const { bugId } = req.params
    try {
        await bugService.remove(bugId)
        res.send('OK')
    } catch (err) {
        loggerService.error(`Couldn't remove bug ${bugId}`, err)
        res.status(400).send(`Couldn't remove bug`)
    }

})

//! EXAMPLE !
// app.get('/api/admin/logs', (req,res)=>{
//     res.sendFile(process.cwd() + '/logs/backend.log')
// })

const port = 3031
app.listen(port, () => {
    loggerService.info(`Example app listening on port http://127.0.0.1:${port}/`)
})