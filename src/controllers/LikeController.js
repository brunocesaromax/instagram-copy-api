const Post = require('../models/Post');

module.exports = {
    async store(req,res){

        const post = await Post.findById(req.params.id);
        post.likes +=1;
        await post.save();

        /* A partir de criação do novo like , todos os usuarios vao receber uma mensagem com essa informação em tempo real */
        req.io.emit('like', post);

        return res.json(post);
    }
};