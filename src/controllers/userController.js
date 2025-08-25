import user from '../models/userModel.js';

// Crear un nuevo usuario
export async function createUser(req, res) {
  try {
    const newUser = await user.create(req.body);
    res.status(201).json(newUser); // 201: Created
  } catch (error) {
    res.status(400).json({ message: error.message }); // 400: Bad Request
  }
}

// Obtener todos los usuarios
export async function getUsers(req, res) {
  try {
    const users = await user.find(); // Busca todos los usuarios
    res.status(200).json(users); // 200: OK
  } catch (error) {
    res.status(500).json({ message: error.message }); // 500: Internal Server Error
  }
}

// Obtener un usuario por ID
export async function getUser(req, res) {
  try {
    const foundUser = await user.findById(req.params.id); // Busca por ID
    if (!foundUser) {
      return res.status(404).json({ message: 'Usuario no encontrado' }); // 404: Not Found
    }
    res.status(200).json(foundUser); // 200: OK
  } catch (error) {
    res.status(500).json({ message: error.message }); // 500: Internal Server Error
  }
}

// Obtener un usuario por email
export async function getUserByEmail(req, res) {
  try {
    const foundUser = await user.findOne({ email: req.params.email }); // Busca por email
    if (!foundUser) {
      return res.status(404).json({ message: 'Usuario no encontrado' }); // 404: Not Found
    }
    res.status(200).json(foundUser); // 200: OK
  } catch (error) {
    res.status(500).json({ message: error.message }); // 500: Internal Server Error
  }
}

// Actualizar un usuario por ID
export async function updateUser(req, res) {
  try {
    // { new: true } devuelve el documento actualizado
    const updatedUser = await user.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ message: 'Usuario no encontrado' }); // 404: Not Found
    }
    res.status(200).json(updatedUser); // 200: OK
  } catch (error) {
    res.status(400).json({ message: error.message }); // 400: Bad Request
  }
}

// Eliminar un usuario por ID
export async function deleteUser(req, res) {
  try {
    const deletedUser = await user.findByIdAndDelete(req.params.id); // Busca y elimina
    if (!deletedUser) {
      return res.status(404).json({ message: 'Usuario no encontrado' }); // 404: Not Found
    }
    res.status(200).json({ message: 'Usuario eliminado correctamente' }); // 200: OK
  } catch (error) {
    res.status(500).json({ message: error.message }); // 500: Internal Server Error
  }
}