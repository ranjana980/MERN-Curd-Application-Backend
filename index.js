const express = require('express');
const mongoos = require('mongoose');
const app = express();
const EmployeeRoute=require('./routes/employee')
const bodyParser = require("body-parser")
const cors = require('cors');
app.use(express.json({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

mongoos.connect("mongodb+srv://<ranjana20@navgurukul.org>:<ranjana24081996>@atlascluster.d3frrjb.mongodb.net/?retryWrites=true&w=majority",
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
  origin: "https://mern-curd-application-frontend.vercel.app/"
}))
app.use(cors())

app.use('/api/employee',EmployeeRoute)


app.listen(4000, () => {
  console.log('server is running on 4000')
});
