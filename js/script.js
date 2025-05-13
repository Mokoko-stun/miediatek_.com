// Toggle class active hamburger menu

// Toggle class active
const navbarNav = document.querySelector(".navbar-nav");
//ketika menu di klik
document.querySelector("#hamburger-menu").onclick = () => {
  navbarNav.classList.toggle("active");
};

// Toggle class active untuk search form
const searchForm = document.querySelector(".search-form");
const searchBox = document.querySelector("#search-box");

document.querySelector("#search-button").onclick = (e) => {
  searchForm.classList.toggle("active");
  searchBox.focus();
  e.preventDefault();
};

//toggle class active untuk shopping cart
const shoppingCart = document.querySelector(".shopping-cart");
document.querySelector("#shopping-cart-button").onclick = (e) => {
  shoppingCart.classList.toggle("active");
  e.preventDefault();
};

//klik diluar icon
// klik diluar sidebar untuk menghilangkan nav
const hm = document.querySelector("#hamburger-menu");
const sb = document.querySelector("#search-button");
const sc = document.querySelector("#shopping-cart-button");

document.addEventListener("click", function (e) {
  if (!hm.contains(e.target) && !navbarNav.contains(e.target)) {
    navbarNav.classList.remove("active");
  }

  if (!sb.contains(e.target) && !searchForm.contains(e.target)) {
    searchForm.classList.remove("active");
  }
  if (!sc.contains(e.target) && !shoppingCart.contains(e.target)) {
    shoppingCart.classList.remove("active");
  }
});

document.querySelectorAll(".item-detail-button").forEach((btn) => {
  btn.addEventListener("click", function (e) {
    e.preventDefault(); // MENCEGAH LINK DARI MELAKUKAN SCROLL KE ATAS
    document.querySelector("#item-detail-modal").style.display = "flex";
  });
});

//click tombol close
document.querySelector(".close-icon").addEventListener("click", function (e) {
  e.preventDefault();
  document.querySelector("#item-detail-modal").style.display = "none";
});

//remove icon
// Event delegation untuk menghapus item dari shopping cart
document
  .querySelector(".shopping-cart")
  .addEventListener("click", function (e) {
    if (
      e.target.classList.contains("remove-item") ||
      e.target.closest(".remove-item")
    ) {
      const itemToRemove = e.target.closest(".cart-item");
      if (itemToRemove) {
        itemToRemove.remove();
      }
    }
  });

document.addEventListener("DOMContentLoaded", function () {
  const cartContainer = document.querySelector(".shopping-cart");

  // Fungsi untuk menambahkan item ke keranjang
  function addToCart(imgSrc, title, price) {
    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");
    cartItem.innerHTML = `
      <img src="${imgSrc}" alt="${title}" />
      <div class="item-detail">
        <h3>${title}</h3>
        <div class="item-price">${price}</div>
      </div>
      <i data-feather="trash-2" class="remove-item"></i>
    `;

    cartContainer.appendChild(cartItem);
    feather.replace(); // untuk refresh ikon feather
    setupRemoveButtons(); // setup ulang tombol hapus
  }

  // Event listener untuk tombol add to cart
  document.querySelectorAll(".add-to-cart").forEach(function (button) {
    button.addEventListener("click", function (e) {
      e.preventDefault();

      const menuCard = button.closest(".menu-card");
      const imgSrc = menuCard.querySelector("img").getAttribute("src");
      const title = menuCard.querySelector(".menu-card-title").textContent;
      const price = menuCard
        .querySelector(".menu-card-price")
        .childNodes[0].textContent.trim();

      addToCart(imgSrc, title, price);
    });
  });

  // Fungsi untuk hapus item dari keranjang
  function setupRemoveButtons() {
    document.querySelectorAll(".remove-item").forEach(function (removeBtn) {
      removeBtn.onclick = function () {
        removeBtn.parentElement.remove();
      };
    });
  }

  // Inisialisasi awal tombol hapus
  setupRemoveButtons();
});

feather.replace();
