const httpRequest = require('../services/httpRequest')

/**
 * get link video for download
 * @param {int} id 
 * @param {string} slug 
 * @param {string} token 
 */
module.exports = async function get_video(id, slug, token) {
    let res = await httpRequest({
        url: `https://cursos.alura.com.br/mobile/courses/${slug}/busca-video-${id}`,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'User-Agent': 'alura-mobi/android',
            'Host': 'cursos.alura.com.br',
            'Authorization': `Bearer ${token}`,
            'Connection': 'Keep-Alive'
        }
    });

   console.log(res.response.toJSON()); 

    let [hd, sd] = JSON.parse(res.body);
    return hd.link;

}