let navSidebar
let burgerBtn
let allNavSidebarItems
let closeSidebarBtn
let allOfferItems
let footerYear
let nav
let desktopNavItems
let mobileNavItems
let sections

const main = () => {
	prepareDOMElements()
	prepareDOMEvents()
}

const prepareDOMElements = () => {
	burgerBtn = document.querySelector('.nav__item-btn')
	navSidebar = document.querySelector('.nav__sidebar')
	allNavSidebarItems = document.querySelectorAll('.nav__sidebar-item')
	navNavSidebarItemParent = document.querySelector('.nav__sidebar-items')
	closeSidebarBtn = document.querySelector('.nav__sidebar-items-btn')
	allOfferItems = document.querySelectorAll('.offer__item')
	allOfferPageTabeleItems = document.querySelectorAll('.offer-page__table-item')
	footerYear = document.querySelector('.footer__year')
	nav = document.querySelectorAll('.nav')
	desktopNavItems = document.querySelectorAll('.desktop-item')
	mobileNavItems = document.querySelectorAll('.nav__sidebar-item')
	sections = document.querySelectorAll('.section')
}

const prepareDOMEvents = () => {
	burgerBtn.addEventListener('click', handleNav)
	window.addEventListener('scroll', addNavShadow)
	window.addEventListener('scroll', currentSection)
	handleOfferItemcolor()
	handleCurrentYear()
}

const handleNav = () => {
	navSidebar.classList.toggle('nav__sidebar--active')
	navNavSidebarItemParent.classList.toggle('nav__sidebar-items-active')
	burgerBtn.style.zIndex = '1000'

	allNavSidebarItems.forEach(item => {
		item.addEventListener('click', () => {
			navSidebar.classList.remove('nav__sidebar--active')
		})
	})
}

const handleNavItemsAnimation = () => {
	let delayTime = 0
	navBtnBars.classList.remove('black-bars-color')

	allNavItems.forEach(item => {
		item.classList.toggle('nav-items-animation')
		item.style.animationDelay = '.' + delayTime + 's'
		delayTime++
	})
}

const handleBurgerBtnColor = () => {
	const currentSection = window.scrollY

	allSections.forEach(section => {
		if (section.classList.contains('white-section') && section.offsetTop <= currentSection + 60) {
			burgerBtnBars.classList.add('black-bars-color')
		} else if (!section.classList.contains('white-section') && section.offsetTop <= currentSection + 60) {
			burgerBtnBars.classList.remove('black-bars-color')
		}
	})
}

const handleCurrentYear = () => {
	const year = new Date().getFullYear()
	footerYear.innerText = year
}

const handleOfferItemcolor = () => {
	allOfferItems.forEach(el => {
		if (el.querySelector('.fa-minus')) {
			el.style.color = '#cfcfcf'
		} else {
			el.firstElementChild.style.color = '#2ade72'
		}
	})

	allOfferPageTabeleItems.forEach(el => {
		if (el.querySelector('.fa-minus')) {
			el.style.color = '#cfcfcf'
		} else {
			el.firstElementChild.style.color = '#2ade72'
		}
	})
}

const addNavShadow = () => {
	if (window.scrollY >= 100) {
		nav.forEach(el => {
			el.classList.add('shadow-bg')
		})
	} else {
		nav.forEach(el => {
			el.classList.remove('shadow-bg')
		})
	}
}

const currentSection = () => {
	let currentSection

	sections.forEach(section => {
		const widths = [0, 576, 768, 992, 2000]

		if (window.location.pathname.includes('contact')) {
			currentSection = 'contact'
		} else if (window.location.pathname.includes('offer')) {
			currentSection = 'offer'
		} else if (window.innerWidth >= widths[0] && window.innerWidth <= widths[2]) {
			if (window.scrollY >= section.offsetTop - section.clientHeight / 3) {
				currentSection = section.id
			}
		} else if (window.innerWidth >= widths[2] && window.innerWidth <= widths[4]) {
			if (window.scrollY >= section.offsetTop - section.clientHeight / 2) {
				currentSection = section.id
			}
		} else if (window.innerWidth >= widths[4]) {
			currentSection = 'home'
		}
	})

	desktopNavItems.forEach(item => {
		if (item.href.includes(currentSection)) {
			document.querySelector('.active-section').classList.remove('active-section')
			item.classList.add('active-section')
		}
	})

	mobileNavItems.forEach(item => {
		if (item.href.includes(currentSection)) {
			document.querySelector('.active-section-mobile').classList.remove('active-section-mobile')
			item.classList.add('active-section-mobile')
		}
	})
}

const contactNavSectionPage = () => {
	const contact = document.querySelector('.contact-desktop')
	document.querySelector('.active-section').classList.remove('active-section')
	contact.classList.add('active-section')
}

document.addEventListener('DOMContentLoaded', main)
