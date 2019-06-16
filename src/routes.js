const express = require('express'); /* Importanto express para a variável */
const multer = require('multer');
const uploadConfig = require('./config/upload');
const PostController = require('./controllers/PostController');
const LikeController = require('./controllers/LikeController');

const routes = new express.Router();
const upload = multer(uploadConfig);

routes.get('/posts',PostController.index); /* Criando uma rota exemplo */
routes.post('/posts',upload.single('image'),PostController.store); /* Criando uma rota exemplo */

routes.post('/posts/:id/like',LikeController.store);

module.exports = routes;