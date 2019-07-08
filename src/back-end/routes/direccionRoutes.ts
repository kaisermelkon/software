import { Router } from 'express';
import direccionController  from './../controllers/DireccionController';

/**
   * Las rutas de direccion
 */
class DireccionRoutes{
    
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
        this.router.get('/', direccionController.get);
        this.router.get('/:id', direccionController.getOne);
        this.router.post('/', direccionController.create);
        this.router.delete('/:id', direccionController.delete);
        this.router.put('/:id', direccionController.update);
        this.router.get('/:municipio/:urbanizacion/:descripcion', direccionController.getId);
    }

}

/**
   * Exporta las rutas
 */
const direccionRoute= new DireccionRoutes();
export default direccionRoute.router;