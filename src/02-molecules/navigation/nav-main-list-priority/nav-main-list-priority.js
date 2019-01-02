'use strict';
import priorityNav from 'priority-nav';

if (window.innerWidth > 767) {
    initPriorityNav();
}

function initPriorityNav() {
    priorityNav.init({
        'mainNavWrapper': '.nav-main',
        'mainNav': '.nav-main-list',
        'breakPoint': 0,
        'throttleDelay': 0,
        'navDropdownLabel': 'More'
    });
}
