import post from '../models/postSchema.js';

// Crear un nuevo post
export async function createPost(req, res) {
  try {
    const newPost = await post.create(req.body);
    res.status(201).json(newPost); // 201: Created
  } catch (error) {
    res.status(400).json({ message: error.message }); // 400: Bad Request
  }
}

// Obtener todos los posts con información del autor
export async function getPosts(req, res) {
  try {
    const posts = await post.find().populate('author'); // populate trae los datos del autor
    res.status(200).json(posts); // 200: OK
  } catch (error) {
    res.status(500).json({ message: error.message }); // 500: Internal Server Error
  }
}

// Obtener un post por ID con información del autor
export async function getPost(req, res) {
  try {
    const foundPost = await post.findById(req.params.id).populate('author'); // Busca por ID y trae datos del autor
    if (!foundPost) {
      return res.status(404).json({ message: 'Post no encontrado' }); // 404: Not Found
    }
    res.status(200).json(foundPost); // 200: OK
  } catch (error) {
    res.status(500).json({ message: error.message }); // 500: Internal Server Error
  }
}

// Obtener todos los posts de un autor específico
export async function getPostsByAuthor(req, res) {
  try {
    const posts = await post.find({ author: req.params.authorId }).populate('author'); // Filtra por autor
    if (posts.length === 0) {
      return res.status(404).json({ message: 'No se encontraron posts para este autor' }); // 404: Not Found
    }
    res.status(200).json(posts); // 200: OK
  } catch (error) {
    res.status(500).json({ message: error.message }); // 500: Internal Server Error
  }
}

// Actualizar un post por ID
export async function updatePost(req, res) {
  try {
    // { new: true } devuelve el documento actualizado, populate trae datos del autor
    const updatedPost = await post.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('author');
    if (!updatedPost) {
      return res.status(404).json({ message: 'Post no encontrado' }); // 404: Not Found
    }
    res.status(200).json(updatedPost); // 200: OK
  } catch (error) {
    res.status(400).json({ message: error.message }); // 400: Bad Request
  }
}

// Eliminar un post por ID
export async function deletePost(req, res) {
  try {
    const deletedPost = await post.findByIdAndDelete(req.params.id); // Busca y elimina
    if (!deletedPost) {
      return res.status(404).json({ message: 'Post no encontrado' }); // 404: Not Found
    }
    res.status(200).json({ message: 'Post eliminado correctamente' }); // 200: OK
  } catch (error) {
    res.status(500).json({ message: error.message }); // 500: Internal Server Error
  }
}