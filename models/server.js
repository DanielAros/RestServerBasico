const express = require('express')
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {
    constructor(){
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            auth:       '/api/auth',
            categorias: '/api/categorias',
            usuarios:   '/api/usuarios',
        };

        // Conectar a base de datos
        this.conectarDB();

        //Middlewares - Funciones que agregan otra funcionalidad al webserver. funcion que siempre se ejecuta cuando ejecutamos nuestro servidor.
        this.middlewares();

        //Rutas de la aplicacion
        this.routes();
    }

    async conectarDB(){
        await dbConnection();
    }

    middlewares(){

        //Cors
        this.app.use(cors()); 

        // Lectura y parseo del body
        this.app.use(express.json());

        //Directorio Publico
        this.app.use( express.static('public'));
    
    }

    routes(){
        this.app.use( this.paths.auth , require('../routes/auth'));
        this.app.use( this.paths.usuarios , require('../routes/usuarios'));
        this.app.use( this.paths.categorias , require('../routes/categorias'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo el el puerto:', process.env.PORT);
        });
    }
}

module.exports = Server;