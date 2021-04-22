/* eslint-disable */

import async from 'async';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import Category from './src/models/category';
import Item from './src/models/item';

dotenv.config();

const mongoDB = `mongodb+srv://darren:${process.env.DB_PASS}@cluster0.jkoko.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

db.dropDatabase();

const itemsList = [];
const categoriesList = [];

function categoryCreate(name, description, cb) {
  const categoryData = { name, description };
  const category = new Category(categoryData);

  category.save((err) => {
    if (err) {
      cb(err, null);
      return;
    }

    console.log(`New Category: ${category}`);
    categoriesList.push(category);
    cb(null, category);
  });
}

function itemCreate(name, description, price, categories, stockQuantity, cb) {
  const itemData = {
    name, description, price, categories, stockQuantity,
  };
  const item = new Item(itemData);

  item.save((err) => {
    if (err) {
      cb(err, null);
      return;
    }
    console.log(`New Item: ${item}`);
    itemsList.push(item);
    cb(null, item);
  });
}

function createCategories(cb) {
  async.series([
    (callback) => {
      categoryCreate('Household Items', 'Products used within the household on a daily basis. Includes cleaning products, vaccumn cleaners, etc.', callback);
    },
    (callback) => {
      categoryCreate('Computer Components', 'Includes computer accessories, parts, and peripherals.', callback);
    },
    (callback) => {
      categoryCreate('Clothing', 'Clothing from brands of all prices. Includes scarfs, jackets, pants, shorts, etc.', callback);
    },
    (callback) => {
      categoryCreate('Furniture', 'Products to place around your house to make it look less empy. Includes chairs, tables, etc.', callback);
    },
    (callback) => {
      categoryCreate('Stationary', 'Office supplies and drawing supplies. Includes pencils, pens, erasers, paper, etc.', callback);
    },
  ],
  // optional callback
  cb);
}

function createItems(cb) {
  async.parallel([
    (callback) => {
      itemCreate('Window Cleaner', 'Chemical spray to make windows clear', 6.99, [categoriesList[0]], 100, callback);
    },
    (callback) => {
      itemCreate('Bandaid', 'Covers and sanitizes wounds to avoid infection', 3.99, [categoriesList[0]], 300, callback);
    },
    (callback) => {
      itemCreate('Keyboard', 'Mechanical keyboards that can connect through USB', 63.99, [categoriesList[1]], 53, callback);
    },
    (callback) => {
      itemCreate('Calculator', 'Scientific calculator powered by solar panels', 20.99, [categoriesList[1], categoriesList[4]], 32, callback);
    },
    (callback) => {
      itemCreate('White Shirt', 'Cheap white disposable shirt meant for one time use', 1.99, [categoriesList[2]], 532, callback);
    },
    (callback) => {
      itemCreate('Jacket', 'Winter jacket filled with down', 200.99, [categoriesList[2]], 53, callback);
    },
    (callback) => {
      itemCreate('Dining Table', 'Birch dining table fit for 6 people', 500.99, [categoriesList[3]], 101, callback);
    },
    (callback) => {
      itemCreate('Office Chair', 'Ergonomic office chair', 1020.99, [categoriesList[3]], 10, callback);
    },
    (callback) => {
      itemCreate('Mechanical Pencil', 'Automatic lead pencil that is best for drafting', 20.99, [categoriesList[4]], 301, callback);
    },
    (callback) => {
      itemCreate('Motorized Eraser', 'Electronic eraser to allow for precise erasing', 3.99, [categoriesList[4]], 10, callback);
    },
  ], cb);
}

async.series([
  createCategories,
  createItems,
],
// Optional callback
(err) => {
  if (err) {
    console.log(`FINAL ERR: ${err}`);
  }
  // All done, disconnect from database
  mongoose.connection.close();
});
