# FarmDirect - Farm-to-Consumer Direct Selling Platform

A modern, responsive static HTML application connecting Sri Lankan farmers directly with consumers. Built with Tailwind CSS, featuring a professional UI/UX, localStorage persistence, and complete e-commerce functionality.

## Features

### Core Functionality
- **Product Catalog** - Browse and filter organic products with advanced search
- **Shopping Cart** - Full cart management with localStorage persistence
- **User Authentication** - Login/Register system (demo-ready)
- **Order Management** - Track orders and view history
- **Seller Dashboard** - Comprehensive interface for farmers
- **Responsive Design** - Mobile, tablet, and desktop optimized

### Pages Included

#### Customer Pages
1. **Homepage** (`index.html`)
   - Hero section with CTA
   - Featured products carousel
   - Category browsing
   - Testimonials
   - Newsletter signup

2. **Products** (`pages/products.html`)
   - Grid/list view toggle
   - Filter by category, price, rating
   - Sort functionality
   - Responsive product cards

3. **Product Details** (`pages/product-detail.html`)
   - Image gallery
   - Product specifications
   - Farmer information
   - Add to cart functionality

4. **Shopping Cart** (`pages/cart.html`)
   - Quantity adjustment
   - Remove items
   - Order summary
   - Delivery calculations

5. **Checkout** (`pages/checkout.html`)
   - Multi-step form
   - Address management
   - Payment method selection
   - Order confirmation

6. **User Profile** (`pages/profile.html`)
   - Personal information management
   - Address book
   - Account settings

7. **Orders** (`pages/orders.html`)
   - Order history
   - Order tracking
   - Order details

#### Seller Pages
8. **Seller Dashboard** (`pages/seller-dashboard.html`)
   - Sales analytics
   - Product management
   - Order processing
   - Performance metrics

9. **Seller Onboarding** (`pages/seller-onboarding.html`)
   - Registration form
   - Farm details
   - Product categories
   - Verification process

#### Informational Pages
10. **About Us** (`pages/about.html`)
    - Company mission
    - Values and vision
    - Team information

11. **Contact** (`pages/contact.html`)
    - Contact form
    - Business information
    - Map integration ready

12. **FAQ** (`pages/faq.html`)
    - Accordion-style questions
    - Category organization
    - Search functionality

13. **Blog** (`pages/blog.html`)
    - Article listings
    - Categories
    - Featured posts

14. **Our Farmers** (`pages/farmers.html`)
    - Farmer profiles
    - Location information
    - Product specialties

#### Authentication Pages
15. **Login** (`pages/login.html`)
    - Email/password login
    - Demo login option
    - Remember me functionality

16. **Register** (`pages/register.html`)
    - User registration
    - Form validation
    - Terms acceptance

## Technical Stack

### Technologies Used
- **HTML5** - Semantic markup
- **Tailwind CSS** (via CDN) - Utility-first CSS framework
- **Vanilla JavaScript** - No framework dependencies
- **localStorage** - Client-side data persistence
- **Unsplash** - High-quality placeholder images

### File Structure
```
static/
├── index.html                 # Homepage
├── pages/                     # All inner pages
│   ├── products.html
│   ├── product-detail.html
│   ├── cart.html
│   ├── checkout.html
│   ├── login.html
│   ├── register.html
│   ├── profile.html
│   ├── orders.html
│   ├── seller-dashboard.html
│   ├── seller-onboarding.html
│   ├── farmers.html
│   ├── about.html
│   ├── contact.html
│   ├── faq.html
│   └── blog.html
├── scripts/                   # JavaScript files
│   ├── main.js               # Core utilities
│   ├── home.js               # Homepage logic
│   ├── products.js           # Product listing
│   └── cart.js               # Cart functionality
├── styles/                    # CSS files
│   └── main.css              # Custom styles
└── assets/                    # Images and icons
    ├── images/
    └── icons/
```

## Features in Detail

### localStorage Implementation
The application uses localStorage for:
- **Shopping Cart** - Persistent cart across sessions
- **User Profile** - User data storage
- **Wishlist** - Save favorite products
- **Order History** - Track past orders
- **Authentication State** - Remember logged-in users

### JavaScript Modules

#### main.js
Core functionality including:
- Navigation management
- Cart operations (add, remove, update)
- User authentication
- Order management
- Wishlist functionality
- Toast notifications
- Modal controls
- Form validation
- Currency formatting

#### products.js
Product listing features:
- Dynamic product rendering
- Filter by category, price, rating
- Sort by price and popularity
- Search functionality
- Responsive grid layout

#### cart.js
Shopping cart features:
- Real-time cart updates
- Quantity management
- Price calculations
- Delivery fee computation

#### home.js
Homepage features:
- Featured product loading
- Dynamic product cards
- Wishlist integration
- Quick add to cart

### UI/UX Features

#### Design Elements
- **Color Scheme**: Green primary (#16a34a), complementary neutrals
- **Typography**: Inter font family
- **Animations**: Smooth transitions, hover effects, loading states
- **Components**: Cards, buttons, forms, modals, toasts

#### Micro-interactions
- Hover effects on cards and buttons
- Smooth scroll behavior
- Loading spinners
- Success/error notifications
- Floating action elements
- Progress indicators

#### Responsive Breakpoints
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

### Accessibility
- Semantic HTML5 elements
- ARIA labels where needed
- Keyboard navigation support
- Focus visible states
- Sufficient color contrast
- Alt text for images

## Quick Start

### Demo Login
For testing purposes, use the demo login:
- **Email**: demo@farmdirect.lk
- **Password**: demo123

Or click "Login as Demo User" on the login page.

### Testing Features

1. **Browse Products**
   - Navigate to Products page
   - Use filters and sorting
   - Click products for details

2. **Shopping Flow**
   - Add products to cart
   - View cart
   - Proceed to checkout
   - Place order

3. **User Account**
   - Register new account
   - Login
   - View profile
   - Check orders

4. **Seller Features**
   - Access seller dashboard
   - View onboarding process

## Deployment

### GitHub Pages
1. Upload the `static` folder to your repository
2. Enable GitHub Pages in repository settings
3. Set source to the folder containing `index.html`
4. Access via `https://yourusername.github.io/repository-name/`

### Netlify
1. Drag and drop the `static` folder to Netlify
2. Or connect your Git repository
3. Set publish directory to `static`
4. Deploy

### Vercel
1. Import project from Git
2. Set root directory to `static`
3. Deploy

### Any Static Host
Simply upload the contents of the `static` folder to your web hosting service.

## Customization

### Colors
Edit the Tailwind config in HTML files:
```javascript
tailwind.config = {
    theme: {
        extend: {
            colors: {
                primary: '#16a34a',  // Change this
                secondary: '#15803d', // Change this
                accent: '#f59e0b'     // Change this
            }
        }
    }
}
```

### Products
Edit mock data in `scripts/home.js` or `scripts/products.js`:
```javascript
const featuredProducts = [
    {
        id: 1,
        name: 'Product Name',
        price: 350,
        image: 'image-url',
        category: 'category',
        // ... more fields
    }
];
```

### Styling
Modify `styles/main.css` for custom animations and components.

## Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Future Enhancements

### Potential Additions
- Backend API integration
- Real payment gateway
- Email notifications
- SMS alerts
- Rating and reviews
- Product recommendations
- Advanced search
- Multi-language support
- Dark mode
- PWA capabilities

## Performance

### Optimization Features
- Lazy loading images
- Minimal JavaScript
- CDN-delivered Tailwind CSS
- Optimized animations
- Efficient localStorage usage

## Security Notes

### Current Implementation
- Client-side only (no backend)
- localStorage for data persistence
- No sensitive data storage
- Demo authentication only

### For Production
- Implement server-side authentication
- Use secure payment gateways
- Add HTTPS
- Implement CSRF protection
- Sanitize user inputs
- Add rate limiting

## Credits

- **Images**: Unsplash.com
- **Icons**: Heroicons (via SVG)
- **Fonts**: Google Fonts (Inter)
- **CSS Framework**: Tailwind CSS

## License

This project is created for educational purposes. Free to use and modify.

## Support

For issues or questions:
- Email: info@farmdirect.lk
- Phone: +94 11 234 5678

---

**Built with care for Sri Lankan farmers and consumers** 🌱

*Version 1.0 - October 2024*