import { body, validationResult } from 'express-validator';
import Category from '../models/category';
import Item from '../models/item';

async function getItem(id) {
  // If rejected breaks throws error from here and skips rest of fn
  const item = await Item
    .findById(id)
    .populate('categories')
    .exec();

  if (item == null) {
    const err404 = new Error('Category could not be found');
    err404.status = 404;
    throw err404;
  }

  return item;
}

async function getCategories() {
  return Category.find().exec();
}

function validateItem() {
  return [
    body('name', 'Name is required').trim().isLength({ min: 1 }).escape(),
    body('description', 'Description is required').trim().isLength({ min: 1 }).escape(),
    body('price').trim()
      .isLength({ min: 1 })
      .withMessage('Price is required')
      .bail()
      .isFloat({ min: 0 })
      .withMessage('Price must be a number')
      .escape(),
    body('stockQuantity').trim()
      .isLength({ min: 1 })
      .withMessage('Stock quantity is required')
      .bail()
      .isInt({ min: 0 })
      .withMessage('Stock quantity must be an integer number')
      .escape(),
    body('categories', 'Select atleast one category').isLength({ min: 1 }),
  ];
}

function sanitizeCategories() {
  return [body('categories').toArray()];
}

// Controllers ------------------------------------------------------------------------------

exports.show = async (req, res, next) => {
  try {
    const item = await getItem(req.params.id);
    return res.render('item_show', { item });
  } catch (err) {
    return next(err);
  }
};

exports.new = async (req, res, next) => {
  const categories = await getCategories();
  res.render('item_form', { create: true, action: 'POST', categories });
};

exports.create = [
  validateItem(),
  sanitizeCategories(),
  async (req, res, next) => {
    const errors = validationResult(req);
    const item = new Item({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      stockQuantity: req.body.stockQuantity,
      categories: req.body.categories,
    });

    if (!errors.isEmpty()) {
      const categories = await getCategories();

      // If errors occured, then recheck off the correct categories
      categories.forEach((category) => {
        // eslint-disable-next-line no-param-reassign
        category.checked = item.categories.includes(category._id);
      });

      return res.render('item_form', {
        create: true, action: 'POST', item, categories, errors: errors.array(),
      });
    }

    try {
      await item.save();
    } catch (err) {
      return next(err);
    }

    return res.redirect(item.url);
  },
];

exports.edit = async (req, res, next) => {
  try {
    const item = await getItem(req.params.id);
    const categories = await getCategories();

    categories.forEach((category) => {
      // eslint-disable-next-line no-param-reassign
      category.checked = item.categories.some(
        (includedCategory) => includedCategory._id.equals(category._id),
      );
    });

    return res.render('item_form', {
      create: false, action: 'PATCH', item, categories,
    });
  } catch (err) {
    return next(err);
  }
};

exports.update = [
  validateItem(),
  sanitizeCategories(),
  async (req, res, next) => {
    const errors = validationResult(req);
    const item = new Item({
      _id: req.params.id,
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      stockQuantity: req.body.stockQuantity,
      categories: req.body.categories,
    });

    // Rerender form if errors occur
    if (!errors.isEmpty()) {
      // If errors occured, then recheck off the correct categories
      const categories = await getCategories();
      categories.forEach((category) => {
        // eslint-disable-next-line no-param-reassign
        category.checked = item.categories.includes(category._id);
      });

      return res.render('item_form', {
        create: false, action: 'PATCH', item, categories, errors: errors.array(),
      });
    }

    try {
      // Create updated item and redirect to its page
      const updatedItem = await Item.findByIdAndUpdate(item._id, item).exec();
      return res.redirect(updatedItem.url);
    } catch (err) {
      return next(err);
    }
  },
];

exports.delete = async (req, res, next) => {
  const item = await getItem(req.params.id);
  try {
    await Item.findByIdAndRemove(item._id);
  } catch (err) {
    return next(err);
  }
  return res.redirect('/');
};
