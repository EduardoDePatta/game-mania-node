import { Router } from 'express';
import productController from '../controllers/productController';

class ProductsRoutes {
    
    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.get('/', productController.list);
        this.router.get('/:id', productController.getOne);
        this.router.post('/', productController.create);
        this.router.delete('/:id', productController.delete);
        this.router.put('/:id', productController.update);
    }
}

const productsRoutes = new ProductsRoutes();
export default productsRoutes.router;