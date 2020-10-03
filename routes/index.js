import { Router } from 'express';
import StudentController from '../controllers/studentController.js';
const routes = Router();
routes.get('/', StudentController.getAllStudents);
routes.get('/:id', StudentController.getSingleStudent);
routes.post('/', StudentController.postSingleStudent);
routes.put('/:id', StudentController.updateSingleStudent);
routes.delete('/:id', StudentController.deleteSingleStudent);   
export default routes;