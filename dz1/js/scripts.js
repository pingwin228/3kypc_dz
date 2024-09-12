function sortProducts(order) {
    const productsContainer = document.getElementById('products');
    const products = Array.from(productsContainer.getElementsByClassName('product'));

    products.sort((a, b) => {
        const priceA = parseInt(a.getAttribute('data-price'));
        const priceB = parseInt(b.getAttribute('data-price'));

        if (order === 'asc') {
            return priceA - priceB;
        } else {
            return priceB - priceA;
        }
    });

    products.forEach(product => productsContainer.appendChild(product));
}

function filterCategory(category) {
    const products = document.querySelectorAll('.product');

    products.forEach(product => {
        const productCategory = product.getAttribute('data-category');

        if (category === 'all' || productCategory === category) {
            product.style.display = 'flex';
        } else {
            product.style.display = 'none';
        }
    });
}
