import { Router } from 'express';
import invitacionController  from './../controllers/InvitacionController';

/**
   * Las rutas de las invitaciones
 */
class InvitacionRoutes{
    
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
        this.router.get('/', invitacionController.get);
        this.router.get('/:id', invitacionController.getOne);
        this.router.post('/', invitacionController.create);
        this.router.delete('/:id', invitacionController.delete);
        this.router.put('/:id', invitacionController.update);
        this.router.get('/solicitud/:usuarioExId', invitacionController.getInvitacionesUsuario);
    }

}

/**
   * Exporta las rutas
 */
const invitacionRoute= new InvitacionRoutes();
export default invitacionRoute.router;
