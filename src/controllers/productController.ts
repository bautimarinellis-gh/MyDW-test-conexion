import { Request, Response } from 'express';
import Product, { IProduct } from '../models/productSchema';

export async function createProduct(req: Request, res: Response): Promise<void> {
  try {
    const newProduct: IProduct = await Product.create(req.body);
    res.status(201).json(newProduct); 
  } catch (error: any) {
    res.status(400).json({ message: error.message }); 
  }
}

export async function getProducts(req: Request, res: Response): Promise<void> {
  try {
    const products: IProduct[] = await Product.find();
    res.status(200).json(products); 
  } catch (error: any) {
    res.status(500).json({ message: error.message }); 
  }
}

export async function getProduct(req: Request, res: Response): Promise<void> {
  try {
    const foundProduct: IProduct | null = await Product.findById(req.params.id);
    if (!foundProduct) {
      res.status(404).json({ message: 'Not Found' }); 
      return;
    }
    res.status(200).json(foundProduct); 
  } catch (error: any) {
    res.status(500).json({ message: error.message }); 
  }
}

export async function updateProduct(req: Request, res: Response): Promise<void> {
  try {
    const updatedProduct: IProduct | null = await Product.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true }
    );
    if (!updatedProduct) {
      res.status(404).json({ message: 'Product not found' }); 
      return;
    }
    res.status(200).json(updatedProduct); 
  } catch (error: any) {
    res.status(400).json({ message: error.message }); 
  }
}

export async function deleteProduct(req: Request, res: Response): Promise<void> {
  try {
    const deletedProduct: IProduct | null = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      res.status(404).json({ message: 'Product not found' }); 
      return;
    }
    res.status(200).json({ message: 'Product eliminado correctamente' }); 
  } catch (error: any) {
    res.status(500).json({ message: error.message }); 
  }
}
