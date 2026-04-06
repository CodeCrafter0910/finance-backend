Finance Data Processing and Access Control Backend

Hi there, I built this backend API to manage financial records and securely control who can see or edit them. I used Node.js, Express, and MongoDB for this project.

Live Deployed API: https://finance-backend-8f18.onrender.com

How the roles and permissions work:
I set up three specific roles to control access:
1. Viewer: Can only read the records and look at the dashboard.
2. Analyst: Can view the records, the dashboard, and has permission to export data.
3. Admin: Has full control. They can create users, manage records, and basically do everything.

Features inside the App:
- Full CRUD for financial entries (you can add income/expenses with an amount, category, date, and description).
- Dashboard summaries: The API calculates total income, expenses, and category breakdowns so the frontend doesn't have to do the math.
- Secure Login: Users get a JWT (JSON Web Token) when they log in to keep sessions secure.
- Pagination: If there are too many records, you can use ?page=1&limit=10 so the server doesn't crash from loading too much.

How to run it locally on your computer:
1. Download or clone this repository.
2. Open your terminal inside the folder and run: npm install
3. You need to connect a database. Create a file named .env and put this inside:
   MONGODB_URI=mongodb://localhost:27017/finance-backend
   JWT_SECRET=my_secret_key_here
4. Run: npm start (The server will run on port 5000).

Make sure to send a POST request to /api/roles/init-default-roles first, so the database knows what Viewer, Analyst, and Admin are!

To log in:
Send a POST request to /api/users/login with your email and password. You will receive a token. Put that token in your HTTP Headers like this: "Authorization: Bearer YOUR_TOKEN" to access the restricted routes.

My Technical Decisions and Trade-offs (For Evaluation):
- Database choice: I went with MongoDB instead of SQL (like Postgres) because financial records can sometimes have extra notes or changing categories, and MongoDB's flexible documents handle that well without strict migrations.
- Architecture: I kept all the business logic inside controllers and used middleware just for checking roles and verifying the JWT tokens. This keeps the routes files very clean.
- Dashboard logic: I decided to aggregate the totals (like category spending) directly on the backend. The tradeoff here is that the backend does a bit more work, but it keeps any potential frontend super fast and lightweight.
- Security: I initially thought about using sessions, but I went with JWT tokens because they are stateless, making the backend easier to host on free cloud services like Render without worrying about memory leaks.
