Server Github Link: https://github.com/Yash-007/E-commerce-Server


 # E-Commerce Website Project Description
 
This project is a full-featured eCommerce website developed using the MERN stack (MongoDB, Express.js, React.js, Node.js), Redux, TailwindCSS, Material UI, Firebase, Stripe, ChartJS. The website allows users to browse products, add items to their cart, apply discount coupons, and securely complete their purchases using the Stripe payment gateway.


# Features
User Authentication: Secure login and registration using Firebase for Google authentication.

Product Browsing and Search: Users can browse products with advanced filtering options, including sorting by price, category filtering, and maximum price range.

Cart and Checkout: Users can add products to their cart, apply discount coupons, and proceed to checkout with Stripe integration.

Responsive Design: Fully responsive design ensures a seamless experience across desktop and mobile devices.


# Admin Panel
The admin panel provides comprehensive management tools and data visualization capabilities:

Dashboard: View key statistics and metrics related to users, products, and sales.

User Management: Admins can view, edit, and delete user accounts.

Product Management: Admins can add, edit, and delete products, as well as manage product inventory.

Order Management: Admins can view and process orders, updating the status (e.g., shipped, delivered).

Coupon Management: Create and manage discount coupons for promotional offers.

Data Visualization: Interactive charts (bar charts, line charts, pie charts) for visualizing sales, user growth, and other metrics.


# Backend
Database: Utilizes MongoDB for scalable and efficient data management.

Caching: Implemented backend caching to enhance performance and reduce data retrieval time by 80%.

Security: Ensured secure user data handling and transaction processing.


# Install Dependencies

**For Dev** - `npm i && npm run dev`

## Env Variables

Make Sure to Create a .env file in root directory and add appropriate variables in order to use the app.

**Essential Variables**

VITE_FIREBASE_KEY= `from firebase`

VITE_AUTH_DOMAIN= `from firebase`

VITE_PROJECT_ID=`from firebase`

VITE_STORAGE_BUCKET=`from firebase`

VITE_MESSAGING_SENDER_ID=`from firebase`

VITE_APP_ID=`from firebase`

VITE_SERVER=`Your Backend Server URl`/api/v1

VITE_STRIPE_KEY=`Stripe Publishable Key`

_fill each filed with your info respectively_


