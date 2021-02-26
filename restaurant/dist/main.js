/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _modules_home__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/home */ \"./src/modules/home.js\");\n\n\n(0,_modules_home__WEBPACK_IMPORTED_MODULE_0__.default)();\n\n\n\n//# sourceURL=webpack://restaurant/./src/index.js?");

/***/ }),

/***/ "./src/modules/contact.js":
/*!********************************!*\
  !*** ./src/modules/contact.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _shared__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./shared */ \"./src/modules/shared.js\");\n\n\nconst loadPage = function() {\n    const $contentContainer = (0,_shared__WEBPACK_IMPORTED_MODULE_0__.getContentContainer)();\n    $contentContainer.innerHTML = \"\";\n\n    $contentContainer.appendChild((0,_shared__WEBPACK_IMPORTED_MODULE_0__.createNavBar)());\n    $contentContainer.appendChild((0,_shared__WEBPACK_IMPORTED_MODULE_0__.createMainTopic)(\"Contact Us\", \"Get in contact with our staff\", \"images/contact.jpg\"));\n\n    const $contentBody = document.createElement('div');\n    $contentBody.className = \"content-body\";\n\n\n    //Add contact info\n    $contentBody.appendChild(createContactInfo(\"Phone Number\", \"ZZZ-ZZZ-ZZZZ\"));\n    $contentBody.appendChild(createContactInfo(\"Address\", \"169 ZZZZZZZZZZZZZZZ Park\"));\n\n    $contentContainer.appendChild($contentBody);\n}\n\nfunction createContactInfo(label, info) {\n    const $container = document.createElement('div');\n    $container.className = \"info-container\";\n\n    const $label = document.createElement('p');\n    const $info = document.createElement('p');\n\n    //Create the label\n    $label.textContent = label;\n    $label.className = \"info-label\";\n\n    //Create the info\n    $info.textContent = info;\n    $info.className = \"info\";\n\n    $container.appendChild($label);\n    $container.appendChild($info);\n\n    return $container;\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (loadPage);\n\n\n//# sourceURL=webpack://restaurant/./src/modules/contact.js?");

/***/ }),

/***/ "./src/modules/cookie.js":
/*!*******************************!*\
  !*** ./src/modules/cookie.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Cookie)\n/* harmony export */ });\nclass Cookie {\n    constructor(name, price, description, imagePath) {\n        this._name = name;\n        this._price = price;\n        this._description = description;\n        this._imagePath = imagePath;    \n    }\n\n    get name() {\n        return this._name;\n    }\n\n    get price() {\n        return this._price;\n    }\n\n    get description() {\n        return this._description;\n    }\n\n    get imagePath() {\n        return this._imagePath;\n    }\n}\n\n\n\n//# sourceURL=webpack://restaurant/./src/modules/cookie.js?");

/***/ }),

/***/ "./src/modules/home.js":
/*!*****************************!*\
  !*** ./src/modules/home.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _shared__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./shared */ \"./src/modules/shared.js\");\n\n\nconst loadPage = function() {\n    const $contentContainer = (0,_shared__WEBPACK_IMPORTED_MODULE_0__.getContentContainer)();\n    $contentContainer.innerHTML = \"\";\n\n    $contentContainer.appendChild((0,_shared__WEBPACK_IMPORTED_MODULE_0__.createNavBar)());\n    $contentContainer.appendChild((0,_shared__WEBPACK_IMPORTED_MODULE_0__.createMainTopic)(\"CookieSite\", \"The number 1 cookie store\", \"images/cookies.jpg\"));\n\n    //Create the home page content\n    const $contentBody = document.createElement('div');\n    $contentBody.className = \"content-body\";\n    $contentBody.textContent = \n        `We are the number 1 cookie sellers in the world.Lorem ipsum dolor sit amet,\n        consectetur adipiscing elit. Ut felis nisl, imperdiet in condimentum eget, fermentum maximus arcu. \n        Sed commodo varius volutpat. Ut at nibh eros. Duis ac rhoncus purus, ut egestas mauris. \n        Mauris venenatis semper sagittis. Sed ut consequat tellus. Vivamus tincidunt ornare ultricies. \n        Pellentesque vitae hendrerit sem. Praesent eget odio interdum, eleifend dolor quis, tempor lorem. \n        Sed suscipit in lectus id rutrum. Fusce vulputate augue ac diam commodo, id efficitur odio molestie. \n        Duis rhoncus, velit ut pulvinar volutpat, urna nisl volutpat nisi, nec semper ante nunc quis odio. \n        Curabitur eget metus gravida, ultrices eros ut, posuere sem. Sed semper dictum eros vitae pretium.`\n\n    $contentContainer.appendChild($contentBody);\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (loadPage);\n\n//# sourceURL=webpack://restaurant/./src/modules/home.js?");

/***/ }),

/***/ "./src/modules/shared.js":
/*!*******************************!*\
  !*** ./src/modules/shared.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"createMainTopic\": () => (/* binding */ createMainTopic),\n/* harmony export */   \"getContentContainer\": () => (/* binding */ getContentContainer),\n/* harmony export */   \"createNavBar\": () => (/* binding */ createNavBar)\n/* harmony export */ });\n/* harmony import */ var _home__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./home */ \"./src/modules/home.js\");\n/* harmony import */ var _shop__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./shop */ \"./src/modules/shop.js\");\n/* harmony import */ var _contact__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./contact */ \"./src/modules/contact.js\");\n\n\n\n\nconst createMainTopic = function(headingText, subheadingText, imagePath) {\n    //The container with heading and subheading\n    const $container = document.createElement('div');\n    $container.className = \"main-topic-container\";\n    $container.style.background = `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(${imagePath})`\n    $container.style.backgroundRepeat = 'no-repeat';\n\t$container.style.backgroundSize = '100%';\n\n    const $heading = document.createElement('h1');\n    $heading.textContent = headingText;\n\n    const $subheading = document.createElement('p');\n    $subheading.textContent = subheadingText;\n\n    $container.appendChild($heading);\n    $container.appendChild($subheading);\n\n    \n    return $container;\n}\n\nconst getContentContainer = function() {\n    return document.querySelector(\"#content\");\n}\n\nconst createNavBar = function() {\n    const $navContainer = document.createElement('nav').appendChild(document.createElement('ul'));\n    $navContainer.appendChild(createNavLink(\"CookieSite\", \"#\", \"home\", _home__WEBPACK_IMPORTED_MODULE_0__.default));\n\n    //Create elemnents on the right side of the nav bar\n    const $rightNav = document.createElement('div');\n    $rightNav.className = \"right-nav\";\n    $rightNav.appendChild(createNavLink(\"Shop\", \"#\", \"shop\", _shop__WEBPACK_IMPORTED_MODULE_1__.default));\n    $rightNav.appendChild(createNavLink(\"Contact Us\", \"#\", \"contact\", _contact__WEBPACK_IMPORTED_MODULE_2__.default));\n\n    $navContainer.appendChild($rightNav);\n\n    return $navContainer.parentElement;\n}\n\nconst createNavLink = function(text, linkUrl, id, onclick) {\n    const $linkContainer = document.createElement('li');\n    const $link = document.createElement('a');\n\n    //Set link properties\n    $link.textContent = text;\n    $link.href = linkUrl;\n    $link.id = id;\n    $link.onclick = onclick;\n    $linkContainer.appendChild($link);\n\n    return $linkContainer;\n}\n\n\n\n//# sourceURL=webpack://restaurant/./src/modules/shared.js?");

/***/ }),

/***/ "./src/modules/shop.js":
/*!*****************************!*\
  !*** ./src/modules/shop.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _shared__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./shared */ \"./src/modules/shared.js\");\n/* harmony import */ var _cookie__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./cookie */ \"./src/modules/cookie.js\");\n\n\n\n//Menu items\nconst menu = [\n    new _cookie__WEBPACK_IMPORTED_MODULE_1__.default(\"Chocolate Chip Cookie\", 3.50, \"Delicious chocolate filled cookie\", \"images/cookies/chocolate-chip.jpg\"),\n    new _cookie__WEBPACK_IMPORTED_MODULE_1__.default(\"Snickerdoodle\", 2.50, \"Buttery with fragrant cinnamon\", \"images/cookies/snickerdoodle.jpg\"),\n    new _cookie__WEBPACK_IMPORTED_MODULE_1__.default(\"Double Chocolate Chip Cookie\", 4.50, \"Double the chocolate\", \"images/cookies/double-chocolate-chip.jpg\"),\n    new _cookie__WEBPACK_IMPORTED_MODULE_1__.default(\"M&M Cookie\", 3.30, \"M&Ms. Ran out of ideas.\", \"images/cookies/mmchocolate.jpg\"),\n    new _cookie__WEBPACK_IMPORTED_MODULE_1__.default(\"Lemon Cookie\", 3.70, \"ew\", \"images/cookies/chocolate-chip.jpg\"),\n    new _cookie__WEBPACK_IMPORTED_MODULE_1__.default(\"Macaron\", 3.10, \"Is this even a cookie?\", \"images/cookies/macaron.jpg\"),\n    new _cookie__WEBPACK_IMPORTED_MODULE_1__.default(\"Fortune Cookie\", 50.0, \"Why would you eat this\", \"images/cookies/fortune.jpg\"),\n    new _cookie__WEBPACK_IMPORTED_MODULE_1__.default(\"Oatmeal Cookie\", 69.50, \"For breakfast\", \"images/cookies/oatmeal.jpg\"),\n    new _cookie__WEBPACK_IMPORTED_MODULE_1__.default(\"Gingerbread Cookie\", 0.10, \"For Christmas\", \"images/cookies/gingerbread.jpg\")\n];\n\n\nconst loadPage = function() {\n    const $contentContainer = (0,_shared__WEBPACK_IMPORTED_MODULE_0__.getContentContainer)();\n    $contentContainer.innerHTML = \"\";\n    $contentContainer.appendChild((0,_shared__WEBPACK_IMPORTED_MODULE_0__.createNavBar)());\n    $contentContainer.appendChild((0,_shared__WEBPACK_IMPORTED_MODULE_0__.createMainTopic)(\"Shop\", \"Buy our cookies\", \"images/store.jpg\"));\n\n\n    //Generate the shop from the menu\n    const $shopDisplay = document.createElement('div');\n    $shopDisplay.id = 'shop-display';\n\n    menu.forEach(cookie => $shopDisplay.appendChild(createCookiePanel(cookie)));\n\n    $contentContainer.appendChild($shopDisplay)\n}\n\nfunction createCookiePanel(cookie) {\n    //Create a panel in the shop for a cookie\n    const $cookieDisplay = document.createElement('div');\n    $cookieDisplay.className = \"cookie-display\";\n\n    const $cookieImageContainer = document.createElement('div');\n    $cookieImageContainer.className = 'cookie-image-container';\n\n    //Create a square image\n    const $cookieImage = document.createElement('img');\n    $cookieImage.src = cookie.imagePath;\n    $cookieImage.alt = cookie.name;\n\n    $cookieImageContainer.appendChild($cookieImage);\n\n    //Create the name, description and price footer for the image\n    const $cookieInfo = document.createElement('div');\n    $cookieInfo.className = 'cookie-info';\n\n    const $cookieName = document.createElement('h3');\n    const $cookieDescription = document.createElement('p');\n    const $cookiePrice = document.createElement('p');\n\n    $cookieName.textContent = cookie.name;\n    $cookieName.className = 'cookie-name';\n\n    $cookieDescription.textContent = cookie.description;\n    $cookieDescription.className = 'cookie-description';\n\n    $cookiePrice.textContent = `$${cookie.price.toFixed(2)}`;\n    $cookiePrice.className = 'cookie-price';\n\n    $cookieInfo.append($cookieName);\n    $cookieInfo.append($cookieDescription);\n    $cookieInfo.append($cookiePrice);\n\n    \n    $cookieDisplay.appendChild($cookieImageContainer);\n    $cookieDisplay.appendChild($cookieInfo);\n\n    return $cookieDisplay;\n}\n\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (loadPage);\n\n//# sourceURL=webpack://restaurant/./src/modules/shop.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;