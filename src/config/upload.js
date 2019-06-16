const multer = require('multer');
const path = require('path'); /* trabalhar com caminhos em UNIX e windows */

module.exports = {
    storage: new multer.diskStorage({
        destination: path.resolve(__dirname, '..','..','uploads'),
        filename: function(req,file,cb){ /* Salvando imagem com nome nativo */
            cb(null, file.originalname);
        }
    })
};
