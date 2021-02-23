const httpRequest = require('../services/httpRequest')
/**
 * get course: video list and informations 
 * @param {sting} access_token 
 * @param {string} course 
 */
module.exports = async function get_course(access_token, course) {

    const res = await httpRequest({
        url: `https://cursos.alura.com.br/mobile/v2/course/${course}`,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'User-Agent': 'alura-mobi/android',
            'Host': 'cursos.alura.com.br',
            'Authorization': `Bearer ${access_token}`,
            'Connection': 'Keep-Alive'
        }
    })
    return res.body

}