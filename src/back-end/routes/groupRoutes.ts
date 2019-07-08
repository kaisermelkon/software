import { Router } from 'express';
import gruposController  from './../controllers/GruposController';

/**
   * Las rutas del grupo
 */
class groupRoutes{
   
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
        this.router.get('/', gruposController.get);
        this.router.get('/:id', gruposController.getOne);
        this.router.post('/', gruposController.create);
        this.router.delete('/:id', gruposController.delete);
        this.router.put('/:id', gruposController.update);
        this.router.get('/:codigo', gruposController.getCodigos);
        this.router.get('/administrador/:id', gruposController.getGruposAdministrador);
        this.router.get('/perteneces/:codigo', gruposController.getGrupoCodigo);
        this.router.get('/detalle/:id', gruposController.getGrupoDetalle);
    }

}

/**
   * Exporta las rutas
 */
const groupRoute= new groupRoutes();
export default groupRoute.router;