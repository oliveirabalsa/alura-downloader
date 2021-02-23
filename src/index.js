"use strict";
const fs = require("fs");

const logger = require("./utils/logger");
const {
  createFolder,
  getCourse,
  getVideo,
  signIn,
  videoDownloader,
} = require("./helpers/index");

const httpRequest = require('./services/httpRequest')

const jsonData = fs.readFileSync("./config.json", "utf8");
const data = JSON.parse(jsonData);
main();

/**
 * main function, where the magic happens
 * @param {string} account
 * @param {string} course
 */
async function main() {
  const { email, password, courses, formations } = data;

  logger.log(10, { email, password });

  logger.log(1, { email, password });
  console.log(signIn)
  const access_token = await signIn(email, password);

  if (!access_token) {
    logger.log(2, { email, password });
    return;
  }

  logger.log(6, { email, password });
  logger.log(7, { email, password });

  if (formations.length) {
    for (const formation of formations) {
      const res = await httpRequest({
        url: formation,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "User-Agent": "alura-mobi/android",
          Host: "cursos.alura.com.br",
          Authorization: `Bearer ${access_token}`,
          Connection: "Keep-Alive",
        },
      });
      const regex = /.\bcourse.+" /gm;
      const separate = res.response.toJSON().body.match(regex);

      for (const path of separate) {
        const pathSanitized = path.replace('" ', "");
        courses.push("https://cursos.alura.com.br" + pathSanitized);
      }
    }
  }

  for (let i = courses.length - 1; i >= 0; i--) {
    courses[i] = courses[i].split("course/");
  }

  for (const course of courses) {
    const parse = await getCourse(access_token, course[1]);
    logger.log(8, { email, password });

    const infos = JSON.parse(parse);

    logger.log(3, {
      id: infos.id,
      slug: infos.slug,
      name: infos.name,
      totalVideoTime: infos.totalVideoTime,
    });
    const folderName = infos.name.replace(":", " -");
    createFolder(folderName);

    for (const title of infos.sections) {
      logger.log(4, { title: title.titulo });
      createFolder(`${folderName}/${title.position} - ${title.titulo}`);

      for (const lesson of title.videos) {
        const folderLesson = lesson.nome.replace(":", " -");
        const url = await getVideo(lesson.id, infos.slug, access_token);
        logger.log(5, { lesson: lesson.nome, id: lesson.id });
        videoDownloader(
          `${folderName}/${title.position} - ${title.titulo}/${lesson.position} - ${folderLesson}.mp4`,
          url,
          folderLesson
        );
      }
    }
  }
}
