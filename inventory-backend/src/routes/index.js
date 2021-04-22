import express from 'express';

import categoryController from '../controllers/categoryController';
import itemController from '../controllers/itemController';

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.redirect('/categories');
});

// Category routes
router.get('/categories', categoryController.index);

router.get('/category/new', categoryController.new);
router.post('/category/new', categoryController.create);

router.get('/category/:id/edit', categoryController.edit);
router.patch('/category/:id/edit', categoryController.update);

router.get('/category/:id', categoryController.show);
router.delete('/category/:id', categoryController.delete);

// Product routes
router.get('/item/new', itemController.new);
router.post('/item/new', itemController.create);

router.get('/item/:id/edit', itemController.edit);
router.patch('/item/:id/edit', itemController.update);

router.get('/item/:id', itemController.show);
router.delete('/item/:id', itemController.delete);

export default router;
