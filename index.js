const express = require('express');
const mongoos = require('mongoose');
const app = express();
const EmployeeRoute=require('./routes/employee')
const bodyParser = require("body-parser")
const cors = require('cors');
app.use(express.json({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

mongoos.connect('mongodb://localhost:27017/testapp',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
},(err)=>{
  if(err){
    console.log(err)
  }
  else{
    console.log('connected successfully')
  }
});

app.use(cors({
  origin: 'http://localhost:3000'
}))

app.use('/api/employee',EmployeeRoute)


app.listen(4000, () => {
  console.log('server is running on 4000')
});
