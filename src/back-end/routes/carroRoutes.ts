import { Router } from 'express';
import carroController  from './../controllers/CarroController';

/**
   * Las rutas del carro
 */
class CarroRoutes{
    
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
        this.router.get('/', carroController.get);
        this.router.get('/:id', carroController.getOne);
        this.router.post('/', carroController.create);
        this.router.delete('/:id', carroController.delete);
        this.router.put('/:id', carroController.update);
        this.router.get('/placa/:placa', carroController.getId);
    }

}

/**
   * Exporta las rutas
 */
const carroRoute= new CarroRoutes();
export default carroRoute.router;