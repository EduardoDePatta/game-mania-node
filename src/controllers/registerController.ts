import { Request, Response } from 'express';
import pool from '../database';


class RegisterController {

    public async list (req: Request, res: Response) {
        const register = await pool.query('SELECT * FROM register')
        res.json(register);
    } 

    public async getOne (req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const register = await pool.query('SELECT * FROM register WHERE id = ?', [id]);
        if (register.length > 0){
            return res.json(register[0]);
        }
        res.status(404).json({text: "The register doesn't exist"})
    } 

    public async create (req: Request, res: Response): Promise<void> {
        await pool.query('INSERT INTO register set ?', [req.body])
        res.json({text: 'register Saved'});
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const {id} = req.params;
        await pool.query('DELETE FROM register WHERE id = ?', [id]);
        res.json({message: 'register was deleted'})
    }

    public async update(req: Request, res: Response): Promise<void> {
        const {id} = req.params;
        await pool.query('UPDATE register set ? WHERE id = ?', [req.body, id]);
        res.json({message: 'register Updated'})
    }
}

const registerController = new RegisterController();
export default registerController;
