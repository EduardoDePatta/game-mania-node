import { Request, Response } from "express";
import pool from "../database";

class RegisterController {
    
  public async list(req: Request, res: Response) {
    const register = await pool.query("SELECT * FROM register");
    res.json(register);
  }

  public async getOne(req: Request, res: Response): Promise<any> {
    const { id } = req.params;
    const register = await pool.query("SELECT * FROM register WHERE id = ?", [
      id,
    ]);
    if (register.length > 0) {
      return res.json(register[0]);
    }
    res.status(404).json({ text: "The register doesn't exist" });
  }

  public async create(req: Request, res: Response): Promise<any> { 
    let data = await pool.query("SELECT * FROM register WHERE email = ?", [req.body.email]);
    if (Object.keys(data).length === 0) {
      await pool.query("INSERT INTO register set ?", [req.body]);
      res.status(200).json({msg:'Usuário Registrado'})
    } else if (Object.keys(data).length !== 0) {
      res.status(422).json({error: 'E-mail já cadastrado. Tente Logar.'})
    }
  }

  public async logon(req: Request, res: Response): Promise<any> {
    let data = await pool.query("SELECT * FROM register WHERE email = ?", [req.body.email]);
    if (Object.keys(data).length === 0){
      res.send('Logon realizado')
    } else {
      res.status(422).json({error: 'ERRO'})
    }
  }

  public async delete(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    await pool.query("DELETE FROM register WHERE id = ?", [id]);
    res.json({ message: "register was deleted" });
  }

  public async update(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    await pool.query("UPDATE register set ? WHERE id = ?", [req.body, id]);
    res.json({ message: "register Updated" });
  }
}

const registerController = new RegisterController();
export default registerController;
