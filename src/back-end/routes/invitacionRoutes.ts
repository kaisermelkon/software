import { Router } from 'express';
import invitacionController  from './../controllers/InvitacionController';

class InvitacionRoutes{
    
    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void{
        this.router.get('/', invitacionController.get);
        this.router.get('/:id', invitacionController.getOne);
        this.router.post('/', invitacionController.create);
        this.router.delete('/:id', invitacionController.delete);
        this.router.put('/:id', invitacionController.update);
        this.router.get('/solicitud/:usuarioExId', invitacionController.getInvitacionesUsuario);
    }

}

const invitacionRoute= new InvitacionRoutes();
export default invitacionRoute.router;
