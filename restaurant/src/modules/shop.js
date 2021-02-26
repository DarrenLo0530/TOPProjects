import { createMainTopic, getContentContainer, createNavBar } from "./shared";
import Cookie from "./cookie";

//Menu items
const menu = [
    new Cookie("Chocolate Chip Cookie", 3.50, "Delicious chocolate filled cookie", "images/cookies/chocolate-chip.jpg"),
    new Cookie("Snickerdoodle", 2.50, "Buttery with fragrant cinnamon", "images/cookies/snickerdoodle.jpg"),
    new Cookie("Double Chocolate Chip Cookie", 4.50, "Double the chocolate", "images/cookies/double-chocolate-chip.jpg"),
    new Cookie("M&M Cookie", 3.30, "M&Ms. Ran out of ideas.", "images/cookies/mmchocolate.jpg"),
    new Cookie("Lemon Cookie", 3.70, "ew", "images/cookies/chocolate-chip.jpg"),
    new Cookie("Macaron", 3.10, "Is this even a cookie?", "images/cookies/macaron.jpg"),
    new Cookie("Fortune Cookie", 50.0, "Why would you eat this", "images/cookies/fortune.jpg"),
    new Cookie("Oatmeal Cookie", 69.50, "For breakfast", "images/cookies/oatmeal.jpg"),
    new Cookie("Gingerbread Cookie", 0.10, "For Christmas", "images/cookies/gingerbread.jpg")
];


const loadPage = function() {
    const $contentContainer = getContentContainer();
    $contentContainer.innerHTML = "";
    
    $contentContainer.appendChild(createNavBar('#shop'));

    $contentContainer.appendChild(createMainTopic("Shop", "Buy our cookies", "images/store.jpg"));


    //Generate the shop from the menu
    const $shopDisplay = document.createElement('div');
    $shopDisplay.id = 'shop-display';

    menu.forEach(cookie => $shopDisplay.appendChild(createCookiePanel(cookie)));

    $contentContainer.appendChild($shopDisplay);

}

function createCookiePanel(cookie) {
    //Create a panel in the shop for a cookie
    const $cookieDisplay = document.createElement('div');
    $cookieDisplay.className = "cookie-display";

    const $cookieImageContainer = document.createElement('div');
    $cookieImageContainer.className = 'cookie-image-container';

    //Create a square image
    const $cookieImage = document.createElement('img');
    $cookieImage.src = cookie.imagePath;
    $cookieImage.alt = cookie.name;

    $cookieImageContainer.appendChild($cookieImage);

    //Create the name, description and price footer for the image
    const $cookieInfo = document.createElement('div');
    $cookieInfo.className = 'cookie-info';

    const $cookieName = document.createElement('h3');
    const $cookieDescription = document.createElement('p');
    const $cookiePrice = document.createElement('p');

    $cookieName.textContent = cookie.name;
    $cookieName.className = 'cookie-name';

    $cookieDescription.textContent = cookie.description;
    $cookieDescription.className = 'cookie-description';

    $cookiePrice.textContent = `$${cookie.price.toFixed(2)}`;
    $cookiePrice.className = 'cookie-price';

    $cookieInfo.append($cookieName);
    $cookieInfo.append($cookieDescription);
    $cookieInfo.append($cookiePrice);

    
    $cookieDisplay.appendChild($cookieImageContainer);
    $cookieDisplay.appendChild($cookieInfo);

    return $cookieDisplay;
}



export default loadPage;