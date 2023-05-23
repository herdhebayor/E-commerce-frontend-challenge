/** @format */

let itemNum = document.querySelector('.number-piece')
const addBtn = document.querySelector('.btn-plus')
const minusBtn = document.querySelector('.btn-minus')
const hamburgerShowBtn = document.querySelector('.hamburger-menu-toggle')
const hamburger = document.querySelector('.hamburger')
const hamburgerWrapper = document.querySelector('.hamburgerWrapper')
const hamburgerCloseBtn = document.querySelector('.close-hamburger')
let productCont = document.querySelector('.image-container')
const lightBoxImg = document.querySelector('.lightBoxImg')
const mainImg = document.querySelector('.main-image')
const cartItemNum = document.querySelector('.cart-num')
const slide = document.querySelectorAll('.product-view')
const modalSlide = document.querySelectorAll('.product-view-modal')
const cart = document.querySelector('.cart-details')
const nextBtn = document.querySelector('.toggleNext')
const prevBtn = document.querySelector('.togglePrev')
const productDescription = document.querySelector('.product-description')
const delSvg = `<svg width="14" height="16" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><path d="M0 2.625V1.75C0 1.334.334 1 .75 1h3.5l.294-.584A.741.741 0 0 1 5.213 0h3.571a.75.75 0 0 1 .672.416L9.75 1h3.5c.416 0 .75.334.75.75v.875a.376.376 0 0 1-.375.375H.375A.376.376 0 0 1 0 2.625Zm13 1.75V14.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 1 14.5V4.375C1 4.169 1.169 4 1.375 4h11.25c.206 0 .375.169.375.375ZM4.5 6.5c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Z" id="a"/></defs><use fill="#C3CAD9" fill-rule="nonzero" xlink:href="#a"/></svg>`


slide.forEach((img) => {
	if(window.innerWidth > 600){
	img.addEventListener('click', (e) => {
		let target = e.target
		target.focus()
		let imgSrc = target.querySelector('img')
		let child = mainImg.querySelector('img')
		child.src = imgSrc.src
		lightBoxImg.querySelector('img').src = child.src;
	})
	}
})

modalSlide.forEach((img) => {
	img.addEventListener('click', (e) => {
		let target = e.target
		target.focus()
		let imgSrc = target.querySelector('img')
		let child = mainImg.querySelector('img')
		child.src = imgSrc.src
		lightBoxImg.querySelector('img').src = child.src;
	})
})



// displaying the modal light box
mainImg.addEventListener('click', () => {
	document.querySelector('.light-box-container').style.display = 'block'
	let mainChild = lightBoxImg.querySelector("img")
	let i
	for(i = 0; i < modalSlide.length; i++){
		const ele_child = modalSlide[i].querySelector("img")
		if(mainChild.src == ele_child.src){
			modalSlide[i].classList.add("active")
		}
		mainImg.querySelector("img").src = mainChild.src
	}
})
// closing the modal light box
document.querySelector('.close-light-box').addEventListener('click', () => {
	document.querySelector('.light-box-container').style.display = 'none'
	for(let j = 0; j < modalSlide.length; j++){
		if(modalSlide[j].className.includes("active")){
			modalSlide[j].className.remove("active")
		}
	}
})

// configuring the carousel
const slideLength = slide.length

let slide_count = 0
function showNextSlide() {
	slide[slide_count].classList.remove('activeImg')
	if (slide_count < slideLength - 1) {
		slide_count++
	} else {
		slide_count = 0
	}
	slide[slide_count].classList.add('activeImg')
}

function showPreviousSlide() {
	slide[slide_count].classList.remove('activeImg')
	if (slide_count > 0) {
		slide_count--
	} else {
		slide_count = slideLength - 1
	}
	slide[slide_count].classList.add('activeImg')
}
nextBtn.addEventListener('click', showNextSlide)
prevBtn.addEventListener('click', showPreviousSlide)



//selecting number of items
let count = 0
// reducing value
minusBtn.addEventListener('click', () => {
	count--
	// if the value is less than or equal to zero, i want it to remain zero
	if (count == 0 || count == -1) {
		count = 0
	}
	itemNum.innerHTML = count
})
// adding value
addBtn.addEventListener('click', () => {
	count++
	itemNum.innerHTML = count
})


//display hamburger menu
hamburgerShowBtn.addEventListener('click', () => {
	hamburgerWrapper.style.display = 'block'
	if(hamburger.className.includes("close")){
	  hamburger.classList.remove("close")
	}
	hamburger.classList.add('open')
})


//close hamburger menu
hamburgerCloseBtn.addEventListener('click', () => {
	hamburger.classList.replace('open', 'close')
	setTimeout(()=>{
	    hamburgerWrapper.style.display = "none"
	},150)
})



//Add to cart

const cartBtn = document.querySelector('.add-to-cart-btn')
cartBtn.addEventListener('click', function addItemToCart(e) {
	const productTittle = productDescription.innerHTML
	const productPrice = document.querySelector('.current-price').innerHTML
	const productSize = itemNum.innerHTML
	const totalPrice = productPrice.match(/\d+/) * productSize
	const image = productCont.children[0].innerHTML
	let productContainer = `<div class="parent">
        <div class="product">
            <div class=image>${image}</div>
            <div class="details">
                <div class="text">${productTittle}</div>
                <div class="pricing">
                    <span>${productPrice} x ${productSize}</span>
                    <span class="total">$${totalPrice}</span>
                </div>
            </div>
       </div>
        <button class="checkout">checkout</button>
        <button class="del">${delSvg}</button>
       </div>`
	if (productSize == 0) {
		e.disabled
		document.querySelector('.cart-inner').innerHTML = 'your cart is empty'
		const err = document.querySelector(".error")
			cartItemNum.style.display = 'none'
		cartItemNum.innerHTML = ""
		err.classList.add("show-err")
		setTimeout(()=>{
		   err.classList.remove("show-err")
		},2000)
	} else {
		cartItemNum.innerHTML = productSize
		cartItemNum.style.display = 'block'
		document.querySelector('.cart-inner').innerHTML = productContainer
		
			//delete cart and remove cart-items number indicator
		 const delBtn = document.querySelector('.del')
	delBtn.addEventListener('click', () => {
		delBtn.parentElement.remove()
		document.querySelector('.cart-inner').innerHTML = 'your cart is empty'
		cartItemNum.style.display = 'none'
		cartItemNum.innerHTML = ""
	})
	}

})


//toggle show and hide cart
document.querySelector('.cart').addEventListener('click', () => {
	cart.classList.toggle('cart-show')
})








//light box modal navigation 
let modal_count = 0
function modalNextSlide() {
	modalSlide[modal_count].classList.remove("active")
	if(modal_count < modalSlide.length - 1){
		modal_count++
	}else{modal_count = 0}
	modalSlide[modal_count].classList.add("active")
	lightBoxImg.querySelector('img').src = modalSlide[modal_count].querySelector('img').src
	mainImg.querySelector('img').src = lightBoxImg.querySelector('img').src
}


function modalPreviousSlide() {
	modalSlide[modal_count].classList.remove('active')
	if (modal_count > 0) {
		modal_count--
	} else {
		modal_count = modalSlide.length - 1
	}
	modalSlide[modal_count].classList.add('active')
	lightBoxImg.querySelector("img").src =
	modalSlide[modal_count].querySelector("img").src
	mainImg.querySelector('img').src = lightBoxImg.querySelector('img').src
}
document.querySelector(".light-box-next").addEventListener("click",modalNextSlide)
document.querySelector(".light-box-prev").addEventListener("click",modalPreviousSlide)