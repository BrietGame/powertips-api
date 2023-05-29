const express = require('express');
const router = express.Router();
const CategoryController = require('../Controller/Category.controller');
const auth = require('../Middleware/auth');

router.get('/all', auth, CategoryController.getCategories);
router.get('/:categoryId', auth, CategoryController.getCategoryById);
router.get('/:field/:value', auth, CategoryController.getCategoryBy);
router.post('/create', auth, CategoryController.createCategory);
router.put('/:categoryId', auth, CategoryController.updateCategory);
router.delete('/:categoryId', auth, CategoryController.deleteCategory);

module.exports = router;