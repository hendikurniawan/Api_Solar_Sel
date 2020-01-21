const sensor = require('express')()
const sensorController = require('../controller/sensor')
//history
sensor.post('/insert', (req, res) => {
    console.log(req.body);
    sensorController.insertSensor(req.body.suhu, req.body.kelembaban, req.body.mac)
        .then(result => {
            res.json(result)
        }).catch(err => {
            res.json(err)
        })
});
//realtime
// sensor.get('/getRealtime', (req, res) => {
//     console.log(req.body);
//     sensorController.getSensorRealTime()
//         .then(result => {
//             res.json(result)
//         }).catch(err => {
//             res.json(err)
//         })
// });
//histori
// sensor.get('/getHistori', (req, res) => {
//     console.log(req.body);
//     sensorController.getHistory()
//         .then(result => {
//             res.json(result)
//         }).catch(err => {
//             res.json(err)
//         })
// });

//get histori nganu new
sensor.get('/getHistori', (req, res) => {

    sensorController.getHistory()
        .then(result => {
            console.log(result)
            res.status(result.status).json({ success: true, message: result.message })
        })

        .catch(err => res.status(err.status).json({ success: false, message: err.message }));
});

//get real nganu new
sensor.get('/getRealtime', (req, res) => {

    sensorController.getSensorRealTime()
        .then(result => {
            console.log(result)
            res.status(result.status).json({ success: true, message: result.message })
        })

        .catch(err => res.status(err.status).json({ success: false, message: err.message }));
});

module.exports = sensor