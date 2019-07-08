import { Request, Response } from 'express';
import pool from '../database';

/**
   * Controlador de direccion
 */
class DireccionController{

     /**
   * Obtiene todas las direcciones
 */
    public async get (req: Request, res: Response){
        const direcciones=await pool.query("SELECT * FROM direccions");
        res.json(direcciones);
    }
    
    /**
   * Obtiene una direccion
   * @param {string} id El id de la direccion a obtener
 */
    public async getOne (req: Request, res: Response): Promise<any> {
        const {id}=req.params;
        const direcciones=await pool.query("SELECT * FROM direccions WHERE id = ?",  [id]);
        if(direcciones.length>0){
            return res.json(direcciones[0]);
        }
        res.status(404).json({text: "Direccion no encontrado"});
    }

     /**
   * Crea una direccion
   * @param {Direccion} direccion La direccion a crear en la base de datos
 */
    public async create (req: Request, res: Response): Promise<void> {
        await pool.query("INSERT INTO direccions set ?", [req.body]);
        res.json({message: 'Direccion creado'});
    }

    /**
   * Elimina una direccion
   * @param {string} id El id de la direccion a eliminar
 */
    public async delete (req: Request, res: Response): Promise<void> {
        const {id}=req.params;
        await pool.query("DELETE FROM direccions WHERE id = ?", [id]);
        res.json({text: 'Direccion eliminado'});
    }

    /**
   * Actualiza una direccion
   * @param {Direccion} direccion La direccion a actualizar
   * @param {string} id El id de la direccion a actualizar
 */
    public async update (req: Request, res:Response): Promise<void> {
        const {id}=req.params;
        await pool.query('UPDATE direccions SET ? WHERE id = ?', [req.body, id]);
        res.json({text: "Direccion actualizado"});
    }
    
    /**
   * Obtiene el id de una direccion
   * @param {string} municipio El municipio donde se encuentra
   * @param {string} urbanizacion La urbanizacion donde se encuentra
   * @param {string} descripcion La descripcion de la direccion
 */
    public async getId (req: Request, res: Response): Promise<any> {
        const {municipio}=req.params;
        const {urbanizacion}=req.params;
        const {descripcion}=req.params;
        const direcciones=await pool.query("SELECT * FROM direccions WHERE municipio = ? AND urbanizacion = ? AND descripcion = ?", [municipio, urbanizacion, descripcion]);
        if(direcciones.length>0){
            return res.json(direcciones[0].id);
        }
        res.status(404).json({text: "Id no encontrado"});
    }
}

/**
   * Se exporta el controlador
 */
const direccionController=new DireccionController();
export default direccionController;