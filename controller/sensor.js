const sensorModel = require('../models/sensor')
const sensorRealtimeModel = require('../models/sensorRealtime')
const bcrypt = require('bcryptjs')

var moment = require('moment');
//insert sensor
exports.insertSensor = (suhu, kelembaban, sensor) =>
    new Promise((resolve, reject) => {
        let dataSensor = new sensorModel({
            suhu: suhu,
            kelembaban: kelembaban,
            mac: sensor,
            tanggal: new Date()
        })
        //update data sensor
        sensorRealtimeModel.update({ "suhu.id": 'suhu', "kelembaban.id": 'kelembaban' }, {
            $set: {
                "suhu.data": suhu,
                "kelembaban.data": kelembaban,
                tanggal: new Date()
            }
            //ketika data yang di update kosong,akan insert terlebih dahulu
        }, { upsert: true }).then(() => {
            dataSensor.save()
                .then(res => {
                    resolve({
                        error: false,
                        pesan: 'berhasil input data'
                    })
                })
                .catch(() => {
                    reject({
                        error: true,
                        pesan: 'gagal input data'
                    })
                })
        }).catch(err => console.log(err))

    })


// exports.getSensorRealTime = () =>
//     new Promise((resolve, reject) => {
//         sensorRealtimeModel.find({}).then(result => {
//             resolve(result[0])
//         }).catch(err => {
//             reject(err)
//         })
//     })

// exports.getHistory = () =>
//     new Promise((resolve, reject) => {
//         sensorModel.find({}).then(result => {
//             resolve(result)
//         }).catch(err => {
//             reject(err)
//         })
//     })

//histori nganu new
exports.getHistory = () =>
    new Promise((resolve, reject) => {
        sensorModel.find()
            .then(sensors => {
                const myDate = moment(sensors[0].tanggal).format('llll');
                // console.log(myDate)
                if (sensors.length == 0) {
                    reject({ status: 200, message: 'tidak ada data' });
                } else {
                    let dataSensor = sensors.map(p => {
                        return {
                            _id : p._id,
                            suhu: p.suhu,
                            kelembaban: p.kelembaban,
                            tanggal:  moment(p.tanggal).format('llll')
                        }
                    })
                    console.log(dataSensor)
                    resolve({ status: 200, message: dataSensor });
                }
            })

    });

//realtime nganu new
exports.getSensorRealTime = () =>
    new Promise((resolve, reject) => {
        sensorRealtimeModel.find()
            .then(realtimes => {
                const myDate = moment(realtimes[0].tanggal).format('llll');
                console.log(myDate)
                if (realtimes.length == 0) {
                    reject({ status: 200, message: 'tidak ada data' });
                } else {

                    let dataSensor = realtimes.map(p => {
                        return {
                            "suhu": {
                                "id": p.suhu.id,
                                "data": p.suhu.data
                                },
                                "kelembaban": {
                                "id": p.kelembaban.id,
                                "data": p.kelembaban.data
                                },
                                "_id": p.id,
                                "tanggal": moment(p.tanggal).format('llll')
                        }
                    })

                    resolve({ status: 200, message: dataSensor });
                }
            })

    });