const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()
//Middlewares
app.use(cors())
app.use(bodyParser.json({
    limit: '2mb'
}))


// Routes
app.use('/', require('./site'))

// Catch 404 Errors and forward them to error handler
app.use((req, res, next) => {
    const err = new Error('Not Found')
    err.status = 404
    next(err)
})

// Error handler function
app.use((err, req, res, next) => {
    const error = app.get('env') === 'development' ? err : {}
    const status = err.status || 500

    // Respond to client
    res.status(status).json({
        error: {
            message: error.message
        }
    })
})

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Server is listening at port ${port}`))