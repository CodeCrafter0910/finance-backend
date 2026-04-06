Finance Data Processing and Access Control Backend

Hi there, I built this backend API to manage financial records and securely control who can see or edit them. I used Node.js, Express, and MongoDB for this project.

Live Deployed API: https://finance-backend-8f18.onrender.com

How the roles and permissions work:
I set up three specific roles to control access. Viewer can only read the records and look at the dashboard. Analyst can view the records, the dashboard, and has permission to export data. Admin has full control and can create users, manage records, and basically do everything.

Features inside the App:
Full CRUD for financial entries like income and expenses with an amount, category, date, and description.
Dashboard summaries where the API calculates total income, expenses, and category breakdowns so the frontend doesn't have to do the math.
Secure Login where users get a JWT JSON Web Token when they log in to keep sessions secure.
Pagination so if there are too many records you can use page and limit queries so the server doesn't crash from loading too much.

How to run it locally on your computer:
First, download or clone this repository.
Open your terminal inside the folder and run: npm install
You need to connect a database. Create a file named .env and put this inside:
MONGODB_URI=mongodb://localhost:27017/finance-backend
JWT_SECRET=my_secret_key_here
Then run: npm start, which will start the server on port 5000.

Make sure to send a POST request to /api/roles/init-default-roles first, so the database knows what Viewer, Analyst, and Admin are.

To log in:
Send a POST request to /api/users/login with your email and password. You will receive a token. Put that token in your HTTP Headers like this: Authorization: Bearer YOUR_TOKEN to access the restricted routes.

My Technical Decisions and Trade-offs For Evaluation:
Database choice: I went with MongoDB instead of SQL like Postgres because financial records can sometimes have extra notes or changing categories, and flexible documents handle that well without strict migrations.
Architecture: I kept all the business logic inside controllers and used middleware just for checking roles and verifying the JWT tokens. This keeps the routes files very clean.
Dashboard logic: I decided to aggregate the totals like category spending directly on the backend. The tradeoff here is that the backend does a bit more work, but it keeps any potential frontend super fast and lightweight.
Security: I initially thought about using sessions, but I went with JWT tokens because they are stateless, making the backend easier to host on free cloud services like Render without worrying about memory leaks.

API Route Documentation For Testing:
If you are testing this API via Postman or similar tools, here are the main endpoints you can use with the live Render URL.

Authentication & Users:
POST /api/users to register a user. This requires username, email, password, and role.
POST /api/users/login to login and receive your JWT Bearer token.
GET /api/users to get all users, this is for Admins only.
PATCH /api/users/IDHERE/role to update a user role, also Admins only.

Financial Records:
POST /api/records to add a new income or expense record.
GET /api/records to view all records, this supports ?page=1&limit=10 queries.
GET /api/records/user/USERIDHERE to view a specific user records.
PATCH /api/records/IDHERE to edit a record.
DELETE /api/records/IDHERE to remove a record.

Dashboard Data:
GET /api/dashboard/summary to view financial totals.
GET /api/dashboard/category-totals to view category spending.
GET /api/dashboard/recent-activity to view newest records.
GET /api/dashboard/monthly-trends to view spending and income per month.
