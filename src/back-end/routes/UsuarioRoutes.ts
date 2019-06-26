import { Router } from 'express';
import usuariosController  from '../controllers/usuarioController';


class baseRoutes{
    
    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void{
        this.router.get('/', usuariosController.get);
        this.router.get('/:correo', usuariosController.getOne);
        this.router.post('/', usuariosController.create);
        this.router.delete('/:id', usuariosController.delete);
        this.router.put('/:id', usuariosController.update);
        this.router.get('/detalle/:id', usuariosController.getUsuarioDetalle);
    }

}

const usuarioRoutes= new baseRoutes();
export default usuarioRoutes.router;