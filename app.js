document.addEventListener('DOMContentLoaded', function () {
    const productForm = document.getElementById('productForm');
    const productTableBody = document.querySelector('#productTable tbody');
    const toggleModeCheckbox = document.getElementById('toggleMode');
    const calculateChangeBtn = document.getElementById('calculateChange');
    const totalAmountSpan = document.getElementById('totalAmount');
    const modalTotalPrice = document.getElementById('modalTotalPrice');
    const modalCustomerMoney = document.getElementById('modalCustomerMoney');
    const modalChangeAmount = document.getElementById('modalChangeAmount');
    const confirmPaymentBtn = document.getElementById('confirmPayment');
    let totalPrice = 0;

    // Security: Sanitize input to prevent XSS attacks
    function sanitizeInput(input) {
        const temp = document.createElement('div');
        temp.textContent = input;
        return temp.innerHTML;
    }

    // Security: Validate numeric input
    function validateNumericInput(input) {
        return !isNaN(parseFloat(input)) && isFinite(input) && parseFloat(input) >= 0;
    }

    function formatCurrency(value) {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(value);
    }

    function setMode(mode) {
        if (mode === 'dark') {
            document.body.classList.add('dark-mode');
            toggleModeCheckbox.checked = true;
        } else {
            document.body.classList.remove('dark-mode');
            toggleModeCheckbox.checked = false;
        }
        localStorage.setItem('mode', mode);
    }

    const savedMode = localStorage.getItem('mode');
    if (savedMode) {
        setMode(savedMode);
    }

    toggleModeCheckbox.addEventListener('change', function () {
        if (toggleModeCheckbox.checked) {
            setMode('dark');
        } else {
            setMode('light');
        }
    });

    // Show notification
    function showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `alert alert-${type} notification`;
        notification.innerHTML = `<i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i> ${sanitizeInput(message)}`;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.opacity = '1';
        }, 10);

        setTimeout(() => {
            notification.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    productForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Security: Get and validate input values
        const productNameInput = document.getElementById('productName');
        const productPriceInput = document.getElementById('productPrice');

        const productName = productNameInput.value.trim();
        const productPrice = productPriceInput.value;

        // Security: Validate inputs
        if (!productName) {
            showNotification('Product name cannot be empty', 'danger');
            return;
        }

        if (!validateNumericInput(productPrice)) {
            showNotification('Invalid price. Please enter a valid number', 'danger');
            return;
        }

        // Security: Sanitize input
        const sanitizedName = sanitizeInput(productName);
        const parsedPrice = parseFloat(productPrice);

        const row = document.createElement('tr');
        // Security: Use textContent for sanitizedName to prevent XSS
        const nameCell = document.createElement('td');
        const icon = document.createElement('i');
        icon.className = 'fas fa-shopping-cart me-2';
        nameCell.appendChild(icon);
        nameCell.appendChild(document.createTextNode(' ' + sanitizedName));

        const priceCell = document.createElement('td');
        priceCell.setAttribute('data-price', parsedPrice);
        priceCell.textContent = formatCurrency(parsedPrice);

        const actionCell = document.createElement('td');
        actionCell.innerHTML = `<button class="btn btn-danger btn-sm delete-btn"><i class="fas fa-trash me-2"></i> Delete</button>`;

        row.appendChild(nameCell);
        row.appendChild(priceCell);
        row.appendChild(actionCell);

        productTableBody.appendChild(row);

        // Add animation
        row.style.animation = 'fadeIn 0.5s ease-out';

        totalPrice += parsedPrice;
        totalAmountSpan.textContent = formatCurrency(totalPrice);

        productForm.reset();
        showNotification(`${sanitizedName} added successfully!`);
    });

    productTableBody.addEventListener('click', function (e) {
        if (e.target.classList.contains('delete-btn') || e.target.parentElement.classList.contains('delete-btn')) {
            const row = e.target.closest('tr');
            const productPrice = parseFloat(row.querySelector('[data-price]').getAttribute('data-price'));

            // Animation for deletion
            row.style.animation = 'fadeOut 0.3s ease-out forwards';

            setTimeout(() => {
                row.remove();
                totalPrice -= productPrice;
                totalAmountSpan.textContent = formatCurrency(totalPrice);
                showNotification(`Item removed!`, 'warning');
            }, 300);
        }
    });

    calculateChangeBtn.addEventListener('click', function () {
        modalTotalPrice.textContent = formatCurrency(totalPrice);
        $('#changeModal').modal('show');
        modalCustomerMoney.value = ''; // Clear previous value
        modalChangeAmount.textContent = formatCurrency(0);
    });

    // Add real-time change calculation with input validation
    modalCustomerMoney.addEventListener('input', function () {
        // Security: Validate input
        if (!validateNumericInput(modalCustomerMoney.value)) {
            modalChangeAmount.textContent = formatCurrency(0);
            modalChangeAmount.classList.add('text-danger');
            return;
        }

        const customerMoney = parseFloat(modalCustomerMoney.value) || 0;
        const changeAmount = customerMoney - totalPrice;
        modalChangeAmount.textContent = formatCurrency(changeAmount);

        // Highlight negative change in red
        if (changeAmount < 0) {
            modalChangeAmount.classList.add('text-danger');
        } else {
            modalChangeAmount.classList.remove('text-danger');
        }
    });

    confirmPaymentBtn.addEventListener('click', function () {
        // Security: Validate input
        if (!validateNumericInput(modalCustomerMoney.value)) {
            showNotification('Please enter a valid amount', 'danger');
            return;
        }

        const customerMoney = parseFloat(modalCustomerMoney.value);
        const changeAmount = customerMoney - totalPrice;

        if (isNaN(customerMoney) || customerMoney < totalPrice) {
            showNotification('Insufficient payment amount!', 'danger');
            return;
        }

        modalChangeAmount.textContent = formatCurrency(changeAmount);

        // Clear the cart after successful payment
        productTableBody.innerHTML = '';
        totalPrice = 0;
        totalAmountSpan.textContent = formatCurrency(0);

        $('#changeModal').modal('hide');

        showNotification('Payment completed successfully!');
    });

    // Add CSS for notifications
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeOut {
            from { opacity: 1; transform: translateY(0); }
            to { opacity: 0; transform: translateY(-10px); }
        }
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 1050;
            padding: 15px 25px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        .me-2 {
            margin-right: 0.5rem;
        }
    `;
    document.head.appendChild(style);
});
