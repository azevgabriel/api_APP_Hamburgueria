'use strict'
/** @type {import('@adonisjs/framework/src/Env')} */

const Drive = use('Drive')

class ImportController {
  async store ({ request, response }) {

    var url;

    request.file('image', {}, async (file) => {
      try {
        const ContentType = file.headers['content-type']
        const ACL = 'public-read'
        const Key = `${(Math.random() * 100).toString-0}-${file.clientName}`

        url = await Drive.put(Key, file.stream, {
          ContentType,
          ACL
        })

      } catch (error) {
        response.status(500).send({
          error: 'Erro ao fazer upload'
        })
      }
    });

    response.status(200).send({
      url
    })

  }
}

module.exports = ImportController
