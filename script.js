const searchBar = document.querySelector('.search-bar');
const searchBtn = document.querySelector('.search-btn');
const searchIcon = searchBtn.querySelector('i');
const recentSection = document.getElementById('recentSection');
const recentList = document.getElementById('recentList');
const products = document.querySelectorAll('.grid .product-card');

function updateSearchIcon() {
    const hasValue = searchBar.value.trim().length > 0;
    const isFocused = document.activeElement === searchBar;

    if (hasValue || isFocused) {
        searchIcon.className = 'fas fa-times';
    } else {
        searchIcon.className = 'fas fa-search';
    }
}

function updateRecentVisibility() {
    const searchTerm = searchBar.value.trim();
    const isFocused = document.activeElement === searchBar;
    const hasItems = recentList.children.length > 0;

    if (searchTerm.length > 0 || isFocused) {
        recentSection.classList.add('hide-recent');
    } else {
        if (hasItems) {
            recentSection.classList.remove('hide-recent');
        } else {
            recentSection.classList.add('hide-recent');
        }
    }
}

function filterProducts() {
    const searchTerm = searchBar.value.toLowerCase();
    products.forEach(product => {
        const title = product.querySelector('.p-title').textContent.toLowerCase();
        product.style.display = title.includes(searchTerm) ? "flex" : "none";
    });
}

searchBar.addEventListener('input', function() {
    filterProducts();
    updateRecentVisibility();
    updateSearchIcon();
});

searchBar.addEventListener('focus', function() {
    updateRecentVisibility();
    updateSearchIcon();
});

searchBar.addEventListener('blur', function() {
    setTimeout(() => {
        updateRecentVisibility();
        updateSearchIcon();
    }, 150);
});

searchBtn.addEventListener('click', function(e) {
    if (searchIcon.classList.contains('fa-times')) {
        e.preventDefault();
        searchBar.value = '';
        filterProducts();
        searchBar.focus();
        updateSearchIcon();
        updateRecentVisibility();
    }
});

function addToRecent(title, price, imgSrc) {
    const existingItems = Array.from(recentList.querySelectorAll('.recent-info-title'));
    const duplicate = existingItems.find(el => el.textContent === title);
    
    if (duplicate) {
        duplicate.closest('.recent-item').remove();
    }

    const item = document.createElement('div');
    item.className = 'recent-item';
    item.innerHTML = `
        <div class="recent-img-box">
            <img src="${imgSrc}" alt="${title}">
        </div>
        <div class="recent-info-title">${title}</div>
        <div class="recent-info-price">${price}</div>
    `;

    recentList.prepend(item);

    recentSection.style.display = 'block';

    setTimeout(() => {
        updateRecentVisibility();
    }, 10);
}

window.onload = () => {
    recentSection.style.display = 'block';
    
    if (recentList.children.length === 0) {
        recentSection.classList.add('hide-recent');
    }
    updateSearchIcon();
};
