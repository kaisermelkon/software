import { Request, Response } from 'express';
import pool from '../database';

/**
   * Controlador de perteneces
 */
class PertenecesController{

    /**
   * Obtiene todos los perteneces
 */
    public async get (req: Request, res: Response){
        const perteneces=await pool.query("SELECT * FROM perteneces");
        res.json(perteneces);
    }
   
    /**
   * Obtiene un perteneces
   * @param {string} id El id del perteneces a obtener
 */
    public async getOne (req: Request, res: Response): Promise<any> {
        const {id}=req.params;
        const perteneces=await pool.query("SELECT * FROM perteneces WHERE id = ?",  [id]);
        if(perteneces.length>0){
            return res.json(perteneces[0]);
        }
        res.status(404).json({text: "perteneces no encontrado"});
    }

    /**
   * Crea un perteneces
   * @param {Perteneces} perteneces El perteneces a crear en la base de datos
 */
    public async create (req: Request, res: Response): Promise<void> {
        await pool.query("INSERT INTO perteneces set ?", [req.body]);
        res.json({message: 'perteneces creado'});
    }

     /**
   * Elimina un perteneces
   * @param {string} id El id del perteneces a eliminar
 */
    public async delete (req: Request, res: Response): Promise<void> {
        const {id}=req.params;
        await pool.query("DELETE FROM perteneces WHERE id = ?", [id]);
        res.json({text: 'perteneces eliminado'});
    }

     /**
   * Actualiza un perteneces
   * @param {Perteneces} perteneces El perteneces a actualizar
   * @param {string} id El id del perteneces a actualizar
 */
    public async update (req: Request, res:Response): Promise<void> {
        const {id}=req.params;
        await pool.query('UPDATE perteneces SET ? WHERE id = ?', [req.body, id]);
        res.json({text: "perteneces actualizado"});
    }
  
    /**
   * Obtiene todos los perteneces de un usuario
   * @param {string} usuarioId El id del usuario
 */
    public async getPerGrupos (req: Request, res: Response): Promise<any> {
        const {usuarioId}=req.params;
        
        const perteneces=await pool.query("SELECT * FROM perteneces WHERE usuarioId = ?", [usuarioId]);
        const gruposId=[];
        console.log(perteneces+" esto es perteneces")
        if(perteneces.length>0){
            for(let pert of perteneces){
                console.log(pert + " esto es pert");
                gruposId.push(pert.grupoId);
            }
            console.log(gruposId+" esto es grupos id");
            return res.json(gruposId);
        }
        res.status(404).json({text: "perteneces no encontrado"});
    }

    /**
   * Obtiene todos los usuarios de un grupo
   * @param {string} grupoId El id del grupo
 */
    public async getPerUsuarios (req: Request, res: Response): Promise<any> {
        const {grupoId}=req.params;
        console.log(grupoId+"hiodhioqhdhwhda");
        const perteneces=await pool.query("SELECT * FROM perteneces WHERE grupoId = ?", [grupoId]);
        const usuariosId=[];
        console.log(perteneces+" esto es perteneces")
        if(perteneces.length>0){
            for(let pert of perteneces){
                console.log(pert + " esto es pert");
                usuariosId.push(pert.usuarioId);
            }
            console.log(usuariosId+" esto es usuarios id");
            return res.json(usuariosId);
        }
        res.status(404).json({text: "perteneces no encontrado"});
    }

    /**
   * Obtiene el pertenecs de un usuario en un grupo
   * @param {string} grupoId El id del grupo
   * @param {string} usuarioId El id del usuario
 */
    public async getPerUsuariosGrupos (req: Request, res: Response): Promise<any> {
        const {grupoId}=req.params;
        const {usuarioId}=req.params;
        console.log(grupoId+"hiodhioqhdhwhda");
        const perteneces=await pool.query("SELECT * FROM perteneces WHERE grupoId = ? AND usuarioId = ?", [grupoId, usuarioId]);
        if(perteneces.length>0){
            return res.json(perteneces[0].id);
        }
        res.status(404).json({text: "perteneces no encontrado"});
    }

     /**
   * Revisa si un usaurio pertenece a un grupo
   * @param {string} grupoId El id del grupo
   * @param {string} usuarioId El id del usuario
   * @return la respuesta del servidor
 */
    public async getPerUsuariosGruposBoolean (req: Request, res: Response): Promise<any> {
        const {grupoId}=req.params;
        const {usuarioId}=req.params;
        console.log(grupoId+"hiodhioqhdhwhda");
        const perteneces=await pool.query("SELECT * FROM perteneces WHERE grupoId = ? AND usuarioId = ?", [grupoId, usuarioId]);
        if(perteneces.length>0){
            return res.json(false);
        }
        res.status(404).json({text: "perteneces no encontrado"});
    }
}

 /**
   * Exporta el controlador
 */
const pertenecesController=new PertenecesController();
export default pertenecesController;