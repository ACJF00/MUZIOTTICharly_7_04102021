// Imports
const express = require('express');
const bodyParser = require('body-parser');
const apiRouter = require('./apiRouter').router;
const cors = require('cors');
const path = require('path');

// Instanciation serveur
const server = express();

server.use(express.json());

// Body-Parser config
server.use(bodyParser.json());

/**  CORS policy
const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

server.use(cors(corsOptions))*/

// Configure routes
server.get('/', function (req, res) {
    res.setHeader('Content-Type', 'text/html', 'Access-Control-Allow-Origin: *' ),
        res.status(200).send('<h1>Hi on my server</h1>')
})

server.use(cors())



server.use('/api/', apiRouter);
server.use('/images', express.static(path.join(__dirname, 'images')))

// Launch server
server.listen(3000, function() {
    console.log('Serveur en écoute');
});