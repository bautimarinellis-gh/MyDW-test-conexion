import { createPost, deletePost, getPost, getPosts, getPostsByAuthor, updatePost } from '../controllers/postController.js';
import express from 'express';

const router = express.Router();

// POST /posts - Crear un nuevo post
// Body: { title, content, author }
router.post('/', createPost);

// GET /posts - Obtener todos los posts con información del autor
router.get('/', getPosts);

// GET /posts/:id - Obtener un post específico por su ID
router.get('/:id', getPost);

// GET /posts/author/:authorId - Obtener todos los posts de un autor específico
router.get('/author/:authorId', getPostsByAuthor);

// DELETE /posts/:id - Eliminar un post por su ID
router.delete('/:id', deletePost);

// PUT /posts/:id - Actualizar un post existente por su ID
// Body: { title?, content?, author? } (campos opcionales)
router.put('/:id', updatePost);

export default router;