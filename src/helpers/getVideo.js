const httpRequest = require('../services/httpRequest')

/**
 * get link video for download
 * @param {int} id 
 * @param {string} slug 
 * @param {string} token 
 */
module.exports = async function get_video(id, slug, token) {
    let res = await httpRequest({
        url: `https://cursos.alura.com.br/course/${slug}/task/${id}/video`,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'User-Agent': 'alura-mobi/android',
            'Host': 'cursos.alura.com.br',
            'Authorization': `Bearer ${token}`,
            'Connection': 'Keep-Alive'
        }
    });

   const video = JSON.parse(res.body).find(item => item.quality === "hd")

    return video.link;

}