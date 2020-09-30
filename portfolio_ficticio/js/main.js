// declarando variáveis
var btnContact = document.querySelector('.btn-contact');
var toggle_modal = document.querySelectorAll('.toggle-modal'); // o all é por conta que contem mais de 1 classe toggle
var toggle_menu = document.querySelectorAll('.toggle-menu');
var menuMob = document.querySelector('.menu-mob');
var btnMenuMobIcon = document.querySelector('.btn-menu-mob ion-icon');
//page preloader
window.addEventListener('load', function() {
	var pagePreloader = document.querySelector('.preloader');
	pagePreloader.classList.add('fadeout');
	setTimeout(function() {
		pagePreloader.style.display = 'none';
	}, 2000);
});

//informações de contato, close and open
btnContact.addEventListener('click', function() {
	var boxContact = document.querySelector('.contact-info');
	boxContact.classList.toggle(
		'is-open'
	); /* quando clicar no btn, a classe do box irá receber essa classe is-open que da o display block, a deixando visível */
	this.classList.toggle('change-icon');
});

//abrindo e fechando o menu mobile
for (var m = 0; m < toggle_menu.length; m++) {
	// faz o mapeamento dos itens que contem o toggle, assim, o navegador sabe em qual estamos clicando
	toggle_menu[m].addEventListener('click', function() {
		var overlayMenu = document.querySelector('.overlay-menu');
		overlayMenu.classList.toggle('is-open');
		menuMob.classList.toggle('menu-is-closed');
		menuMob.classList.toggle('menu-is-open');

		var icon = btnMenuMobIcon.getAttribute('name');
		if (icon === 'menu') {
			btnMenuMobIcon.setAttribute('name', 'close');
		} else {
			btnMenuMobIcon.setAttribute('name', 'menu');
		}
	});
}

// abrindo e fechando modal de formulario orçamento
for (var i = 0; i < toggle_modal.length; i++) {
	// faz o mapeamento dos itens que contem o toggle, assim, o navegador sabe em qual estamos clicando
	toggle_modal[i].addEventListener('click', function() {
		var overlay = document.querySelector('.overlay');
		var modal_orcamento = document.querySelector('#modal-orcamento');
		overlay.classList.toggle('is-open');
		modal_orcamento.classList.toggle('is-open');
		modal_orcamento.classList.toggle('slideTopIn');
	});
}
/*
var waypoint = new Waypoint({
	element: document.querySelector('.scroll-down'),
	handler: function() {
		console.log('disparou');
	},
	ofsset: '50%'
});
*/
// animando elementos da topbar
var topBarTrigger = document.querySelector('.trigger-top-bar');
var topbar = document.querySelector('.topbar');
var logo = document.querySelector('.logo');
var waypoint = new Waypoint({
	element: topBarTrigger,
	handler: function() {
		topbar.classList.toggle('topbar-bg');
		logo.classList.toggle('logo-shorten');
		logo.classList.toggle('logo-big');
	},
	ofsset: '50px'
});
