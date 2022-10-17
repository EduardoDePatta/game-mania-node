import { Request, Response } from 'express';

class IndexController {
    public index (req: Request, res: Response) {
        res.json({text: 'API is /api/register or /api/products'});
    } 
}


export const indexController = new IndexController();