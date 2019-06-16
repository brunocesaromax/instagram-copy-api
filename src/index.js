/* Importação de dependencias */
const express = require('express'); /* Importanto express para a variável */
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');


const app = express(); /* Cria o servidor */

const server = require('http').Server(app);
/* Suporta tanto o protocolo http como o websocket */
const io = require('socket.io')(server);

/* Conexão com o banco de dados */
mongoose.connect('mongodb+srv://root:root@cluster0-mcl23.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser : true,
});

/* Criando o próprio middleware */
app.use((req,res,next)=>{
    req.io = io;
    
    next();
})

/* Acessível para qualquer aplicação utilizar o backend */
app.use(cors());

app.use('/files',express.static(path.resolve(__dirname,'..','uploads','resized')));

app.use(require('./routes'));

server.listen(3333)