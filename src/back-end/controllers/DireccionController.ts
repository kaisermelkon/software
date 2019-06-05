import { Request, Response } from 'express';
import pool from '../database';

class DireccionController{

    public async get (req: Request, res: Response){
        const usuarios=await pool.query("SELECT * FROM direccions");
        res.json(usuarios);
    }
    
    public async getOne (req: Request, res: Response): Promise<any> {
        const {id}=req.params;
        const direcciones=await pool.query("SELECT * FROM direccions WHERE id = ?",  [id]);
        if(direcciones.length>0){
            return res.json(direcciones[0]);
        }
        res.status(404).json({text: "Direccion no encontrado"});
    }

    public async create (req: Request, res: Response): Promise<void> {
        await pool.query("INSERT INTO direccions set ?", [req.body]);
        res.json({message: 'Direccion creado'});
    }

    public async delete (req: Request, res: Response): Promise<void> {
        const {id}=req.params;
        await pool.query("DELETE FROM direccions WHERE id = ?", [id]);
        res.json({text: 'Direccion eliminado'});
    }

    public async update (req: Request, res:Response): Promise<void> {
        const {id}=req.params;
        await pool.query('UPDATE direccions SET ? WHERE id = ?', [req.body, id]);
        res.json({text: "Direccion actualizado"});
    }
    
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

const direccionController=new DireccionController();
export default direccionController;