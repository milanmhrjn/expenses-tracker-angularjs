const express = require('express');
const cors = require('cors');
const userDetailRoutes = require('./routes/userDetailRoutes')
const expensesTrackerRoutes = require('./routes/expensesTrackerRoutes')
require('dotenv').config(); 

const app = express();
app.use(cors());
app.use(express.json());
app.use('/', expensesTrackerRoutes);
app.use('/', userDetailRoutes);


app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});