import { createMainTopic, getContentContainer, createNavBar } from "./shared";

const loadPage = function() {
    const $contentContainer = getContentContainer();
    $contentContainer.innerHTML = "";

    $contentContainer.appendChild(createNavBar());
    $contentContainer.appendChild(createMainTopic("CookieSite", "The number 1 cookie store", "images/cookies.jpg"));

    //Create the home page content
    const $contentBody = document.createElement('div');
    $contentBody.className = "content-body";
    $contentBody.textContent = 
        `We are the number 1 cookie sellers in the world.Lorem ipsum dolor sit amet,
        consectetur adipiscing elit. Ut felis nisl, imperdiet in condimentum eget, fermentum maximus arcu. 
        Sed commodo varius volutpat. Ut at nibh eros. Duis ac rhoncus purus, ut egestas mauris. 
        Mauris venenatis semper sagittis. Sed ut consequat tellus. Vivamus tincidunt ornare ultricies. 
        Pellentesque vitae hendrerit sem. Praesent eget odio interdum, eleifend dolor quis, tempor lorem. 
        Sed suscipit in lectus id rutrum. Fusce vulputate augue ac diam commodo, id efficitur odio molestie. 
        Duis rhoncus, velit ut pulvinar volutpat, urna nisl volutpat nisi, nec semper ante nunc quis odio. 
        Curabitur eget metus gravida, ultrices eros ut, posuere sem. Sed semper dictum eros vitae pretium.`

    $contentContainer.appendChild($contentBody);
}

export default loadPage;