import { Request, Response } from 'express';
import pool from '../database';

 /**
   * Controlador de invitacion
 */
class InvitacionController{

     /**
   * Obtiene todos las invitaciones
 */
    public async get (req: Request, res: Response){
        const invitaciones=await pool.query("SELECT * FROM invitaciones");
        res.json(invitaciones);
    }

    /**
   * Obtiene una invitacion
   * @param {string} id El id de la invitacion a obtener
 */
    public async getOne (req: Request, res: Response): Promise<any> {
        const {id}=req.params;
        const invitaciones=await pool.query("SELECT * FROM invitaciones WHERE id = ?",  [id]);
        if(invitaciones.length>0){
            return res.json(invitaciones[0]);
        }
        res.status(404).json({text: "Invitacion no encontrada"});
    }

    /**
   * Crea una invitacion
   * @param {Invitacion} invitacion La invitacion a crear en la base de datos
 */
    public async create (req: Request, res: Response): Promise<void> {
        await pool.query("INSERT INTO invitaciones set ?", [req.body]);
        res.json({message: 'Invitacion creada'});
    }

    /**
   * Elimina una invitacion
   * @param {string} id El id de la invitacion a eliminar
 */
    public async delete (req: Request, res: Response): Promise<void> {
        const {id}=req.params;
        await pool.query("DELETE FROM invitaciones WHERE id = ?", [id]);
        res.json({text: 'Invitacion eliminada'});
    }

    /**
   * Actualiza una invitacion
   * @param {Invitacion} invitacion La invitacion a actualizar
   * @param {string} id El id de la invitacion a actualizar
 */
    public async update (req: Request, res:Response): Promise<void> {
        const {id}=req.params;
        await pool.query('UPDATE invitaciones SET ? WHERE id = ?', [req.body, id]);
        res.json({text: "Invitacion actualizada"});
    }

    /**
   * Obtiene todos las invitaciones de un usuario
   * @param {string} usuarioExId El id del usuario
 */
    public async getInvitacionesUsuario (req: Request, res: Response): Promise<any> {
        const {usuarioExId}=req.params;
        const invitaciones=await pool.query("SELECT * FROM invitaciones WHERE usuarioExId = ?",  [usuarioExId]);
        const invita=[];
        console.log("hkjwhdhdwhd")
        if(invitaciones.length>0){
            for(let inv of invitaciones){
                console.log(inv + " esto es pert");
                invita.push(inv);
            }
            console.log(invita+" esto es invitaciones id");
            return res.json(invita);
        }
        res.status(404).json({text: "Invitaciones no encontradas"});
    }
    
}

/**
   * Se exporta el controlador
 */
const invitacionController=new InvitacionController();
export default invitacionController;