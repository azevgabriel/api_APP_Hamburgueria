'use strict'
/** @type {import('@adonisjs/framework/src/Env')} */

const fs = require('fs');
const Drive = use('Drive')
const Coupon = use('App/Models/Coupon');

class ImportController {
  async store ({ params, request, response }) {

    const {id} = request.params;
    const coupon = await Coupon.find(id);

    if(!coupon){
      return response.status(404).send({
        message: "Cupom não existente"
      })
    }

    const image = request.file('image');

    if(image.size > 1000000){
      return response.status(400).send({
        message: "Imagem muito grande! Tamanho máximo 1mb."
      })
    }

    if(!image){
      return response.status(400).send({
        message: "Imagem não enviada"
      })
    }

    const ContentType = image.headers['content-type'];
    const ACL = 'public-read';
    const Key = `${(Math.random() * 100).toString(36)}-${image.clientName}`;
    //let buffer = Buffer.from(JSON.stringify(image), "utf-8");
    //buffer.toString("base64")
    const fileStream = fs.createReadStream(image.tmpPath)

    fileStream.on('error', (err) => console.log(err))

    console.log(ContentType, ACL, Key);

    try {
      const url = await Drive.put(Key, fileStream, {
        ContentType,
        ACL
      })

      const data = {
        'image': url,
      }

      if(coupon.image !== null){
        const nameFile = coupon.image.split('/').pop();
        await Drive.delete(nameFile);
      }

      coupon.merge(data);
      await coupon.save();
    } catch (error) {
      return response.status(error.statusCode).json({
        'error' : error.message
      });
    }

    return response.status(200).send({
      message: 'Importação realizada com sucesso'
    })
  }
}

module.exports = ImportController
