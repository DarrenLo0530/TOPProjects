import loadHomePage from "./home";
import loadShopPage from "./shop";
import loadContactPage from "./contact";

const createMainTopic = function(headingText, subheadingText, imagePath) {
    //The container with heading and subheading
    const $container = document.createElement('div');
    $container.className = "main-topic-container";
    $container.style.background = `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(${imagePath})`
    $container.style.backgroundRepeat = 'no-repeat';
	$container.style.backgroundSize = '100%';

    const $heading = document.createElement('h1');
    $heading.textContent = headingText;

    const $subheading = document.createElement('p');
    $subheading.textContent = subheadingText;

    $container.appendChild($heading);
    $container.appendChild($subheading);

    
    return $container;
}

const getContentContainer = function() {
    return document.querySelector("#content");
}

const createNavBar = function() {
    const $navContainer = document.createElement('nav').appendChild(document.createElement('ul'));
    $navContainer.appendChild(createNavLink("CookieSite", "#", "home", loadHomePage));

    //Create elemnents on the right side of the nav bar
    const $rightNav = document.createElement('div');
    $rightNav.className = "right-nav";
    $rightNav.appendChild(createNavLink("Shop", "#", "shop", loadShopPage));
    $rightNav.appendChild(createNavLink("Contact Us", "#", "contact", loadContactPage));

    $navContainer.appendChild($rightNav);

    return $navContainer.parentElement;
}

const createNavLink = function(text, linkUrl, id, onclick) {
    const $linkContainer = document.createElement('li');
    const $link = document.createElement('a');

    //Set link properties
    $link.textContent = text;
    $link.href = linkUrl;
    $link.id = id;
    $link.onclick = onclick;
    $linkContainer.appendChild($link);

    return $linkContainer;
}

export { createMainTopic, getContentContainer, createNavBar }