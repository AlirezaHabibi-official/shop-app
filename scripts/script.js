
// ========================
// 1) Sidebar
// ========================

let asideStatus = document.querySelector('#aside');
let menuBar = document.querySelector('#nav .menu-bar');

function sidebar() {
  if (asideStatus.style.display == 'block') {
    asideStatus.style.display = 'none';
    menuBar.style.display = 'block';
  } else {
    asideStatus.style.display = 'block';
    menuBar.style.display = 'none';
  }
}

// ========================
// 2) Slider arrows
// ========================

document.addEventListener("DOMContentLoaded", function () {
  const slider   = document.querySelector(".product-slider");
  const btnLeft  = document.querySelector(".arrow.left");
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

// ========================
// 3) Search / Filter / Products
// ========================

// An array initialized with Fake Store API data
let products = [];

const productsContainer = document.querySelector('.product-slider');
const categorySelect    = document.getElementById('category');
const searchInput       = document.querySelector('#search-input');

// current filters
let currentPriceFilter  = 'all';
let currentSearchQuery  = '';

// product render function
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

// apply price & search filter
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

  // search filter
  const q = currentSearchQuery.trim().toLowerCase();
  if (q) {
    list = list.filter(p => p.name.toLowerCase().includes(q));
  }

  renderProducts(list);
}

// price filter listener
categorySelect.addEventListener('change', () => {
  currentPriceFilter = categorySelect.value;
  applyFilters();
});

// search filter listener
searchInput.addEventListener('input', () => {
  currentSearchQuery = searchInput.value;
  applyFilters();
});

// ========================
// 4) Fetch data from Fake Store API
// ========================

// https://fakestoreapi.com/products
fetch('https://fakestoreapi.com/products')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
// data is an array of products with fields:
// { id, title, price, description, category, image }
    products = data.map((item, index) => ({
      id: item.id ?? index,
      name: item.title,
      // convert $ to Toman
      price: Math.round(item.price * 160000),

      instock: 20,
      imgSrc: item.image
    }));

    // Initially, render after products are loaded
    renderProducts(products);
  })
  .catch(error => {
    console.error('There has been a problem with your fetch operation:', error);
    productsContainer.innerHTML = '<p>خطا در دریافت محصولات از سرور.</p>';
  });

// ========================
// 5) Modal for displaying large image
// ========================

const modal     = document.querySelector('.modal');
const modalImg  = modal.querySelector('img');
const closeBtn  = modal.querySelector('.close-btn');
const container = document.querySelector('.product-slider');

// Open modal using event delegation
container.addEventListener('click', (event) => {
  const clickedImg = event.target.closest('.product-item img');
  if (!clickedImg) return;

  modal.style.display = 'flex';
  modalImg.src = clickedImg.src;
});

// Close modal with btn
closeBtn.addEventListener('click', () => {
  modal.style.display = 'none';
});

// Close modal with click on background
modal.addEventListener('click', (event) => {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
});
