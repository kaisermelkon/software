import { Router } from 'express';
import usuariosController  from '../controllers/usuarioController';

/**
   * Las rutas del usuario
 */
class baseRoutes{
    
    /**
   * variable router del tipo Router
   * para redirigir al controlador
 */
    public router: Router = Router();

    /**
   * Corre el metodo config
 */
    constructor(){
        this.config();
    }

     /**
   * Corre el controlador con sus respectivas rutas
 */
    config(): void{
        this.router.get('/', usuariosController.get);
        this.router.get('/:correo', usuariosController.getOne);
        this.router.post('/', usuariosController.create);
        this.router.delete('/:id', usuariosController.delete);
        this.router.put('/:id', usuariosController.update);
        this.router.get('/detalle/:id', usuariosController.getUsuarioDetalle);
    }

}

/**
   * Exporta las rutas
 */
const usuarioRoutes= new baseRoutes();
export default usuarioRoutes.router;