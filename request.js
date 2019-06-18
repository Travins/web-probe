const request = require('request')

const option = {
    method: 'GET',
    time: true,
    headers: {
        'User-Agent': `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36`
    }
}

const handleOneUrl = (url) => {
    request({
        uri: url,
        timeout: 5000,
        ...option
    }, (err, resp, body) => {
        console.log('网址：', url)
        if (err) {
            console.log('error:', err.code)
        } else {
            console.log('statusCode:', resp.statusCode)
            // console.log(err || resp.elapsedTime)
            // console.log(err || resp.timings)
            console.log('返回参数', resp.timingPhases)
        }
    })
}

const urls = [
    'https://www.shou.edu.cn/',
    // 'http://smxy.shou.edu.cn/',
    // 'http://www.taobao.com/',
    // 'http://www.baidu.com/',
    // 'http://www.163.com/',
    // 'http://www.google.com'
]

const handleUrls = (urls) => {
    urls.forEach(url => {
        handleOneUrl(url)
    })
}
handleUrls(urls)