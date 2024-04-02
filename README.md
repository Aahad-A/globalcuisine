# GlobalCuisine

## Overview
This project is an e-commerce website designed to provide a seamless shopping experience. It features user authorization for secure access, a comprehensive database for product and user data management, and a robust back-end built using Express.js in a Node.js environment. It is currently deployed onto AWS EC2 instance and can be accessed through the following link: http://http://18.219.118.150:3003/. Currently working on changing domain name and reverse proxy so that it can be accessed without a port number...

## Features
- User Authorization: Secure sign-up and login functionality with password encryption for user safety.
- Product Management: Users can browse, search, and purchase products. Admin users can add, edit, or remove listings.
- Shopping Cart: Integrated shopping cart for easy product selection and checkout process.
- Order History: Users can view their purchase history and track order status.
- Database Integration: Utilizes MariaDB for storing and managing user and product data efficiently.
## Technologies Used
- Frontend: HTML, CSS, JavaScript 
- Backend: Node.js with Express.js framework 
- Database: MariaDB for data storage and management
## Setup and Installation for Local Development
1. Clone the repository to your local machine.
2. Navigate to the project directory and install dependencies: 'npm install'.
3. Set up MariaDB on your local machine and configure the database settings in the project (inside sqlstatements.txt)
4. Start the server with 'nodemon start'
5. Access the website through localhost:3003