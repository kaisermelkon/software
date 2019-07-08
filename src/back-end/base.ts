import express from 'express' 
import morgan from 'morgan';
import cors from 'cors';
import { Application} from 'express';
import baseRoutes from './routes/UsuarioRoutes';
import groupRoutes from './routes/groupRoutes';
import direccionRoutes from './routes/direccionRoutes';
import pertenecesRoutes from './routes/pertenecesRoutes';
import carroRoutes from './routes/carroRoutes';
import invitacionRoutes from './routes/invitacionRoutes';

/**
* Clase de servidor
*/
class Server {

    /**
    * variable app de tipo Application
    */
    public app: Application;

    /**
    * Construye el servidor del backend
    */
    constructor(){
        this.app=express();
        this.config();
        this.routes();
    }

    /**
    * Configura el servidor del backend
    */
    config(): void{
        this.app.set('port', process.env.PORT || 3000);
        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: false}));
    }

    /**
    * Carga todas las rutas a utilizar por el backend
    */
    routes(): void{
        this.app.use('/api/usuarios', baseRoutes);
        this.app.use('/api/grupos', groupRoutes);
        this.app.use('/api/direcciones', direccionRoutes);
        this.app.use('/api/perteneces', pertenecesRoutes);
        this.app.use('/api/carros', carroRoutes);
        this.app.use('/api/invitaciones', invitacionRoutes);

        
    }

    /**
    * Inicia el servidor
    */
    start(): void{
        this.app.listen(this.app.get('port'), () => {
            console.log('hello');
        });
    }
}

/**
* Crea el servidor y lo inicia
*/
const server=new Server();
server.start();

