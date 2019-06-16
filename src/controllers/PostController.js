const Post = require('../models/Post');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');


module.exports = {
    async index(req, res) { /* Assíncronos, pois nao sao em tempo real */
        /* Pegar posts existentes e ordenar de forma DESC pela data de criação */
        const posts = await Post.find().sort({_id: -1});
        return res.json(posts);
    },

    async store(req, res) {
        const { author, place, description, hashtags } = req.body;
        const { filename: image } = req.file;

        /* Image será subdividida em name e extensao */
        const[name,ext] = image.split('.');
        const fileName = `${name}.jpg`; /* concatenando novo name */

        /* Redimensionando a imagem para passa-la menor ao front-end */
        await sharp(req.file.path)
            .resize(500)
            .jpeg({ quality: 70 })
            .toFile(
                path.resolve(req.file.destination, 'resized', image)
            )

        /* Deletando imagem criada no servidor */
        fs.unlinkSync(req.file.path);

        const post = await Post.create({
            author,
            place,
            description,
            hashtags,
            image,
        });

        /* Informação em tempo reak com todos os dados desse post */
        req.io.emit('post', post);

        return res.json(post);
    }
};