const httpRequest = require('../services/httpRequest')
/**
 * Login in account
 * @param {string} mail 
 * @param {string} pass 
 */
module.exports = async function sign_in(mail, pass) {

    const res = await httpRequest({
        url: 'https://cursos.alura.com.br/mobile/token',
        method: 'POST',
        body: `password=${pass}&client_secret=3de44ac5f5bccbcfba14a77181fbdbb9&client_id=br.com.alura.mobi&username=${mail}&grant_type=password`,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'User-Agent': 'alura-mobi/android',
            'Host': 'cursos.alura.com.br',
            'Connection': 'Keep-Alive'
        }
    })

    if (res.body.includes('access_token'))
        return JSON.parse(res.body).access_token;

    return false

}