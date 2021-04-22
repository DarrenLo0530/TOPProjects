import { body, validationResult } from 'express-validator';
import Category from '../models/category';
import Item from '../models/item';

async function getCategory(id) {
  const category = await Category
    .findById(id)
    .exec();

  if (category == null) {
    const err404 = new Error('Category could not be found');
    err404.status = 404;
    throw err404;
  }

  return category;
}

async function getCategoryItems(categoryId) {
  return Item
    .find({ categories: categoryId })
    .exec();
}

function validateCategory() {
  return [
    body('name', 'Category name is required').trim().isLength({ min: 1 }).escape(),
    body('description', 'Description is required').trim().isLength({ min: 1 }).escape(),
  ];
}

// Controllers ---------------------------------------------------------------

exports.index = async (req, res, next) => {
  // .exec() returns a Promise
  // We can think of the catch after exec as what happens in async
  // parallel/series callback when error is present
  // Meanwhile if no error is thrown, it will just run
  try {
    const categories = await Category
      .find()
      .exec();
    return res.render('category_index', { categories });
  } catch (err) {
    return next(err);
  }
};

exports.show = async (req, res, next) => {
  // Keep in mind you cant .catch after the await statement and skip everything after the await
  // Everything after will still run so you need to wrap in try catch to jump to another block
  try {
    const category = await getCategory(req.params.id);
    const items = await getCategoryItems(req.params.id);
    return res.render('category_show', { category, items });
  } catch (err) {
    return next(err);
  }
};

exports.delete = async (req, res, next) => {
  try {
    const category = await getCategory(req.params.id);
    const items = await getCategoryItems(req.params.id);

    // Remove reference to category from all items
    await Promise.all(
      items.map((item) => {
        // Item has reference to more than one category so just remove deleted category
        if (item.categories.length > 1) {
          item.categories.remove(category._id);
          return item.save();
        }

        // If item only has reference to one category then remove it
        return Item.findByIdAndRemove(item._id).exec();
      }),
    );

    await Category.findByIdAndRemove(category._id).exec();
  } catch (err) {
    return next(err);
  }

  return res.redirect('/');
};

exports.new = async (req, res, next) => res.render('category_form', { create: true, action: 'POST' });

exports.create = [
  // Validate name and description received from user
  validateCategory(),
  async (req, res, next) => {
    // Get errors from validation
    const errors = validationResult(req);

    // Create category from data
    const category = new Category({
      name: req.body.name,
      description: req.body.description,
    });

    // Return errors if there are any and maintain the user inputted data by sending back an object
    if (!errors.isEmpty()) {
      return res.render('category_form', { create: true, category, errors: errors.array() });
    }

    try {
      const duplicateCategory = await Category.findOne({ name: category.name }).exec();
      if (duplicateCategory) {
        res.redirect(duplicateCategory.url);
      } else {
        await category.save();
      }
    } catch (err) {
      return next(err);
    }

    return res.redirect(category.url);
  },
];

exports.edit = async (req, res, next) => {
  const category = await getCategory(req.params.id);
  return res.render('category_form', { create: false, action: 'PATCH', category });
};

exports.update = [
  validateCategory(),
  async (req, res, next) => {
    const errors = validationResult(req);
    const category = new Category({
      _id: req.params.id,
      name: req.body.name,
      description: req.body.description,
    });

    if (!errors.isEmpty()) {
      return res.render('category_form', {
        create: false, action: 'PATCH', category, errors,
      });
    }

    try {
      const updatedCategory = await Category.findByIdAndUpdate(req.params.id, category).exec();
      return res.redirect(updatedCategory.url);
    } catch (err) {
      return next(err);
    }
  },
];
