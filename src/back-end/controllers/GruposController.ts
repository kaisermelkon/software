import { Request, Response } from 'express';
import pool from '../database';

class GruposController{

    public async get (req: Request, res: Response){
        const grupos=await pool.query("SELECT * FROM grupos");
        res.json(grupos);
    }
    
    public async getOne (req: Request, res: Response): Promise<any> {
        const {id}=req.params;
        const grupos=await pool.query("SELECT * FROM grupos WHERE id = ?", [id]);
        if(grupos.length>0){
            return res.json(grupos[0]);
        }
        res.status(404).json({text: "Group not found"});
    }

    public async create (req: Request, res: Response): Promise<void> {
        await pool.query("INSERT INTO grupos set ?", [req.body]);
        res.json({message: 'group created'});
    }

    public async delete (req: Request, res: Response): Promise<void> {
        const {id}=req.params;
        await pool.query("DELETE FROM grupos WHERE id = ?", [id]);
        res.json({text: 'group deleted'});
    }

    public async update (req: Request, res:Response): Promise<void> {
        const {id}=req.params;
        await pool.query('UPDATE grupos SET ? WHERE id = ?', [req.body, id]);
        res.json({text: "group updated"});
    }

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

    public async getGruposAdministrador(req: Request, res: Response){
        const {id}=req.params;
        const grupos=await pool.query("SELECT * FROM grupos WHERE administradorId = ?", [id]);
        if(grupos.length>0){
            return res.json(grupos);
        }
        res.status(404).json({text: "Group not found"});
    }
}

const gruposController=new GruposController();
export default gruposController;