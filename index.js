require('dotenv').config(); // Load environment variables at the top

const express = require('express');
const mongoose = require('mongoose');
const app = express();
const EmployeeRoute = require('./routes/employees');
const bodyParser = require("body-parser")
const cors = require('cors');

app.use(express.json({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


const username = encodeURIComponent(process.env.MONGODB_USERNAME);
const password = encodeURIComponent(process.env.MONGODB_PASSWORD);

mongoose.connect(`mongodb+srv://${username}:${password}@cluster0.tdqxm.mongodb.net/sample_mflix?retryWrites=true&authMechanism=SCRAM-SHA-1`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    family: 4,
  }, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log('connected successfully');
    }
  });
mongoose.set('strictQuery', true);

app.use(cors({
  origin: "https://mern-curd-application-frontend.vercel.app",
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}))


app.use('/api/employee', EmployeeRoute)

app.listen(4000, () => {
  console.log('server is running on 4000');
});