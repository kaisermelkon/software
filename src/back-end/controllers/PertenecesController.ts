import { Request, Response } from 'express';
import pool from '../database';

class PertenecesController{

    public async get (req: Request, res: Response){
        const perteneces=await pool.query("SELECT * FROM perteneces");
        res.json(perteneces);
    }
    
    public async getOne (req: Request, res: Response): Promise<any> {
        const {id}=req.params;
        const perteneces=await pool.query("SELECT * FROM perteneces WHERE id = ?",  [id]);
        if(perteneces.length>0){
            return res.json(perteneces[0]);
        }
        res.status(404).json({text: "perteneces no encontrado"});
    }

    public async create (req: Request, res: Response): Promise<void> {
        await pool.query("INSERT INTO perteneces set ?", [req.body]);
        res.json({message: 'perteneces creado'});
    }

    public async delete (req: Request, res: Response): Promise<void> {
        const {id}=req.params;
        await pool.query("DELETE FROM perteneces WHERE id = ?", [id]);
        res.json({text: 'perteneces eliminado'});
    }

    public async update (req: Request, res:Response): Promise<void> {
        const {id}=req.params;
        await pool.query('UPDATE perteneces SET ? WHERE id = ?', [req.body, id]);
        res.json({text: "perteneces actualizado"});
    }
    
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
}

const pertenecesController=new PertenecesController();
export default pertenecesController;