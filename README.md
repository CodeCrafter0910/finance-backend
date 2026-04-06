Finance Backend Project

Hi! This is my submission for the backend assignment. I built a financial data processing system that tracks records and restricts access based on a user's role. It is built using Node.js, Express, and MongoDB.

Live URL: https://finance-backend-8f18.onrender.com

Features I Built:
- User & Role Management: I created an access control system with Admin, Analyst, and Viewer roles. 
- Tracking Records: You can create, view, edit, and delete financial entries. I also made sure you can filter these records by date, type, and category.
- Dashboard Summaries: There are specific endpoints that automatically calculate totals and monthly trends for the frontend.
- Validation: The server guards against bad inputs and sends back the correct 400 or 404 error codes.

How to run it locally:
1. Open your terminal in the project folder and type: npm install
2. Create a .env file and put your database link in it: MONGODB_URI=mongodb://localhost:27017/finance-backend
3. Type npm start to run the server.

API Setup and Structure:
I separated all the logic into different folders: models, routes, controllers, and middleware. Here are the main API points to test:
- /api/roles tells the database what permissions each role gets. You should hit /api/roles/init-default-roles first to set up the defaults.
- /api/users handles creating new people who use the app.
- /api/records is for managing money. You can use query parameters here like /api/records?type=income
- /api/dashboard calculates all the summary data.

Assumptions and Tradeoffs I Made:
To follow the assignment instructions without overcomplicating the logic, I made a couple of deliberate choices:
- Mock Authentication: Instead of building a full JWT (login token) system, I used a simpler mock authentication. When testing the API, you just need to pass the user's database ID in the headers as "x-user-id". The assignment mentioned that mock setups are acceptable!
- Simple Validation: I decided to handle input validation cleanly inside the controllers instead of installing heavy external packages. It keeps the files readable.
- Database: I chose MongoDB because it allows the record data and categories to be super flexible.

I put a lot of effort into making the code clean and easy to read. Thank you for checking out my work!
