import { Request, Response } from 'express';
import Post, { IPost } from '../models/postSchema';

// Crear un nuevo post
export async function createPost(req: Request, res: Response): Promise<void> {
  try {
    const newPost: IPost = await Post.create(req.body);
    res.status(201).json(newPost); // 201: Created
  } catch (error: any) {
    res.status(400).json({ message: error.message }); // 400: Bad Request
  }
}

// Obtener todos los posts con información del autor
export async function getPosts(req: Request, res: Response): Promise<void> {
  try {
    const posts: IPost[] = await Post.find().populate('author'); // populate trae los datos del autor
    res.status(200).json(posts); // 200: OK
  } catch (error: any) {
    res.status(500).json({ message: error.message }); // 500: Internal Server Error
  }
}

// Obtener un post por ID con información del autor
export async function getPost(req: Request, res: Response): Promise<void> {
  try {
    const foundPost: IPost | null = await Post.findById(req.params.id).populate('author'); // Busca por ID y trae datos del autor
    if (!foundPost) {
      res.status(404).json({ message: 'Post no encontrado' }); // 404: Not Found
      return;
    }
    res.status(200).json(foundPost); // 200: OK
  } catch (error: any) {
    res.status(500).json({ message: error.message }); // 500: Internal Server Error
  }
}

// Obtener todos los posts de un autor específico
export async function getPostsByAuthor(req: Request, res: Response): Promise<void> {
  try {
    const posts: IPost[] = await Post.find({ author: req.params.authorId }).populate('author'); // Filtra por autor
    if (posts.length === 0) {
      res.status(404).json({ message: 'No se encontraron posts para este autor' }); // 404: Not Found
      return;
    }
    res.status(200).json(posts); // 200: OK
  } catch (error: any) {
    res.status(500).json({ message: error.message }); // 500: Internal Server Error
  }
}

// Actualizar un post por ID
export async function updatePost(req: Request, res: Response): Promise<void> {
  try {
    // { new: true } devuelve el documento actualizado, populate trae datos del autor
    const updatedPost: IPost | null = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('author');
    if (!updatedPost) {
      res.status(404).json({ message: 'Post no encontrado' }); // 404: Not Found
      return;
    }
    res.status(200).json(updatedPost); // 200: OK
  } catch (error: any) {
    res.status(400).json({ message: error.message }); // 400: Bad Request
  }
}

// Eliminar un post por ID
export async function deletePost(req: Request, res: Response): Promise<void> {
  try {
    const deletedPost: IPost | null = await Post.findByIdAndDelete(req.params.id); // Busca y elimina
    if (!deletedPost) {
      res.status(404).json({ message: 'Post no encontrado' }); // 404: Not Found
      return;
    }
    res.status(200).json({ message: 'Post eliminado correctamente' }); // 200: OK
  } catch (error: any) {
    res.status(500).json({ message: error.message }); // 500: Internal Server Error
  }
}
