import express from 'express'
import cors from 'cors'

import { carService } from './services/car.service.js'
import { loggerService } from './services/logger.service.js'

const corsOptions = {
    origin: ['http://127.0.0.1:5173', 'http://localhost:5173'],
    credentials: true
}

const app = express()
const port = 3030

app.use(cors(corsOptions))
app.use(express.static('public'))

// Car CRUDL API


app.get('/api/car', async (req, res) => {
    try {
        const cars = await carService.query()
        res.send(cars)
    } catch (err) {
        res.status(400).send(`Couldn't get cars`)
    }
})

app.get('/api/car/save', async (req, res) => {
    const { _id, vendor, speed } = req.query
    const carToSave = { _id, vendor, speed: +speed }
    
    try {
        var savedCar = await carService.save(carToSave)
        res.send(savedCar)
    } catch (err) {
        res.status(400).send(`Couldn't save car`)
    }
})

app.get('/api/car/:carId', async (req, res) => {
    const { carId } = req.params
    try {
        const car = await carService.getById(carId)
        res.send(car)
    } catch (err) {
        res.status(400).send(`Couldn't get car`)
    }
})

app.get('/api/car/:carId/remove', async (req, res) => {
    const { carId } = req.params
    
    try {
        await carService.remove(carId)
    } catch (err) {
        res.status(400).send(`Couldn't remove car`)
    }
    res.send('Deleted OK')
})

// Some example routes

app.get('/', (req, res) => {
	res.send(`<h1>Hi Express</h1>`)
})

app.get('/puki', (req, res) => {
	res.send(`<h1>Hi Puki</h1>`)
})

app.get('/nono', (req, res) => {
	res.redirect('/puki')
})

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
    loggerService.info('Up and running on port 3030')
})
