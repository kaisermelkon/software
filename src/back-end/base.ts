import express from 'express' 
import morgan from 'morgan';
import cors from 'cors';
import { Application} from 'express';
import baseRoutes from './routes/UsuarioRoutes';
import groupRoutes from './routes/groupRoutes';
import direccionRoutes from './routes/direccionRoutes';


class Server {

    public app: Application;

    constructor(){
        this.app=express();
        this.config();
        this.routes();
    }

    config(): void{
        this.app.set('port', process.env.PORT || 3000);
        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: false}));
    }

    routes(): void{
        this.app.use('/api/usuarios', baseRoutes);
        this.app.use('/api/grupos', groupRoutes);
        this.app.use('/api/direcciones', direccionRoutes)
        
    }

    start(): void{
        this.app.listen(this.app.get('port'), () => {
            console.log('hello');
        });
    }
}

const server=new Server();
server.start();

