var overlay = document.querySelector('.overlay');
var frameImage = document.querySelector('.gallery-frame-image');
var frameContainer = document.querySelector('.gallery-frame-container');
var galleryImages = document.querySelectorAll('.thumb-box');
var closeGallery = document.querySelectorAll('.toggle-gallery');
var currentCounter = document.querySelector('.current-slide');
var totalCounter = document.querySelector('.total-slide');
var skeletonLoading = document.querySelector('.skeleton-loading');

var postGallery = document.querySelector('.post-gallery'); // seleciona o elemento da galeria de imagens
postGalleryHeight = postGallery.clientHeight; //captura a altura do elemento
postGallery.style.height = postGalleryHeight - 270 + 'px';

var counterFormatter = function(n) {
	if (n < 10) {
		// este if faz com que os numeros do contador (caso seja menor que 10), tenham um 0 antes
		return '0' + n;
	} else {
		return n;
	}
};

totalCounter.innerHTML = counterFormatter(galleryImages.length);

//skeleton load
const skeletonAnim = function(imagem) {
	var myImage = new Image(100, 200);
	myImage.src = imagem;
	myImage.addEventListener('load', function() {
		skeletonLoading.classList.add('fadeout');
		console.log('iniciou fadeout');
		setTimeout(function() {
			skeletonLoading.style.display = 'none';
			console.log('iniciou display none');
		}, 2000);
	});
};
const getImageSrc = function() {
	for (var i = 0; i < galleryImages.length; i++) {
		galleryImages[i].addEventListener('click', function() {
			var imgSRC = this.querySelector('img').getAttribute('data-src');
			var itemNum = this.querySelector('img').getAttribute('data-item');

			skeletonLoading.style.display = 'flex';

			frameImage.setAttribute('src', imgSRC);
			frameImage.setAttribute('data-index', itemNum);
			overlay.classList.add('is-open');
			frameContainer.classList.add('is-open');
			currentCounter.innerHTML = counterFormatter(itemNum);
			skeletonAnim(imgSRC);
		});
	}
};
getImageSrc();

for (var c = 0; c < closeGallery.length; c++) {
	closeGallery[c].addEventListener('click', function() {
		overlay.classList.remove('is-open');
		frameContainer.classList.remove('is-open');
	});
}
var btnNext = document.querySelector('.item-next');
var btnPrev = document.querySelector('.item-prev');

const nextItem = function() {
	// identificamos o item atual no frame
	var currentItemNum = frameImage.getAttribute('data-index');
	console.log(currentItemNum);

	// definimos o número do próximo item=atual+1
	var nextItemNum = parseInt(currentItemNum) + 1;

	//fazemos o loop e identificamos qual item faz match com o número próximo
	for (var n = 0; n < galleryImages.length; n++) {
		var item = galleryImages[n].querySelector('img');
		var itemNum = parseInt(item.getAttribute('data-item'));

		if (itemNum === nextItemNum) {
			//capturamos o data-src da imagem
			var nextSrc = item.getAttribute('data-src');
			var nextIndex = item.getAttribute('data-item');
			//passamos o data-src para a tag de img no frame
			skeletonLoading.style.display = 'flex';
			frameImage.setAttribute('src', nextSrc);
			frameImage.setAttribute('data-index', nextIndex);
			currentCounter.innerHTML = counterFormatter(nextIndex);
			skeletonAnim(nextSrc);
		}
	}
};

const prevtItem = function() {
	// identificamos o item atual no frame
	var currentItemNum = frameImage.getAttribute('data-index');
	console.log(currentItemNum);

	// definimos o número do próximo item=atual+1
	var prevtItem = parseInt(currentItemNum) - 1;

	//fazemos o loop e identificamos qual item faz match com o número próximo
	for (var p = 0; p < galleryImages.length; p++) {
		var item = galleryImages[p].querySelector('img');
		var itemNum = parseInt(item.getAttribute('data-item'));

		if (itemNum === prevtItem) {
			//capturamos o data-src da imagem
			var prevSrc = item.getAttribute('data-src');
			var prevIndex = item.getAttribute('data-item');
			//passamos o data-src para a tag de img no frame
			skeletonLoading.style.display = 'flex';
			frameImage.setAttribute('src', prevSrc);
			frameImage.setAttribute('data-index', prevIndex);
			currentCounter.innerHTML = counterFormatter(prevIndex);
			skeletonAnim(prevSrc);
		}
	}
};
btnNext.addEventListener('click', function() {
	nextItem();
});
btnPrev.addEventListener('click', function() {
	prevtItem();
});
