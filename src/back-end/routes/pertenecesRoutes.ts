import { Router } from 'express';
import pertenecesController  from './../controllers/PertenecesController';

class PertenecesRoutes{
    
    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void{
        this.router.get('/', pertenecesController.get);
        this.router.get('/:id', pertenecesController.getOne);
        this.router.post('/', pertenecesController.create);
        this.router.delete('/:id', pertenecesController.delete);
        this.router.put('/:id', pertenecesController.update);
        this.router.get('/perGrupos/:usuarioId', pertenecesController.getPerGrupos);
    }

}

const pertenecesRoute= new PertenecesRoutes();
export default pertenecesRoute.router;