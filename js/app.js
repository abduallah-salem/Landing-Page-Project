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
let mSections = document.querySelectorAll('section');
let nSections = mSections.length;
const navBar = document.getElementById('navbar__list');
/**
 * End Global Variables
 * Start Helper Functions
 * 
*/



/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
function navBuilder(sections, nSections) {
    let dFragment = document.createDocumentFragment();
    for(let section of sections){
        const listItem = document.createElement('li');
        listItem.className = 'menu__link';
        listItem.textContent = section.querySelector('.landing__container h2').textContent;
        dFragment.appendChild(listItem);
    }
    navBar.append(dFragment);
}

// Add class 'active' to section when near top of viewport


// Scroll to anchor ID using scrollTO event


/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 
navBuilder(mSections, nSections)
// Scroll to section on link click

// Set sections as active


