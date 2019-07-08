import { Request, Response } from 'express';
import pool from '../database';

/**
   * Controlador de grupo
 */
class GruposController{

    /**
   * Obtiene todos los grupos
 */
    public async get (req: Request, res: Response){
        const grupos=await pool.query("SELECT * FROM grupos");
        res.json(grupos);
    }
    
    /**
   * Obtiene un grupo
   * @param {string} id El id del grupo a obtener
 */
    public async getOne (req: Request, res: Response): Promise<any> {
        const {id}=req.params;
        const grupos=await pool.query("SELECT * FROM grupos WHERE id = ?", [id]);
        if(grupos.length>0){
            return res.json(grupos[0]);
        }
        res.status(404).json({text: "Group not found"});
    }

    /**
   * Crea un grupo
   * @param {Grupo} grupo El grupo a crear en la base de datos
 */
    public async create (req: Request, res: Response): Promise<void> {
        await pool.query("INSERT INTO grupos set ?", [req.body]);
        res.json({message: 'group created'});
    }

    /**
   * Elimina un grupo
   * @param {string} id El id del grupo a eliminar
 */
    public async delete (req: Request, res: Response): Promise<void> {
        const {id}=req.params;
        await pool.query("DELETE FROM grupos WHERE id = ?", [id]);
        res.json({text: 'group deleted'});
    }

    /**
   * Actualiza un grupo
   * @param {Grupo} grupo El grupo a actualizar
   * @param {string} id El id del grupo a actualizar
 */
    public async update (req: Request, res:Response): Promise<void> {
        const {id}=req.params;
        await pool.query('UPDATE grupos SET ? WHERE id = ?', [req.body, id]);
        res.json({text: "group updated"});
    }

      /**
   * Obtiene todos los grupos de un usuario
   * @param {string} codigo El codigo del grupo
 */
    public async getCodigos(req: Request, res:Response){
        const {codigo}=req.params;
        const grupos=await pool.query("SELECT * FROM grupos WHERE codigo = ?", [codigo]);
        if(grupos.length>0){
            res.send(true);
            console.log(true);
            return true;
        }
        res.send(false);
        return false;
    }

    /**
   * Obtiene todos los grupos de un administrador
   * @param {string} id El id del administrador
 */
    public async getGruposAdministrador(req: Request, res: Response){
        const {id}=req.params;
        const grupos=await pool.query("SELECT * FROM grupos WHERE administradorId = ?", [id]);
        res.json(grupos);
    }

      /**
   * Obtiene todos los grupos de un codigo
   * @param {string} codigo El codigo del grupo
 */
    public async getGrupoCodigo(req: Request, res: Response){
        const {codigo}=req.params;
        const grupo=await pool.query("SELECT * FROM grupos WHERE codigo = ?", [codigo]);
        if(grupo.length>0){
            return res.json(grupo[0].id);
        }
        res.status(404).json({text: "grupo no encontrado"});
    }

     /**
   * Obtiene al grupo 
   * @param {string} id El id del grupo
 */
    public async getGrupoDetalle (req: Request, res: Response): Promise<any> {
        const {id}=req.params;
        const grupos=await pool.query("SELECT * FROM grupos WHERE id = ?", [id]);
        if(grupos.length>0){
            return res.json(grupos[0]);
        }
        res.status(404).json({text: "Group not found"});
    }
}

 /**
   * Se exporta el controlador
 */
const gruposController=new GruposController();
export default gruposController;