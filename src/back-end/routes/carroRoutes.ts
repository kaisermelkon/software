import { Router } from 'express';
import carroController  from './../controllers/CarroController';

class CarroRoutes{
    
    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void{
        this.router.get('/', carroController.get);
        this.router.get('/:id', carroController.getOne);
        this.router.post('/', carroController.create);
        this.router.delete('/:id', carroController.delete);
        this.router.put('/:id', carroController.update);
        this.router.get('/placa/:placa', carroController.getId);
    }

}

const carroRoute= new CarroRoutes();
export default carroRoute.router;