const axios = require("axios");

/**
 * video downloand and save in path
 * @param {string} path 
 * @param {string} url 
 */
module.exports = async function video_download(path, url, title) {

    const response = await axios({
        method: 'GET',
        url: url,
        responseType: 'stream'
    })

    response.data.pipe(fs.createWriteStream(path))
    return new Promise((resolve, reject) => {
        response.data.on('end', () => {
            logger.log(9, {title})
            resolve()
        })

        response.data.on('error', () => {
            reject()
        })
    })
}