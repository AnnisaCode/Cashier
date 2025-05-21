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

    function formatCurrency(value) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2
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

    productForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const productName = document.getElementById('productName').value;
        const productPrice = parseFloat(document.getElementById('productPrice').value);

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${productName}</td>
            <td data-price="${productPrice}">${formatCurrency(productPrice)}</td>
            <td><button class="btn btn-danger btn-sm delete-btn">Delete</button></td>
        `;
        productTableBody.appendChild(row);

        totalPrice += productPrice;

        totalAmountSpan.textContent = formatCurrency(totalPrice);

        productForm.reset();
    });

    productTableBody.addEventListener('click', function (e) {
        if (e.target.classList.contains('delete-btn')) {
            const row = e.target.closest('tr');
            const productPrice = parseFloat(row.querySelector('[data-price]').getAttribute('data-price'));

            totalPrice -= productPrice;
            totalAmountSpan.textContent = formatCurrency(totalPrice);

            row.remove();
        }
    });

    calculateChangeBtn.addEventListener('click', function () {
        modalTotalPrice.textContent = formatCurrency(totalPrice);
        $('#changeModal').modal('show');
    });

    confirmPaymentBtn.addEventListener('click', function () {
        const customerMoney = parseFloat(modalCustomerMoney.value);
        const changeAmount = customerMoney - totalPrice;
        modalChangeAmount.textContent = formatCurrency(changeAmount);
    });
});
