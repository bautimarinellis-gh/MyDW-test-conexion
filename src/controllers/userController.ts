import { Request, Response } from 'express';
import User, { IUser } from '../models/userModel';

// Crear un nuevo usuario
export async function createUser(req: Request, res: Response): Promise<void> {
  try {
    const newUser: IUser = await User.create(req.body);
    res.status(201).json(newUser); // 201: Created
  } catch (error: any) {
    res.status(400).json({ message: error.message }); // 400: Bad Request
  }
}

// Obtener todos los usuarios
export async function getUsers(req: Request, res: Response): Promise<void> {
  try {
    const users: IUser[] = await User.find(); // Busca todos los usuarios
    res.status(200).json(users); // 200: OK
  } catch (error: any) {
    res.status(500).json({ message: error.message }); // 500: Internal Server Error
  }
}

// Obtener un usuario por ID
export async function getUser(req: Request, res: Response): Promise<void> {
  try {
    const foundUser: IUser | null = await User.findById(req.params.id); // Busca por ID
    if (!foundUser) {
      res.status(404).json({ message: 'Usuario no encontrado' }); // 404: Not Found
      return;
    }
    res.status(200).json(foundUser); // 200: OK
  } catch (error: any) {
    res.status(500).json({ message: error.message }); // 500: Internal Server Error
  }
}

// Obtener un usuario por email
export async function getUserByEmail(req: Request, res: Response): Promise<void> {
  try {
    const foundUser: IUser | null = await User.findOne({ email: req.params.email }); // Busca por email
    if (!foundUser) {
      res.status(404).json({ message: 'Usuario no encontrado' }); // 404: Not Found
      return;
    }
    res.status(200).json(foundUser); // 200: OK
  } catch (error: any) {
    res.status(500).json({ message: error.message }); // 500: Internal Server Error
  }
}

// Actualizar un usuario por ID
export async function updateUser(req: Request, res: Response): Promise<void> {
  try {
    // { new: true } devuelve el documento actualizado
    const updatedUser: IUser | null = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedUser) {
      res.status(404).json({ message: 'Usuario no encontrado' }); // 404: Not Found
      return;
    }
    res.status(200).json(updatedUser); // 200: OK
  } catch (error: any) {
    res.status(400).json({ message: error.message }); // 400: Bad Request
  }
}

// Eliminar un usuario por ID
export async function deleteUser(req: Request, res: Response): Promise<void> {
  try {
    const deletedUser: IUser | null = await User.findByIdAndDelete(req.params.id); // Busca y elimina
    if (!deletedUser) {
      res.status(404).json({ message: 'Usuario no encontrado' }); // 404: Not Found
      return;
    }
    res.status(200).json({ message: 'Usuario eliminado correctamente' }); // 200: OK
  } catch (error: any) {
    res.status(500).json({ message: error.message }); // 500: Internal Server Error
  }
}
