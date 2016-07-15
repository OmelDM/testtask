function toogleSearchBox(aCaller) {
	"use stric";

	var searchBox = document.getElementsByClassName('search-box')[0];
	var searchForm = document.getElementsByClassName('search-form')[0];
	var searchInput = document.getElementsByClassName('search-input')[0];

	if (searchBox.classList.contains('search-box_expanded')) {
		// Shrink search box
		searchBox.classList.remove('search-box_expanded');
		searchForm.classList.remove('search-form_expanded');
		searchInput.classList.remove('search-input_expanded');
		aCaller.classList.remove('selected');
	} else {
		// Expand search box
		searchBox.classList.add('search-box_expanded');
		searchForm.classList.add('search-form_expanded');
		searchInput.classList.add('search-input_expanded');
		aCaller.classList.add('selected');
	}
}

function toogleNavigation(aCaller) {
	"use stric";

	var navWrapper = document.getElementsByClassName('header-nav-wrapper')[0];

	if (navWrapper.classList.contains('header-nav-wrapper_opened')) {
		// Should close navigation
		navWrapper.classList.remove('header-nav-wrapper_opened');
		aCaller.classList.remove('selected');
		setTimeout(function() {
			navWrapper.style.display = '';
		}, 300);
	} else {
		// Should open navigation
		navWrapper.style.display = 'block';
		aCaller.classList.add('selected');
		setTimeout(function() {
			navWrapper.classList.add('header-nav-wrapper_opened');
		}, 10);
	}
}

function dropdownContent(aCaller) {
	"use stric";

	if (aCaller.classList.contains('dropped')) {
		aCaller.classList.remove('dropped');
		setTimeout(function() {
			var dropedContent = aCaller.getElementsByClassName('dropdown-content')[0];
			dropedContent.style.display = 'none';
			// dropedContent.style.overflow = 'visible';
		}, 350);

	} else {
		var dropedContent = aCaller.getElementsByClassName('dropdown-content')[0];
		dropedContent.style.display = 'block';
		// dropedContent.style.overflow = 'hidden';

		var navWrapper = document.getElementsByClassName('header-nav-wrapper')[0];
		var dropdownElements = navWrapper.getElementsByClassName('dropdown');

		for (var index = 0; index < dropdownElements.length; index++) {
			var dropdown = dropdownElements[index];
			if (this !== dropdown && dropdown.classList.contains('dropped')) {
				dropdownContent(dropdown);
			}
		}

		setTimeout(function() {
			aCaller.classList.add('dropped');
		}, 10);
	}
}

function dropdownTabContent(aCaller, anEvent) {
	"use stric";

	if (undefined !== anEvent && 'mouseover' === anEvent.type && anEvent.view.innerWidth < 899) {
		return;
	}

	var dropedContent = aCaller.getElementsByClassName('dropdown-tab-content')[0];
	var shouldDropUp = (undefined === anEvent || 'mouseover' !== anEvent.type);

	if (shouldDropUp && dropedContent.style.display === 'block') {
		dropedContent.style.display = 'none';
		aCaller.parentNode.style.height = 'auto';
	} else {
		dropedContent.style.display = 'block';

		var dropdownTabElements = document.getElementsByClassName('dropdown-tab');

		for (var index = 0; index < dropdownTabElements.length; index++) {
			var dropdownTab = dropdownTabElements[index];
			var dropedTabContent = dropdownTab.getElementsByClassName('dropdown-tab-content')[0];
			
			if (aCaller !== dropdownTab && undefined !== dropedTabContent && dropedTabContent.style.display === 'block') {
				var dropdownTabContent = dropdownTab.getElementsByClassName('dropdown-tab-content')[0];
				dropdownTabContent.style.display = 'none';
				dropdownTabContent.style.height = 'auto';
				aCaller.parentNode.style.height = 'auto';
			}
		}

		if (899 < window.innerWidth) {

			if (dropedContent.offsetHeight > aCaller.parentNode.offsetHeight) {
				aCaller.parentNode.style.height = dropedContent.offsetHeight + 'px';
			} else {
				dropedContent.style.height = aCaller.parentNode.offsetHeight + 'px';
			}
		}
	}
}

function navWrapperMovedToTop() {
	"use stric";

	var navWrapper = document.getElementsByClassName('header-nav-wrapper')[0];
	var burgerMenu = document.getElementsByClassName('burger-menu')[0];

	if (navWrapper.classList.contains('header-nav-wrapper_opened')) {
		navWrapper.classList.remove('header-nav-wrapper_opened');
		burgerMenu.classList.remove('selected');
		navWrapper.style.display = "";
	}	
}

function moveLoginToNav() {
	"use stric";

	var navLoginContainer = document.getElementsByClassName('nav-login-container')[0];
	var login = document.getElementsByClassName('login')[0];
	login.parentNode.classList.add('empty');
	navLoginContainer.appendChild(login);

	shouldMoveLoginToNav = false;
	shouldMoveLoginToTop = true;
}

function moveLoginToTop() {
	"use stric";

	var headerLoginContainer = document.getElementsByClassName('header-item-login-container')[0];
	var login = document.getElementsByClassName('login')[0];
	headerLoginContainer.appendChild(login);
	headerLoginContainer.classList.remove('empty');

	shouldMoveLoginToTop = false;
	shouldMoveLoginToNav = true;
}

function trackOnload() {
	"use stric";

	if (window.innerWidth < 540) {
		moveLoginToNav();
	}
}

var shouldMoveLoginToNav = true;
var shouldMoveLoginToTop = true;

function trackResize() {
	"use stric";

	if (899 <= window.innerWidth) {
		navWrapperMovedToTop();
	}

	if (shouldMoveLoginToNav && window.innerWidth < 540) {
		moveLoginToNav();
	}

	if (shouldMoveLoginToTop && 540 <= window.innerWidth) {
		moveLoginToTop();
	}
}

window.onload = trackOnload;
window.onresize = trackResize;
