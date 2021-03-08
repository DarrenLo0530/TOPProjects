/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (() => {

eval("function initializeDropdowns() {\n    document.querySelectorAll('.dropdown').forEach($dropdown => {\n        const $dropdownButton = $dropdown.querySelector('.dropdown-button');\n        const $dropdownMenu = $dropdown.querySelector('.dropdown-menu');\n\n        $dropdownButton.addEventListener(\"mouseover\", () => { \n            $dropdownMenu.classList.remove('hidden');\n        });\n\n        $dropdownButton.addEventListener(\"mouseout\", () => { \n            $dropdownMenu.classList.add('hidden');\n        });\n        \n        $dropdownMenu.addEventListener(\"mouseover\", () => { \n            $dropdownMenu.classList.remove('hidden');\n        });\n\n        $dropdownMenu.addEventListener(\"mouseout\", () => { \n            $dropdownMenu.classList.add('hidden');\n        });\n\n    });\n}\n\n\nfunction initializeImageCarousels() {\n    document.querySelectorAll('.image-carousel').forEach($imageCarousel => {\n        const $imageSlides = $imageCarousel.querySelectorAll('.image-slide');\n\n        function displaySlide(slideIndex) {\n            const $imageDots = $imageCarousel.querySelectorAll('.circle');\n\n            $imageSlides.forEach($imageSlide => $imageSlide.classList.remove('active'));\n            $imageSlides[slideIndex].classList.add('active');\n\n            $imageDots.forEach($imageDot => $imageDot.classList.remove('active'));\n            $imageDots[slideIndex].classList.add('active');\n        }        \n\n        function getActiveSlideIdx() {\n            //Find the index of the image being displayed and set it as active (Ensures if none are active, it still displays)\n            return Math.max(0, Array.from($imageSlides).findIndex($imageSlide => $imageSlide.classList.contains('active')));\n        }\n        \n        //Attach listeners between the circles and each slide\n        $imageSlides.forEach(($imageSlide, index) => {\n            const $slideSelectorCircle = document.createElement('span');\n            $slideSelectorCircle.className = 'circle';\n            $slideSelectorCircle.onclick = () => displaySlide(index);\n\n            $imageCarousel.querySelector('.image-selector').appendChild($slideSelectorCircle);\n        });\n\n        //Set up button to display next item\n        $imageCarousel.querySelector('.next-img').onclick = () => {\n            const numImages = $imageSlides.length;\n            displaySlide((getActiveSlideIdx() + 1) % numImages);\n        };\n\n        //Set up button to display prev item\n        $imageCarousel.querySelector('.prev-img').onclick = () => {\n            const numImages = $imageSlides.length;\n            displaySlide((getActiveSlideIdx() - 1 + numImages) % numImages);\n        };\n\n        displaySlide(getActiveSlideIdx());\n    });\n}\n\n\n\n\ninitializeDropdowns();\ninitializeImageCarousels();\n\n\n//# sourceURL=webpack://dynamic-ui-test/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/index.js"]();
/******/ 	
/******/ })()
;