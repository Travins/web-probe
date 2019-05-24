const router = require('express-promise-router')()
const request = require('request-promise-native')

const userAgents = require('./userAgents')

const handleOneUrl = async (url) => {
    const userAgent = userAgents[parseInt(Math.random() * userAgents.length)]
    const option = {
        method: 'GET',
        uri: url,
        timeout: 3000,
        time: true,
        headers: {
            'User-Agent': userAgent
        }
    }
    let result = {}
    await request(option, (err, resp) => {
        if (err) {
            result.code = err.statusCode
        } else {
            result = resp.timingPhases
            // result.code = resp.statusCode
        }
    })
    return result
}

router.route('/')
    .get(async (req, res, next) => {
        res.status(200).json({
            success: true
        })
    })
    .post(async (req, res, next) => {
        try {
            const result = await handleOneUrl(req.body.address)
            res.status(200).json({
                success: true,
                data: result
            })
        } catch (error) {
            res.status(200).json({
                success: false,
                data: error.error
            })
        }
    })

module.exports = router