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
let navBar = document.getElementById('navbar__list');
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
function changeClassOnIntersection(entries) {
    entries.forEach(function (entry) {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.51 && entry.target.className != 'your-active-class') {
            document.querySelector('.your-active-class').classList.remove('your-active-class');
            entry.target.className = 'your-active-class';
            let navBarActive = navBar.querySelector('.activeSection');
            if (navBarActive != null) {
                navBarActive.classList.remove('activeSection');
            }
            navBar.querySelector(`li[data-nav="${entry.target.getAttribute('data-nav')}"]`).classList.add('activeSection');
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
    for (let [index, section] of sections.entries()) {
        const listItem = document.createElement('li');
        if(index == 0){
            listItem.classList.add('activeSection');
        }
        listItem.classList.add('menu__link');
        listItem.textContent = section.querySelector('.landing__container h2').textContent;
        listItem.setAttribute('data-nav', section.getAttribute('data-nav'))
        dFragment.appendChild(listItem);
    }
    navBar.append(dFragment);
    navBar = document.getElementById('navbar__list');
}

// Add class 'active' to section when near top of viewport


// Scroll to anchor ID using scrollTO event
function scrollToSection(e) {
    let targetSection = document.querySelector(`section[data-nav="${e.target.getAttribute('data-nav')}"]`);
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

// Build menu 

navBuilder(mSections);
// Scroll to section on link click
navBar.addEventListener('click', scrollToSection)
// Set sections as active
observer = new IntersectionObserver(changeClassOnIntersection, Options);
for (let section of mSections) {
    observer.observe(section);
}