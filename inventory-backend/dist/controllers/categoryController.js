"use strict";

var _category = _interopRequireDefault(require("../models/category"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

exports.index = function (req, res, next) {
  _category["default"].find().exec(function (err, categoriesList) {
    if (err) {
      return next(err);
    }

    return res.render('category_index', {
      title: 'All Categories',
      categories: categoriesList
    });
  });
};

exports.show = function (req, res, next) {
  _category["default"].findById(req.params.id).exec(function (err, category) {
    if (err) {
      return next(err);
    }

    if (category == null) {
      var err404 = new Error('Category could not be found');
      err404.status = 404;
      return next(err404);
    }

    return res.render('category_show', {
      title: category.name,
      category: category
    });
  });
};