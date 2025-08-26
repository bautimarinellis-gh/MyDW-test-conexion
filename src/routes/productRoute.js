import { createProduct, getProduct, getProducts } from '../controllers/productController.js';
import express from 'express';


router.post('/', createProduct);

router.get('/', getProducts);

router.get('/:id', getProduct);


export default router;