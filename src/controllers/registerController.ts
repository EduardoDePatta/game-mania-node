import { Request, Response } from "express";
import pool from "../database";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

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

  public async saveUser(req: Request, res: Response): Promise<any> {
    const blacklist = [
      {
        'form':'SELECT * FROM register'
      },
      {
        'form':'SELECT * FROM register WHERE id = ?'
      },
      {
        'form':'? OR 1=1'
      },
      {
        'form':'INSERT INTO'
      },
      {
        'form': 'DROP TABLE register'
      },
      {
        'form': 'DROP TABLE products'
      },
      {
        'form': 'funcionou1234567'
      }
    ]

    for (let i = 0; i < blacklist.length; i++){
      if (req.body.email == blacklist[i].form || req.body.password == blacklist[i].form){
        return res.status(500).json({msg: 'Impossivel registrar agora. Tente novamente mais tarde.'})
      }   
    }

    let { email, password } = req.body;
    let data = await pool.query("SELECT * FROM register WHERE email = ?", [
      req.body.email,
    ]);

    const passwordHash = await bcrypt.hash(password, 8);
    const user = {
      email,
      password: passwordHash,
    };

    if (!email) {
      return res
        .status(422)
        .json({ err: "Obrigatório preencher o campo EMAIL" });
    }
    if (!password) {
      return res
        .status(422)
        .json({ err: "Obrigatório preencher o campo SENHA" });
    }
    if (Object.keys(data).length === 0) {
      await pool.query("INSERT INTO register SET ?", [user]);
    } else {
      res.status(422).json({ err: "Usuário já cadastrado" });
    }
  }



  public async login(req: Request, res: Response): Promise<any> {
    const blacklist = [
      {
        'form':'SELECT * FROM register'
      },
      {
        'form':'SELECT * FROM register WHERE id = ?'
      },
      {
        'form':'? OR 1=1'
      },
      {
        'form':'INSERT INTO'
      },
      {
        'form': 'DROP TABLE register'
      },
      {
        'form': 'DROP TABLE products'
      },
      {
        'form': 'funcionou1234567'
      },
      {
        'form': 'adicionar o que quiser que funciona'
      }
    ]

    for (let i = 0; i < blacklist.length; i++){
      if (req.body.email == blacklist[i].form || req.body.password == blacklist[i].form){
        return res.status(500).json({msg: 'Impossivel registrar agora. Tente novamente mais tarde.'})
      }   
    }
    
    const data = await pool.query("SELECT * FROM register WHERE email = ?", [
      req.body.email,
    ]);

    if (data.length !== 0) {
      if (await bcrypt.compare(req.body.password, data[0].password)) {
        const token = jwt.sign(
          { id: data[0].id },
          "d300a6359bff9592982a6ac996dab4ec",
          {
            //Lembrar de criar .env com esse MD5 Hash
            expiresIn: "1d",
          }
        );
        const userData = {
          id: data[0].id,
          email: data[0].email,
          token,
        };
        return res.json({ msg: "Usuário Logado com Sucesso", userData }); //Será que userData é desnecessário?
      } else {
        res.status(404).json({ err: "Usuário não encontrado" }); //Utilizar esse padrão para não especificar que a senha que é incorreta
      }
      res.status(404).json({ err: "Usuário não encontrado" }); //Mesmo de acima
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
