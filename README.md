# Cashier App

![Cashier App](https://img.shields.io/badge/Cashier-App-blue)
![Version](https://img.shields.io/badge/version-1.0.0-green)
![License](https://img.shields.io/badge/license-MIT-orange)

A secure and modern web-based point-of-sale (POS) application with an intuitive interface for managing sales transactions.

## Table of Contents

- [Features](#features)
- [Screenshots](#screenshots)
- [Technologies](#technologies)
- [Security Features](#security-features)
- [Installation](#installation)
- [Usage](#usage)
- [Browser Compatibility](#browser-compatibility)
- [Contributing](#contributing)
- [License](#license)

## Features

- ✅ **Product Management**: Add products with names and prices
- ✅ **Dynamic Cart Management**: Real-time updates for product addition and removal
- ✅ **Automatic Calculation**: Instant total price calculation
- ✅ **Payment Processing**: User-friendly payment interface with change calculation
- ✅ **Input Validation**: Prevents invalid inputs and provides helpful error messages
- ✅ **User Notifications**: Stylish notifications for all operations
- ✅ **Responsive Design**: Works on desktop, tablet, and mobile devices
- ✅ **Dark/Light Mode**: User preference saved between sessions
- ✅ **XSS Protection**: Input sanitization for secure data handling
- ✅ **Animations**: Smooth transitions for all interactions
- ✅ **IDR Currency**: Uses Indonesian Rupiah (IDR) as the default currency

## Technologies

- **HTML5**: Modern semantic markup
- **CSS3**: Advanced styling with animations and transitions
- **JavaScript (ES6+)**: Vanilla JS with no unnecessary frameworks
- **Bootstrap 4**: Responsive grid system and UI components
- **jQuery (slim)**: Minimal dependency for Bootstrap
- **Font Awesome**: Beautiful icons for enhanced UX
- **Web Storage API**: LocalStorage for saving user preferences

## Security Features

This application includes several security measures:

1. **Input Sanitization**: All user inputs are sanitized to prevent XSS attacks
2. **Content Security Policy**: Restricts sources of executable content
3. **Input Validation**: Verifies all numeric inputs before processing
4. **Safe DOM Manipulation**: Uses safe DOM methods to prevent script injection
5. **Error Handling**: Provides user feedback without exposing implementation details

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/annisacode/cashier-app.git
   ```

2. Navigate to the project directory:
   ```bash
   cd cashier-app
   ```

3. Open in your browser:
   - Double-click on `index.html` to open in your default browser
   - Alternatively, use a local development server like Live Server in VSCode

## Usage

1. **Add Products**:
   - Enter product name and price
   - Click "Add Product"

2. **Remove Products**:
   - Click "Delete" next to any product to remove it
   - The total will update automatically

3. **Process Payment**:
   - Click "Pay"
   - Enter the amount received from the customer
   - The change will calculate automatically
   - Click "Confirm Payment" to complete the transaction
   - The cart will clear for the next customer

4. **Switch Modes**:
   - Toggle the switch in the top-right corner to change between light and dark modes

## Browser Compatibility

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Opera (latest)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

© 2025 AnnisaCode. All Rights Reserved. 