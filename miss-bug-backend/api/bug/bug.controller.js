import { loggerService } from '../../services/logger.service.js'
import { bugService } from './bug.service.js'

export async function getBugs(req, res) {
	const filterBy = {
		title: req.query.title,
		severity: +req.query.severity,
		labels: +req.query.labels,
	}

	try {
		const bugs = await bugService.query(filterBy)
		res.send(bugs)
        console.log(bugs)
	} catch (err) {
		loggerService.error(`Couldn't get bugs`, err)
		res.status(400).send(`Couldn't get bugs`)
	}
}

export async function getBug(req, res) {
	const { bugId } = req.params
    console.log()
	try {
		const bug = await bugService.getById(bugId)
		res.send(bug)
	} catch (err) {
		loggerService.error(`Couldn't get bug ${bugId}`, err)
		res.status(400).send(`Couldn't get bug`)
	}
}

export async function updateBug(req, res) {
	const bugToSave = {
		_id: req.body._id,
		title: req.body.title,
		severity: +req.body.severity,
		description: +req.body.description,
	}

	try {
		const savedBug = await bugService.save(bugToSave)
		res.send(savedBug)
	} catch (err) {
		loggerService.error(`Couldn't save bug`, err)
		res.status(400).send(`Couldn't save bug`)
	}
}

export async function addBug(req, res) {
	const bugToSave = {
		vendor: req.body.vendor,
		speed: +req.body.speed,
		price: +req.body.price,
	}

	try {
		const savedBug = await bugService.save(bugToSave)
		res.send(savedBug)
	} catch (err) {
		loggerService.error(`Couldn't save bug`, err)
		res.status(400).send(`Couldn't save bug`)
	}
}

export async function removeBug(req, res) {
	const { bugId } = req.params
	try {
		await bugService.remove(bugId)
		res.send('OK')
	} catch (err) {
		loggerService.error(`Couldn't remove bug ${bugId}`, err)
		res.status(400).send(`Couldn't remove bug`)
	}
}
