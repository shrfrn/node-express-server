import fs from 'fs'

import { loggerService } from './logger.service.js'

export const carService = {
    query,
    getById,
    remove,
    save
}

var cars = readJsonFile('./data/car.json')

async function query() {
    try {
        return cars
    } catch (err) {
        loggerService.error(err)
        throw err
    }
}

async function getById(carId) {
    try {
        var car = cars.find(car => car._id === carId)
        if(!car) throw `Couldn't find car with _id ${carId}`
        return car
    } catch (err) {
        loggerService.error(err)
        throw(err)
    }
}

async function remove(carId) {
    try {
        const idx = cars.findIndex(car => car._id === carId)
        if(idx === -1) throw `Couldn't find car with _id ${carId}`
        cars.splice(idx, 1)
        
        _saveCarsToFile('./data/car.json')
    } catch (err) {
        loggerService.error(err)
        throw err
    }
}

async function save(carToSave) {
    try {
        if(carToSave._id) {
            var idx = cars.findIndex(car => car._id === carToSave._id)
            if(idx === -1) throw `Couldn't find car with _id ${carId}`
            cars.splice(idx, 1, carToSave)
        } else {
            carToSave._id = makeId()
            cars.push(carToSave)
        }
        _saveCarsToFile('./data/car.json')
        return carToSave
    } catch (err) {
        loggerService.error(err)
        throw err
    }
}

function makeId(length = 6) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }

    return txt
}

function readJsonFile(path) {
    const str = fs.readFileSync(path, 'utf8')
    const json = JSON.parse(str)
    return json
}

function _saveCarsToFile(path) {
    return new Promise((resolve, reject) => {
        const data = JSON.stringify(cars, null, 2)
        fs.writeFile(path, data, (err) => {
            if (err) return reject(err)
            resolve()
        })
    })
}