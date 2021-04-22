"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _categoryController = _interopRequireDefault(require("../controllers/categoryController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();
/* GET home page. */


router.get('/', function (req, res) {
  res.redirect('/categories');
});
router.get('/categories', _categoryController["default"].index);
router.get('/category/:id', _categoryController["default"].show);
var _default = router;
exports["default"] = _default;