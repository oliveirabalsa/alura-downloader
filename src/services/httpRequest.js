const request = require("request");

/**
 * send http request with proxy
 * @param {object} options 
 */
module.exports = function http_request(options) {
    return new Promise(resolve => request(options, (error, response, body) => resolve({error, response, body})))
}