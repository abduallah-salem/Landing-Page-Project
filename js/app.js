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
let observer;
let Options = {
    root: null,
    rootMargin: "0px",
    threshold: [0.0, 0.75]
};

/**
 * End Global Variables
 * Start Helper Functions
 * 
 */
function changeClassOnIntersection(entries) {
    entries.forEach(function (entry) {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.7 && entry.target.className != 'your-active-class') {
            document.querySelector('.your-active-class').classList.remove('your-active-class');
            entry.target.className = 'your-active-class';
        }
    })
}


/**
 * End Helper Functions
 * Begin Main Functions
 * 
 */

// build the nav
function navBuilder(sections) {
    let dFragment = document.createDocumentFragment();
    for (let section of sections) {
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
navBuilder(mSections)
// Scroll to section on link click
observer = new IntersectionObserver(handleIntersection,Options);
for(let section of mSections){
observer.observe(section);
}
// Set sections as active