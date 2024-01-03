'use strict';

const viewRecipeBtns = document.querySelectorAll('.btn-view-recipe');
const modalWindows = document.querySelectorAll('.modal');
const overlay = document.querySelector('.overlay');
const closeBtn = document.querySelectorAll('.icon--close');
const pricingCards = document.querySelectorAll('.pricing-card');
const year = document.querySelector('.year');
let selectedPricingPlan;

// View and close detailed recipe
const closeModal = (index) => {
	modalWindows[index].classList.add('hidden');
	overlay.classList.add('hidden');
};

viewRecipeBtns.forEach((button, index) => {
	button.addEventListener('click', () => {
		modalWindows[index].classList.remove('hidden');
		overlay.classList.remove('hidden');
	});
	closeBtn[index].addEventListener('click', () => {
		closeModal(index);
	});
	overlay.addEventListener('click', () => {
		closeModal(index);
	});
});

// Select a pricing plan
const removeSelection = function (cards) {
	cards.forEach((card) => {
		card.classList.remove('selected');
	});
};

pricingCards.forEach((card) => {
	if (card.classList.contains('selected')) selectedPricingPlan = card;
	card.addEventListener('click', () => {
		removeSelection(pricingCards);
		selectedPricingPlan = card;
		selectedPricingPlan.classList.add('selected');
	});
});

// Smooth scrolling
const allLinks = document.querySelectorAll('a:link');
const scrollToSection = function (href, yOffset = 0) {
	const element = document.querySelector(href);
	const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
	window.scrollTo({ top: y, behavior: 'smooth' });
};

allLinks.forEach((link) => {
	link.addEventListener('click', function (e) {
		e.preventDefault();
		const href = link.getAttribute('href');
		if (href === '#') window.scrollTo({ top: 0, behavior: 'smooth' });
		if (href !== '#' && href.startsWith('#')) {
			scrollToSection(href, 0);
		}
		// Closing the mobile navigation when clicking a link from the navbar
		if (link.classList.contains('nav-link'))
			header.classList.toggle('open-nav');
	});
});

// Get current year in footer
const currentDate = new Date();
const currentYear = currentDate.getFullYear();
year.textContent = currentYear;

// Sticky navigation
const sectionHero = document.querySelector('.section-hero');
const observer = new IntersectionObserver(
	(entries) => {
		const entry = entries[0];
		if (!entry.isIntersecting) document.body.classList.add('sticky');
		if (entry.isIntersecting) document.body.classList.remove('sticky');
	},
	{
		root: null,
		threshold: 0,
		rootMargin: '-160px',
	}
);
observer.observe(sectionHero);

// Mobile navigation
const btnNav = document.querySelector('.btn-mobile-nav');
const header = document.querySelector('.header');

btnNav.addEventListener('click', () => {
	header.classList.toggle('open-nav');
});
