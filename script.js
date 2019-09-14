var dot = document.querySelector('#period');
var menuButton = document.querySelector('.menu-button')
var lineArray = document.querySelectorAll('.line');
var xLineArray = document.querySelectorAll('.x-line')
var menuTimeline = anime.timeline({loop: true});

document.addEventListener("DOMContentLoaded", function(event) {
	
	const carousels = document.querySelectorAll('.glide');

	[...carousels].map(carousel => {
		new Glide(carousel, {animationTimingFunc: 'ease'}).mount();
	})

    var x = anime({
		targets: dot,
		translateY: [
			{value: -40, duration: 400, elasticity: 0, easing: 'easeOutQuad'},
			{value: 5, duration: 350, elasticity: 0, easing: 'easeInQuad'},
			{value: 0, duration: 80, elasticity: 0, easing: 'easeInQuad'},
			{value: 0, duration: 1000, elasticity: 0},
		],
		loop: true
	});
});

menuButton.addEventListener("mouseenter", function() {
	menuTimeline.add({
		targets: lineArray,
		translateX: 50,
		delay: function(el, i, l) {
			return i * 80;
		}
	})
	.add({
		targets: lineArray,
		translateX: [-50, 0],
		delay: function(el, i, l) {
			return i * 80;
		},
		offset: '-=600'
	})
});

menuButton.addEventListener("mouseleave", function() {
	menuTimeline.restart();
	menuTimeline.pause();
});

var svgReveal = document.querySelector("#svg-reveal");
let changing = false; // is menu transitioning?
let closeVisible = false; // is x visible?

function openMenu() {
	if (changing) {
		return false;
	}
	document.querySelector('.menu').style.display = 'block';
	console.log(changing);
	changing = true;
		if (!closeVisible) {
			// if 3 bars => show x
			var hideLines = anime({
				targets: lineArray,
				opacity: 0,
				delay: 500
			});
			var swipeAnimation = anime({
				targets: svgReveal,
				d: [
					{value: 'M72.5,140c-95.1,0-93.4-140,0-140C163.2,0,163.2,140,72.5,140z'},
					{value: 'M72.5,140c90.8,0,90.8-140,0-140C155,0,155.5,140,72.5,140z'},
				],
				easing: 'easeInOutCirc',
			  	duration: 1000,
			  	complete: function() {
			  		changing = false;
			  		swipeAnimation.restart();
			  		swipeAnimation.pause();
			  		console.log("FALL");
			  		closeVisible = true;
			  	}
			});
			var showClose = anime({
				targets: xLineArray,
				left: "16px",
				delay: 700
			});
			/* animate menu background */
			var menu = document.querySelector('.shape-path');
			var showMenu = anime({
				targets: menu,
				d: [
					{value: 'M 0 0 V 90 C 50,93 50,93 100,90 V 0 H 100'},
					{value: 'M 0 0 V 90 C 50,90 50,90 100,90 V 0 H 100'}
				],
				easing: 'easeInOutCirc',
				duration: 1000
			})
			var menuList = document.querySelectorAll('.links li');
			var links = document.querySelector('.links');
			links.style.display = "flex";
			var showMenuLinks = anime({
				targets: menuList,
				opacity: 1,
				duration: 500,
				easing: 'linear',
				delay: function(el, i, l) {
							return i * 200 + 200;
						}
			});
			var menuLinksTranslate = anime({
				targets: links,
				translateY: 100,
				duration: 1300,
				delay: 200

			});
	}
}

function closeMenu() {
	if (changing) {
		return false;
	}
	changing = true;
	var hideClose = anime({
			targets: xLineArray,
			left: "-30px",
			delay: 700,
			duration: 1
		});
		var showLines = anime({
			targets: lineArray,
			opacity: 100,
			delay: 500
		});
		var swipeAnimation = anime({
			targets: svgReveal,
			d: [
				{value: 'M72.5,140c-95.1,0-93.4-140,0-140C163.2,0,163.2,140,72.5,140z'},
				{value: 'M72.5,140c90.8,0,90.8-140,0-140C155,0,155.5,140,72.5,140z'},
			],
			easing: 'easeInOutCirc',
		  	duration: 1000,
		  	complete: function() {
		  		swipeAnimation.restart();
		  		swipeAnimation.pause();
		  		changing = false;
		  		closeVisible = false;
		  	}
		});
		/* animate menu background */
		var menu = document.querySelector('.shape-path');
		var showMenu = anime({
			targets: menu,
			d: [
				{value: 'M 0 0 V 90 C 50,93 50,93 100,90 V 0 H 100'},
				{value: 'M 0 0 V 0 C 50,0 50,0 100,0 V 0 H 0'}
			],
			easing: 'easeInOutCirc',
			duration: 800,
			complete: () => document.querySelector('.menu').style.display = 'none'
		})
		var menuList = document.querySelectorAll('.links li');
		var links = document.querySelector('.links');
		var showMenuLinks = anime({
			targets: menuList,
			opacity: 0,
			duration: 400,
			easing: 'linear',
			delay: function(el, i, l) {
						return 1/(i + 1) * 130;
					}
		});
		setTimeout(function() {links.style.display = "none"}, 800);
		var menuLinksTranslate = anime({
			targets: links,
			translateY: 0,
			duration: 1400,
			delay: 400
		});
}

// on menu button click
menuButton.addEventListener("click", function() {
	if (!closeVisible) {
		openMenu();
	} else {
		// if x => show menu
		closeMenu();
	}
})


// menu links event listeners
const linksIds = ['projects', 'me' ,'contact'];
Array.from(document.querySelectorAll('.links li')).map((link, index) => {
	link.addEventListener('click', () => {
		closeMenu();
		setTimeout(() => document.getElementById(linksIds[index]).scrollIntoView({ behavior: 'smooth', block: 'start' })
			, 400);
	})
})

// email button reveal
function revealEmail() {
	var btn = document.querySelector('.email-button');
	btn.style.transform = 'rotateX(0deg)';
}

// scrollreveal.js
window.sr = ScrollReveal();
sr.reveal('.section-title', { duration: 1000, scale: 1, delay: 100 });
sr.reveal('.card', { duration: 1000, scale: 1, delay: 300 });
sr.reveal('.poster-img', { duration: 1000, scale: 1, delay: 300 });
sr.reveal('.email-parent', 
	{
	duration: 1000,
	duration: 0, 
	scale: 1, 
	afterReveal: function(el) {
		revealEmail();
	}}
);
