import { Request, Response } from 'express';
import pool from '../database';

class usuarioController{

    public async get (req: Request, res: Response){
        const usuarios=await pool.query("SELECT * FROM usuarios");
        res.json(usuarios);
    }
    
    public async getOne (req: Request, res: Response): Promise<any> {
        const {correo}=req.params;
        console.log(correo);
        const usuarios= await pool.query("SELECT * FROM usuarios WHERE correo = ?",  [correo]);
        if(usuarios.length>0){
            return res.json(usuarios[0]);
        }
        res.status(404).json({text: "Usuario no encontrado"});
    }

    public async create (req: Request, res: Response): Promise<void> {
        await pool.query("INSERT INTO usuarios set ?", [req.body]);
        res.json({message: 'Usuario creado'});
    }

    public async delete (req: Request, res: Response): Promise<void> {
        const {id}=req.params;
        await pool.query("DELETE FROM usuarios WHERE id = ?", [id]);
        res.json({text: 'Usuario eliminado'});
    }

    public async update (req: Request, res:Response): Promise<void> {
        const {id}=req.params;
        await pool.query('UPDATE usuarios SET ? WHERE id = ?', [req.body, id]);
        res.json({text: "Usuario actualizado"});
    } 
}

const usuariosController=new usuarioController();
export default usuariosController;