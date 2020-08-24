/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
 */

/**
 * Define Global Variables
 * 
 */
const mSections = document.querySelectorAll('section');
let navBar = document.getElementById('navbar__list');
const header = document.querySelector('.page__header');
const scrlTopPage = document.getElementById('scrl__Top__Page');
let timeOutCounter;
//declare the intersection observer's observer and options variables
let observer;
let Options = {
    root: null,
    rootMargin: "0px",
    threshold: [0.0, 0.25, 0.5, 0.75]
};

/**
 * End Global Variables
 * Start Helper Functions
 * 
 */

//Toggle the scrl__Top__Page button based on the current scroll location
function reachedFooter() {
    //check the current scroll location by comparing the document's relative bottom bounding client rect
    if ((window.innerHeight + 100) >= document.documentElement.getBoundingClientRect().bottom) {
        //Hide button, if the Bound client Rect is smaller than the window innerheight it means that we have reached the bottom (the extra 100px help in calculation to work accordingly)
        scrlTopPage.classList.remove('hidden');
    } else {
        //Show button
        scrlTopPage.classList.add('hidden');
    }
};

//Scroll to the top of the page
function scrollToTop() {
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
    })
}

//Check if the user has stopped scrolling to hide/show the navbar
function stoppedScrolling() {

    //clear the timeout to remove glitchy performance
    clearTimeout(timeOutCounter);
    
    //show the header if hidden
    if (header.classList.contains('hide__header')) {
        header.classList.remove('hide__header');
    }
    //Timeout is set for 3 seconds and hides the header only if the user is not at the top of the page
    timeOutCounter = setTimeout(function () {
        if ((document.documentElement.getBoundingClientRect().top + window.innerHeight + 200) < window.innerHeight) {
            header.classList.add('hide__header');
        }
    }, 3000);
}

/**
 * End Helper Functions
 * Begin Main Functions
 * 
 */

// build the nav
function navBuilder(sections) {
    //declare a variable then create and store a document fragment into it
    let dFragment = document.createDocumentFragment();

    /** iterate over the available sections using two loop variables 
     * 1- index keeps a numerical index of the current itteration
     * 2- section stores the current section in the loop
     */
    for (let [index, section] of sections.entries()) {

        //declare a variable then create and store a new li element in it
        const listItem = document.createElement('li');

        //add the 'active-section-li' class only to the first navbar menu item
        if (index == 0) {
            listItem.classList.add('active-section-li');
        }

        //add the main menu items class
        listItem.classList.add('menu__link');

        //add the text content to the new item by matching it with the Section heading's
        listItem.textContent = section.querySelector('.landing__container h2').textContent;

        //Assign the data-nav attrivute
        listItem.setAttribute('data-nav', section.getAttribute('data-nav'))

        //append the item to the document fragment
        dFragment.appendChild(listItem);
    }
    //apprend the fragment to the navbar
    navBar.append(dFragment);
    //refresh the navBar global variable with the new list
    navBar = document.getElementById('navbar__list');
}

// Add class 'active' to section when near top of viewport
// This function uses the Intersection Observer API. and receives the argument entries
function changeClassOnIntersection(entries) {
    //forEach loop to itterate over the provided entries
    entries.forEach(function (entry) {
        /** Check that three conditions are met
         *  1 - The entry is intersecting with the current viewport
         *  2 - If the entries area that is intersecting is larger that 50%
         *  3 - if the current entry doesn't have the 'active-section' class
         */
        if (entry.isIntersecting && entry.intersectionRatio >= 0.51 && !entry.target.classList.contains('active-section')) {

            //remove the 'active-section' class from the other section that already has it assigned
            document.querySelector('.active-section').classList.remove('active-section');

            //add the 'active-section' class to the intersecting section
            entry.target.classList.add('active-section');
            /**
             * Setting an active state to the navigation bar's items
             * declare a variable use the query selector method to get any element that contains the 'active-section-li'
             */
            let navBarActive = navBar.querySelector('.active-section-li');
            //if the value of the navBarActive is not null, remove the class
            if (navBarActive != null) {
                navBarActive.classList.remove('active-section-li');
            }

            //add the 'active-section-li' class to the currently active section's navbar menu item
            navBar.querySelector(`li[data-nav="${entry.target.getAttribute('data-nav')}"]`).classList.add('active-section-li');
        }
    })
}

// Scroll to anchor ID using scrollTO event
function scrollToSection(e) {
    //get Target section's id by matching the data-nav attribute from Event target and the sections
    let targetSection = document.querySelector(`section[data-nav="${e.target.getAttribute('data-nav')}"]`);
    //Scroll to the target section by locking the top and left values by using the offset properties. While setting the scroll behavior to smooth for improved visual user experience.
    window.scrollTo({
        top: targetSection.offsetTop - navBar.offsetHeight,
        left: targetSection.offsetLeft,
        behavior: 'smooth'
    });
}

/**
 * End Main Functions
 * Begin Events
 * 
 */

//Wait for the DOM content to be fully loaded before adding events/calling functions
document.addEventListener('DOMContentLoaded', function () {
    // Build menu, by calling the navBuilder function
    navBuilder(mSections);

    // Scroll to section on link click
    navBar.addEventListener('click', scrollToSection)

    // Set sections as active, using the Intersection Observer API, declares a new Intersection Observer which calls the function that adds/removes the active class from sections
    observer = new IntersectionObserver(changeClassOnIntersection, Options);

    // Iterate through the sections and attach the observer to each of the sections.
    for (let section of mSections) {
        observer.observe(section);
    }

    // Add a click event listener to the button responsible for scrolling to the top of the page to trigger the Scroll to Top function
    scrlTopPage.addEventListener('click', scrollToTop);

    // Add a scroll event listener that triggers the function that checks if the user has reached the bottom of the page
    window.addEventListener('scroll', reachedFooter);

    // Add a scroll event listener that triggers the function that checks if the user has stopped scrolling
    window.addEventListener('scroll', stoppedScrolling);

}, false);