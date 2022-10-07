import { Request, Response } from 'express';

class IndexController {
    public index (req: Request, res: Response) {
        res.json({text: 'API is /api/cardapio'});
    } 
}

export const indexController = new IndexController();