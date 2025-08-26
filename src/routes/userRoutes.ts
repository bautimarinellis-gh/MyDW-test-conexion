import { Router } from 'express';
import { createUser, deleteUser, getUser, getUserByEmail, getUsers, updateUser } from '../controllers/userController';

const router: Router = Router();

// POST /users - Crear un nuevo usuario
// Body: { name, lastName, email, age }
router.post('/', createUser);

// GET /users - Obtener todos los usuarios
router.get('/', getUsers);

// GET /users/:id - Obtener un usuario específico por su ID
router.get('/:id', getUser);

// GET /users/email/:email - Obtener un usuario por su email
router.get('/email/:email', getUserByEmail);

// DELETE /users/:id - Eliminar un usuario por su ID
router.delete('/:id', deleteUser);

// PUT /users/:id - Actualizar un usuario existente por su ID
// Body: { name?, lastName?, email?, age? } (campos opcionales)
router.put('/:id', updateUser);

export default router;
