document.addEventListener('DOMContentLoaded', function() {
    const quantityInputs = document.querySelectorAll('input[name="quantity_number"]');
    const removeButtons = document.querySelectorAll('.basket__remove-item-button');
    const checkoutLink = document.getElementById('checkoutLink');

    if (checkoutLink) {
        checkoutLink.addEventListener('click', function(e) {
            e.preventDefault();
            saveBasketToStorage();
            window.location.href = this.href;
        });
    }
    
    function calculateTotals() {
        let subtotal = 0;
        
        document.querySelectorAll('.basket__item').forEach(row => {
        const priceText = row.querySelector('td:nth-child(4)').textContent;
        const price = parseFloat(priceText.replace(/[^\d.]/g, ''));
        const quantityInput = row.querySelector('input[name="quantity_number"]');
        const quantity = parseInt(quantityInput.value) || 0;
        
        subtotal += price * quantity;
        
        const rowSubtotal = row.querySelector('td:last-child');
        rowSubtotal.textContent = (price * quantity).toFixed(2) + ' RUB';
        });
        
        const delivery = 250;
        const total = subtotal + delivery;
        
        document.querySelector('input[name="subtotal"]').value = subtotal.toFixed(2);
        document.querySelector('input[name="delivery"]').value = delivery.toFixed(2);
        document.querySelector('input[name="total"]').value = total.toFixed(2);
    }
    
    quantityInputs.forEach(input => {
        input.addEventListener('change', calculateTotals);
        input.addEventListener('input', calculateTotals);
    });
    
    removeButtons.forEach(button => {
        button.addEventListener('click', function() {
        this.closest('.basket__item').remove();
        calculateTotals();
        });
    });
    
    calculateTotals();
});

function saveBasketToStorage() {
    const basketItems = [];
    
    document.querySelectorAll('.basket__item').forEach(item => {
        basketItems.push({
            image: item.querySelector('td:nth-child(1) img').src,
            title: item.querySelector('td:nth-child(2)').textContent,
            description: item.querySelector('td:nth-child(3)').textContent,
            price: parseFloat(item.querySelector('td:nth-child(4)').textContent),
            quantity: parseInt(item.querySelector('input[name="quantity_number"]').value)
        });
    });
    
    const subtotal = document.querySelector('input[name="subtotal"]').value;
    const delivery = document.querySelector('input[name="delivery"]').value;
    const total = document.querySelector('input[name="total"]').value;
    
    localStorage.setItem('basket', JSON.stringify(basketItems));
    localStorage.setItem('basket_totals', JSON.stringify({
        subtotal,
        delivery,
        total
    }));
}