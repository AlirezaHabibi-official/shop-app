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

// search & filter & dynamic product showing function

const productsContainer = document.querySelector('.product-slider');
const categorySelect    = document.getElementById('category');
const searchInput       = document.querySelector('#search-input');

// current price filter
let currentPriceFilter = 'all';

// current search filter
let currentSearchQuery = '';

// render product
function renderProducts(list) {
  const html = list.map(p => {
    const priceFA   = Number(p.price).toLocaleString('fa-IR');
    const instockFA = Number(p.instock).toLocaleString('fa-IR');

    return `
      <section class="product-item">
        <div class="product-image">
          <a href="#">
            <img src="${p.imgSrc}" alt="product">
          </a>
        </div>
        <div class="product-title">
          <a href="">
            <h2>${p.name}</h2>
          </a>
        </div>
        <div class="product-instock">
          تعداد موجود:
          <span class="instock-count">${instockFA}</span>
        </div>
        <div class="product-data">
          <div class="product-price">
            <span class="product-price-value">${priceFA}</span>
            <span class="product-price-currency">تومان</span>
          </div>
          <div class="add-to-cart">
            <i class="fa-solid fa-cart-shopping"></i>
          </div>
        </div>
      </section>
    `;
  }).join('');

  productsContainer.innerHTML = html;
}

// Apply both filters (price + search) to the array and render
function applyFilters() {
  let list = [...products];

  // price filter
  if (currentPriceFilter === 'under-2') {
    list = list.filter(p => p.price < 2000000);
  } else if (currentPriceFilter === '2-5') {
    list = list.filter(p => p.price >= 2000000 && p.price <= 5000000);
  } else if (currentPriceFilter === 'over-5') {
    list = list.filter(p => p.price > 5000000);
  }

  // Search filter (by name)
  const q = currentSearchQuery.trim().toLowerCase();
  if (q) {
    list = list.filter(p => p.name.toLowerCase().includes(q));
  }

  renderProducts(list);
}

// price filter listener
categorySelect.addEventListener('change', () => {
  currentPriceFilter = categorySelect.value;
  console.log('price filter:', currentPriceFilter);
  applyFilters();
});

// search filter listener
searchInput.addEventListener('input', () => {
  currentSearchQuery = searchInput.value;
  console.log('search:', currentSearchQuery);
  applyFilters();
});

// first time
renderProducts(products);


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


