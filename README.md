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

To make things easy for now, I didn't use complicated login tokens. Instead, you just have to include the user's database ID in the api request headers. The header key should be "x-user-id" and the value should be their ID.

Eventually I want to add real JWT login security and maybe a way to search through the records, but this is the starting version.
