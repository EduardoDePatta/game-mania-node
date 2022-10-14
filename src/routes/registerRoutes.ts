import { Router } from 'express';
import registerController from '../controllers/registerController';

class RegisterRoutes {
    
    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.get('/', registerController.logon)
        this.router.get('/', registerController.list);
        this.router.get('/:id', registerController.getOne);
        this.router.post('/', registerController.create);
        this.router.delete('/:id', registerController.delete);
        this.router.put('/:id', registerController.update);
    }
}

const registerRoutes = new RegisterRoutes();
export default registerRoutes.router;