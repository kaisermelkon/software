import { Router } from 'express';
import gruposController  from './../controllers/GruposController';

class groupRoutes{
    
    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void{
        this.router.get('/', gruposController.get);
        this.router.get('/:id', gruposController.getOne);
        this.router.post('/', gruposController.create);
        this.router.delete('/:id', gruposController.delete);
        this.router.put('/:id', gruposController.update);
        this.router.get('/:codigo', gruposController.getCodigos);
        this.router.get('/administrador/:id', gruposController.getGruposAdministrador);
    }

}

const groupRoute= new groupRoutes();
export default groupRoute.router;