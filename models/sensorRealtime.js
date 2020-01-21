const mongoose = require('mongoose')
const Schema = mongoose.Schema

const realTimeSchame = new Schema({

    suhu: {
        id: { type: String, default: 'suhu' },
        data: String
    },
    kelembaban: {
        id: { type: String, default: 'kelembaban' },
        data: String
    },
    mac: {
        type: String
    },
    tanggal: Date
})

module.exports = mongoose.model('realTime', realTimeSchame)