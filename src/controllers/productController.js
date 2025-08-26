import product from '../models/productSchema.js'

export async function createProduct(req, res) {
  try {
    const newProduct = await product.create(req.body);
    res.status(201).json(newProduct); 
  } catch (error) {
    res.status(400).json({ message: error.message }); 
  }
}

export async function getProducts(req, res) {
  try {
    const products = await product.find() 
    res.status(200).json(products); 
  } catch (error) {
    res.status(500).json({ message: error.message }); 
  }
}


export async function getProduct(req, res) {
  try {
    const foundProduct = await product.findById(req.params.id) 
    if (!foundProduct) {
      return res.status(404).json({ message: 'Not Found' }); 
    }
    res.status(200).json(foundProduct); 
  } catch (error) {
    res.status(500).json({ message: error.message }); 
  }
}


export async function updateProduct(req, res) {
  try {
    const updateProduct = await product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updateProduct) {
      return res.status(404).json({ message: 'Product not found' }); 
    }
    res.status(200).json(updateProduct); 
  } catch (error) {
    res.status(400).json({ message: error.message }); 
  }
}


export async function deleteUser(req, res) {
  try {
    const deletedProduct = await product.findByIdAndDelete(req.params.id); // Busca y elimina
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' }); // 404: Not Found
    }
    res.status(200).json({ message: 'Product eliminado correctamente' }); // 200: OK
  } catch (error) {
    res.status(500).json({ message: error.message }); // 500: Internal Server Error
  }
}