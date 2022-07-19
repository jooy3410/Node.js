const express = require('express')
const app = express()
const port = 5000
const bodyParser = require('body-parser');
require("dotenv").config({ path: "/data/node/NodeJS/.env"});
const uri = process.env.uri

// const { uri } = process.env
//application/x-www-form-urlencoded 
//이렇게 된 데이터를 분석해서 가져올수 있게 해준다.
app.use(bodyParser.urlencoded({extended: true}));
//application/json json타입으로 된것을 가져올수 있게 해준다.
app.use(bodyParser.json());

//models/User.js import
const  { User } = require("./models/User");

//몽고 db연결
// const mongoose = require('mongoose')
// mongoose.connect('mongodb://localhost:27017')
// .then(() => console.log('MongoDB Connected...'))
// .catch(err => console.log(err))

const mongoose = require('mongoose')
mongoose.connect(uri)
.then(() => console.log('MongoDB Connected...'))
.catch(err => console.log(err))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/join', (req, res) => {
  //회원 가입 할때 필요한 정보를 client에서 가져오면
  //그것을 데이터 베이스에 넣는다.

  // 가져온 User를 가지고 인스턴스를 만든다.
  //bodyParser를 통해 가져올수 있게한다.
    const user = new User(req.body)

    user.save((err, userInfo) => {
      //err가 생기면 전달해준다 json형식으로
      //성공하지 못했다 에러 메시지와함께 
      if(err) {
        console.log(err)
        return res.json({success: false, err })
      }
      //성공했다면 이것을 보내준다.
      console.log("success")
      return res.status(200).json({
        success: true
      })
    })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})