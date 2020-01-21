const server = require('express')()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const port = 5000
const cors = require('cors')
const mongoURI = 'mongodb://localhost:27017/solarspanels'

server.use(cors())

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('connect to db success')
}).catch(err => {
    console.log('error : ' + err)
})

server.use(bodyParser.json({
    extended: true,
    limit: '50mb'
}))

server.use(bodyParser.urlencoded({
    extended: true,
    limit: '50mb'
}))

// list router
server.use('/api', require('./routes/sensor'))

server.listen(port, function() {
     console.log('server started on port' + port)
 })