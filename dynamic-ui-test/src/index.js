function initializeDropdowns() {
    document.querySelectorAll('.dropdown').forEach($dropdown => {
        const $dropdownButton = $dropdown.querySelector('.dropdown-button');
        const $dropdownMenu = $dropdown.querySelector('.dropdown-menu');

        $dropdownButton.addEventListener("mouseover", () => { 
            $dropdownMenu.classList.remove('hidden');
        });

        $dropdownButton.addEventListener("mouseout", () => { 
            $dropdownMenu.classList.add('hidden');
        });
        
        $dropdownMenu.addEventListener("mouseover", () => { 
            $dropdownMenu.classList.remove('hidden');
        });

        $dropdownMenu.addEventListener("mouseout", () => { 
            $dropdownMenu.classList.add('hidden');
        });

    });
}


function initializeImageCarousels() {
    document.querySelectorAll('.image-carousel').forEach($imageCarousel => {
        const $imageSlides = $imageCarousel.querySelectorAll('.image-slide');

        function displaySlide(slideIndex) {
            const $imageDots = $imageCarousel.querySelectorAll('.circle');

            $imageSlides.forEach($imageSlide => $imageSlide.classList.remove('active'));
            $imageSlides[slideIndex].classList.add('active');

            $imageDots.forEach($imageDot => $imageDot.classList.remove('active'));
            $imageDots[slideIndex].classList.add('active');
        }        

        function getActiveSlideIdx() {
            //Find the index of the image being displayed and set it as active (Ensures if none are active, it still displays)
            return Math.max(0, Array.from($imageSlides).findIndex($imageSlide => $imageSlide.classList.contains('active')));
        }
        
        //Attach listeners between the circles and each slide
        $imageSlides.forEach(($imageSlide, index) => {
            const $slideSelectorCircle = document.createElement('span');
            $slideSelectorCircle.className = 'circle';
            $slideSelectorCircle.onclick = () => displaySlide(index);

            $imageCarousel.querySelector('.image-selector').appendChild($slideSelectorCircle);
        });

        //Set up button to display next item
        $imageCarousel.querySelector('.next-img').onclick = () => {
            const numImages = $imageSlides.length;
            displaySlide((getActiveSlideIdx() + 1) % numImages);
        };

        //Set up button to display prev item
        $imageCarousel.querySelector('.prev-img').onclick = () => {
            const numImages = $imageSlides.length;
            displaySlide((getActiveSlideIdx() - 1 + numImages) % numImages);
        };

        displaySlide(getActiveSlideIdx());
    });
}




initializeDropdowns();
initializeImageCarousels();
