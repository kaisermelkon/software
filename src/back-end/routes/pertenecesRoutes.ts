import { Router } from 'express';
import pertenecesController  from './../controllers/PertenecesController';

/**
   * Las rutas del pertences
 */
class PertenecesRoutes{
    
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
        this.router.get('/', pertenecesController.get);
        this.router.get('/:id', pertenecesController.getOne);
        this.router.post('/', pertenecesController.create);
        this.router.delete('/:id', pertenecesController.delete);
        this.router.put('/:id', pertenecesController.update);
        this.router.get('/perGrupos/:usuarioId', pertenecesController.getPerGrupos);
        this.router.get('/perUsuarios/:grupoId', pertenecesController.getPerUsuarios);
        this.router.get('/perteneces/:grupoId/:usuarioId', pertenecesController.getPerUsuariosGrupos);
        this.router.get('/perteneces/boolean/:grupoId/:usuarioId', pertenecesController.getPerUsuariosGruposBoolean);
    }

}

/**
   * Exporta las rutas
 */
const pertenecesRoute= new PertenecesRoutes();
export default pertenecesRoute.router;