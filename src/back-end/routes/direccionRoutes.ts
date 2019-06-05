import { Router } from 'express';
import direccionController  from './../controllers/DireccionController';

class DireccionRoutes{
    
    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void{
        this.router.get('/', direccionController.get);
        this.router.get('/:id', direccionController.getOne);
        this.router.post('/', direccionController.create);
        this.router.delete('/:id', direccionController.delete);
        this.router.put('/:id', direccionController.update);
        this.router.get('/:municipio/:urbanizacion/:descripcion', direccionController.getId);
    }

}

const direccionRoute= new DireccionRoutes();
export default direccionRoute.router;