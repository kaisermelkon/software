import { Request, Response } from 'express';
import pool from '../database';

class CarroController{

    public async get (req: Request, res: Response){
        const carros=await pool.query("SELECT * FROM carros");
        res.json(carros);
    }
    
    public async getOne (req: Request, res: Response): Promise<any> {
        const {id}=req.params;
        const carros=await pool.query("SELECT * FROM carros WHERE id = ?",  [id]);
        if(carros.length>0){
            return res.json(carros[0]);
        }
        res.status(404).json({text: "Carro no encontrado"});
    }

    public async create (req: Request, res: Response): Promise<void> {
        await pool.query("INSERT INTO carros set ?", [req.body]);
        res.json({message: 'Carro creado'});
    }

    public async delete (req: Request, res: Response): Promise<void> {
        const {id}=req.params;
        await pool.query("DELETE FROM carros WHERE id = ?", [id]);
        res.json({text: 'Carro eliminado'});
    }

    public async update (req: Request, res:Response): Promise<void> {
        const {id}=req.params;
        await pool.query('UPDATE carros SET ? WHERE id = ?', [req.body, id]);
        res.json({text: "Carro actualizado"});
    }
    
    public async getId (req: Request, res: Response): Promise<any> {
        const {placa}=req.params;
        const carros=await pool.query("SELECT * FROM carros WHERE placa = ?", [placa]);
        if(carros.length>0){
            return res.json(carros[0].id);
        }
        res.status(404).json({text: "Id no encontrado"});
    }
}

const carroController=new CarroController();
export default carroController;