// the function for showing sidebar

let asideStatus = document.querySelector('#aside');
let menuBar = document.querySelector('#nav .menu-bar');

function sidebar(){
    if (asideStatus.style.display=='block'){
        asideStatus.style.display = 'none';
        menuBar.style.display = 'block';
    } else {
        asideStatus.style.display = 'block';
        menuBar.style.display = 'none';
    }
}

// function for right & left buttom in product

document.addEventListener("DOMContentLoaded", function () {
    const slider = document.querySelector(".product-slider");
    const btnLeft = document.querySelector(".arrow.left");
    const btnRight = document.querySelector(".arrow.right");

    const scrollAmount = 100;

    btnRight.addEventListener("click", function (e) {
      e.preventDefault();
      slider.scrollBy({
        left: scrollAmount,
        top: 0,
        behavior: "smooth"
      });
    });

    btnLeft.addEventListener("click", function (e) {
      e.preventDefault();
      slider.scrollBy({
        left: -scrollAmount,
        top: 0,
        behavior: "smooth"
      });
    });
});

// search funtion
document.addEventListener("DOMContentLoaded", function () {
    const searchInput   = document.querySelector('#search-input');
    const productCards  = document.querySelectorAll('.product-item');

    searchInput.addEventListener('input', function () {
      const query = searchInput.value.trim().toLowerCase();

      productCards.forEach(card => {
        const titleElem = card.querySelector('.product-title h2');
        const titleText = titleElem ? titleElem.textContent.toLowerCase() : '';

        if (titleText.includes(query)) {
          card.style.display = 'block';  
        } else {
          card.style.display = 'none'; 
        }
      });
    });
});

// show prodcuts

let productsContainer = document.querySelector('.product-slider');

function showAllProducts(){
  for(let i = 0; i < products.length; i++){
    productsContainer.innerHTML += `
    <section class="product-item">
      <div class="product-image">
          <a href="#">
              <img src=` + products[i].imgSrc + ` alt="product">
          </a>
      </div>
      <div class="product-title">
          <a href="">
              <h2>
                  ` + products[i].name +  `
              </h2>
          </a>
      </div>
      <div class="product-instock">
           تعداد موجود: 
          <span class="instock-count">` + products[i].instock + `</span>
      </div>
      <div class="product-data">
          <div class="product-price">
              <span class="product-price-value">
                ` + products[i].price + `
              </span>
              <span class="product-price-currency">تومان</span>
          </div>
          <div class="add-to-cart">
              <i class="fa-solid fa-cart-shopping"></i>
          </div>
      </div>
    </section>
    ` ;
  }
}

showAllProducts();


// change instock count digit format to persian
const productInstock = document.querySelectorAll('.product-instock .instock-count');

productInstock.forEach(span => {
  const raw = span.textContent.trim();
  const formatted = Number(raw).toLocaleString('fa-IR');

  span.textContent = formatted;
});

// Separating three digits
const priceSpans = document.querySelectorAll('.product-price-value');

priceSpans.forEach(span => {
  const raw = span.textContent.trim();
  const formatted = Number(raw).toLocaleString('fa-IR');

  span.textContent = formatted;
});

// Modal showing product
const modal = document.querySelector('.modal');
const modalImg = modal.querySelector('.modal img');
const closeBtn = modal.querySelector('.close-btn');
const productCards  = document.querySelectorAll('.product-item');

productCards.forEach(card => {
  const img = card.querySelector('img');
  img.addEventListener('click', () => {
    modal.style.display = 'flex';
    modalImg.src = img.src;
  });
});

// close modal
closeBtn.addEventListener('click', () => {
  modal.style.display = 'none';
});
modal.addEventListener('click', (event) => {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
});


