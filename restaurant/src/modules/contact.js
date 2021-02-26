import { createMainTopic, getContentContainer, createNavBar } from "./shared";

const loadPage = function() {
    const $contentContainer = getContentContainer();
    $contentContainer.innerHTML = "";

    $contentContainer.appendChild(createNavBar());
    $contentContainer.appendChild(createMainTopic("Contact Us", "Get in contact with our staff", "images/contact.jpg"));

    const $contentBody = document.createElement('div');
    $contentBody.className = "content-body";


    //Add contact info
    $contentBody.appendChild(createContactInfo("Phone Number", "ZZZ-ZZZ-ZZZZ"));
    $contentBody.appendChild(createContactInfo("Address", "169 ZZZZZZZZZZZZZZZ Park"));

    $contentContainer.appendChild($contentBody);
}

function createContactInfo(label, info) {
    const $container = document.createElement('div');
    $container.className = "info-container";

    const $label = document.createElement('p');
    const $info = document.createElement('p');

    //Create the label
    $label.textContent = label;
    $label.className = "info-label";

    //Create the info
    $info.textContent = info;
    $info.className = "info";

    $container.appendChild($label);
    $container.appendChild($info);

    return $container;
}

export default loadPage;
