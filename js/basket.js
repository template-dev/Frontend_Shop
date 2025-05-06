document.addEventListener('DOMContentLoaded', function() {
    const quantityInputs = document.querySelectorAll('input[name="quantity_number"]');
    const removeButtons = document.querySelectorAll('.basket__remove-item-button');
    
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