// declarando variáveis do slider
var slidercontainer = document.querySelector('.slider-container');

var sliderlist = document.querySelector('.slider-list');

var slideritem = document.querySelectorAll('.portfolio-item');

const slideTotalItens = slideritem.length; // armazena a quantidade de itens (slides) em uma variável

var sliderlistwidth = null; // pois não sabemos o tamanho que será a lista de itens

var prevItem = document.querySelector('.item-prev');

var nextItem = document.querySelector('.item-next');

var sliderPosition = 0;

var currentSlide = document.querySelector('.current-slide');

var navigatorCounter = document.querySelector('.navigator-counter span');

var totalSlide = document.querySelector('.total-slide');

var currentCounter = 0;

var navItens = document.querySelectorAll('.item-navigator a');

// capturar larguras individuais
if (window.innerWidth < 992) {
	var containerWidth = slidercontainer.parentElement.offsetWidth - 30;
} else {
	var containerWidth = slidercontainer.parentElement.offsetWidth;
}

// clientWidth  desconsidera o padding, já o offsetWidth pega o padding tbm

// passando larguras individuais
slidercontainer.style.width = containerWidth + 'px';
for (var c = 0; c < slideritem.length; c++) {
	slideritem[c].style.width = containerWidth + 'px'; // faz com que cada item da lista tenha a largura total do container

	var slideritemwidth = slideritem[c].offsetWidth;

	sliderlistwidth += slideritemwidth; // soma as larguras de cada item e armazena na variavel o total, para depois passar esse valor para a largura do sliderList
}
sliderlist.style.width = sliderlistwidth + 'px';

// animação

// handlers
var nextSlideAnim = function() {
	var lastItem = sliderlistwidth - containerWidth;
	if (-1 * sliderPosition === lastItem) {
		// verifica se a posição é a mesma coisa do último item
		return;
	}
	sliderPosition -= containerWidth; // quando clicar em next, a sliderPosition armazena o valor negativo do containertotal
	anime({
		targets: sliderlist,
		translateX: sliderPosition, // faz com que desloque para a direita
		easing: 'cubicBezier(0,1.01,.32,1)'
	});
};

var prevSlideAnim = function() {
	if (sliderPosition === 0) {
		// verifica se a posição é a mesma coisa do último item
		return;
	}
	sliderPosition += containerWidth; // quando clica em prev, a sliderPosition irá armazenar o valor positivo
	anime({
		targets: sliderlist,
		translateX: sliderPosition, // faz com que desloque para a esquerda
		easing: 'cubicBezier(0,1.01,.32,1)'
	});
};

// formatar contador
var counterFormatter = function(n) {
	if (n < 10) {
		// este if faz com que os numeros do contador (caso seja menor que 10), tenham um 0 antes
		return '0' + n;
	} else {
		return n;
	}
};
// contador add

var counterAdd = function() {
	if (currentCounter >= 0 && currentCounter < slideTotalItens) {
		currentCounter++;
		currentSlide.innerHTML = counterFormatter(currentCounter);
		navigatorCounter.innerHTML = counterFormatter(currentCounter);
	}
};
// counter remove
var counterRemove = function() {
	if (currentCounter > 1 && currentCounter <= slideTotalItens) {
		currentCounter--;
		currentSlide.innerHTML = counterFormatter(currentCounter);
		navigatorCounter.innerHTML = counterFormatter(currentCounter);
	}
};

// Active nav (linhas que ficam verdes conforme o slide)
var setActiveNav = function() {
	for (var nav = 0; nav < navItens.length; nav++) {
		let myNavNumber = parseInt(navItens[nav].getAttribute('data-nav'));
		console.log(myNavNumber, currentCounter);
		if (myNavNumber === currentCounter) {
			navItens[nav].classList.add('item-active');
			anime({
				targets: '.item-active',
				width: 90 // faz com que desloque para a direita
			});
		}
	}
};
// Active Slide
var setActiveSlide = function() {
	for (var sld = 0; sld < slideritem.length; sld++) {
		let mySlidenum = parseInt(slideritem[sld].getAttribute('data-slide'));
		if (mySlidenum === currentCounter) {
			slideritem[sld].classList.add('slide-active');
			slideritem[sld].querySelector('.portfolio-item-box').classList.add('scale-right');
			slideritem[sld].querySelector('.portfolio-item-thumb img').classList.add('scale-right');
			slideritem[sld].querySelector('.portfolio-item-info').classList.add('fade-from-left');
		}
	}
};

var changeActiveItem = function() {
	for (var rmv = 0; rmv < navItens.length; rmv++) {
		navItens[rmv].classList.remove('item-active');
		anime({
			targets: navItens[rmv],
			width: 20 // faz com que volte ao normal
		});
	}
	for (var rm = 0; rm < slideritem.length; rm++) {
		// esse loop é para remover o slide-active dos slides
		slideritem[rm].classList.remove('slide-active');
		slideritem[rm].querySelector('.portfolio-item-box').classList.remove('scale-right');
		slideritem[rm].querySelector('.portfolio-item-thumb img').classList.remove('scale-right');
		slideritem[rm].querySelector('.portfolio-item-info').classList.remove('fade-from-left');
	}
	setActiveNav();
	setActiveSlide();
};

// Actions
anime({
	targets: '.item-active',
	width: 90 // faz com que desloque para a direita
});
totalSlide.innerHTML = counterFormatter(slideTotalItens); // atribui o total de slides no span do html
currentCounter.innerHTML = counterAdd();

nextItem.addEventListener('click', function() {
	nextSlideAnim();
	counterAdd();
	changeActiveItem();
});

prevItem.addEventListener('click', function() {
	prevSlideAnim();
	counterRemove();
	changeActiveItem();
});
