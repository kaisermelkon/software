import { Request, Response } from 'express';
import pool from '../database';

/**
   * Controlador de usuario
 */
class usuarioController{

    /**
   * Obtiene todos los usuarios
 */
    public async get (req: Request, res: Response){
        const usuarios=await pool.query("SELECT * FROM usuarios");
        res.json(usuarios);
    }
    
    /**
   * Obtiene un usuario
   * @param {string} correo El correo dle usuario
 */
    public async getOne (req: Request, res: Response): Promise<any> {
        const {correo}=req.params;
        console.log(correo);
        const usuarios= await pool.query("SELECT * FROM usuarios WHERE correo = ?",  [correo]);
        if(usuarios.length>0){
            return res.json(usuarios[0]);
        }
        res.status(404).json({text: "Usuario no encontrado"});
    }

    /**
   * Crea un usuario
   * @param {Usuairo} usuario El usuario a crear en la base de datos
 */
    public async create (req: Request, res: Response): Promise<void> {
        await pool.query("INSERT INTO usuarios set ?", [req.body]);
        res.json({message: 'Usuario creado'});
    }

     /**
   * Elimina un usuario
   * @param {string} id El id del usuario a eliminar
 */
    public async delete (req: Request, res: Response): Promise<void> {
        const {id}=req.params;
        await pool.query("DELETE FROM usuarios WHERE id = ?", [id]);
        res.json({text: 'Usuario eliminado'});
    }

    /**
   * Actualiza un usuario
   * @param {Usuario} usuario El usuario a actualizar
   * @param {string} id El id del usuario a actualizar
 */
    public async update (req: Request, res:Response): Promise<void> {
        const {id}=req.params;
        /*const {nombre}=req.params;
        const {edad}=req.params;
        const {cedula}=req.params;
        const {telefono}=req.params;*/
        await pool.query('UPDATE usuarios SET ? WHERE id = ?', [req.body, id]);
        res.json({message: "Usuario actualizado"});
    } 

    /**
   * Obtiene un usuario
   * @param {string} id El id del usuario a obtener
 */
    public async getUsuarioDetalle (req: Request, res: Response): Promise<any> {
        const {id}=req.params;
        console.log(id);
        const usuarios= await pool.query("SELECT * FROM usuarios WHERE id = ?",  [id]);
        if(usuarios.length>0){
            return res.json(usuarios[0]);
        }
        res.status(404).json({text: "Usuario no encontrado"});
    }
}

/**
   * Exporta el controlador
 */
const usuariosController=new usuarioController();
export default usuariosController;