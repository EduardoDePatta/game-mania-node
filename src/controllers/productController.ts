import { Request, Response } from 'express';
import pool from '../database';


class ProductController {

    public async list (req: Request, res: Response) {
        const products = await pool.query('SELECT * FROM products')
        res.json(products);
    } 

    public async getOne (req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const product = await pool.query('SELECT * FROM products WHERE id = ?', [id]);
        if (product.length > 0){
            return res.json(product[0]);
        }
        res.status(404).json({text: "The product doesn't exist"})
    } 

    public async create (req: Request, res: Response): Promise<void> {
        await pool.query('INSERT INTO products set ?', [req.body])
        res.json({text: 'Product Saved'});
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const {id} = req.params;
        await pool.query('DELETE FROM products WHERE id = ?', [id]);
        res.json({message: 'Product was deleted'})
    }

    public async update(req: Request, res: Response): Promise<void> {
        const {id} = req.params;
        await pool.query('UPDATE products set ? WHERE id = ?', [req.body, id]);
        res.json({message: 'Product Updated'})
    }
}

const productController = new ProductController();
export default productController;
