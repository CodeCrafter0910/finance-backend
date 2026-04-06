My Finance App Backend

Hi! I made this backend project to keep track of money and financial records. It is coded in Node.js and Express, and I used MongoDB to save all the data. 

I also added a permission system to control who can do what:
Admin: The main boss who can add users, delete records, and handle everything.
Analyst: This person can view the data and dashboard, and they can also export the information.
Viewer: Someone who can only look at the records but can't change anything.

The site also has a dashboard that calculates category totals and shows your monthly spending habits.

Here is how you can run it on your own computer:
1. Download this folder.
2. Open your terminal in this folder and type: npm install (this downloads what the app needs).
3. You will need a database. Make a new file called .env in the folder and type your connection string inside like this: MONGODB_URI=mongodb://localhost:27017/finance-backend
4. To turn the server on, type: npm start. It will start running on port 5000.

The first thing you need to do is tell the database about the Admin, Analyst, and Viewer roles. Send a POST request to http://localhost:5000/api/roles/init-default-roles to create them.

For security, the login system uses secure JWT (JSON Web Tokens). You send a POST request with your email and password to /api/users/login to get your token. Then, you just send that token in the header as "Authorization: Bearer YOUR_TOKEN".

The records list also has pagination now. You can add ?page=1&limit=10 to the api url so it doesn't try to load thousands of records all at once.

My Technical Decisions & Tradeoffs:
- I used Express because it's very lightweight and easy to organize the project files.
- I chose MongoDB because it is flexible for the records and we didn't need complicated SQL tables.
- For the dashboard, I decided to calculate the category totals on the server side so the frontend doesn't have to do heavy math.
- I upgraded to JWT tokens because it's the right way to do security in the real world compared to just passing user IDs.
- I added pagination (page and limit) to the records so the server doesn't choke if someone adds too many records at once.
