const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SenorSchema = new Schema({

    suhu: {
        type: String
    },
    kelembaban: {
        type: String
    },
    mac: {
        type: String
    },
    tanggal: Date
}

)

module.exports = mongoose.model('sensors', SenorSchema)