const express = require('express')
const app = express()
const port = 5000
const bodyParser = require('body-parser');
require("dotenv").config({ path: "/data/node/NodeJS/.env"});
const uri = process.env.uri
const cookieParser = require('cookie-parser');

// const { uri } = process.env
//application/x-www-form-urlencoded 
//이렇게 된 데이터를 분석해서 가져올수 있게 해준다.
app.use(bodyParser.urlencoded({extended: true}));
//application/json json타입으로 된것을 가져올수 있게 해준다.
app.use(bodyParser.json());
app.use(cookieParser());
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
      console.log("join success")
      return res.status(200).json({
        success: true
      })
    })
})

app.post('/login', (req,res) => {
  //첫번째 요청된 이메일이 맞는지확인
  //user모델을 가져오고 mongodb찾는 메서드인 findone을 사용한다.
  User.findOne({ email: req.body.email }, (err, user) => {
    if(!user){
      return res.json({
        loginSuccess: false,
        messeage: "제공된 이메일의 해당하는 유저가 없습니다."
      })
    }


  //요청된 이메일이 데이터 베이스에 있다면 비밀번호가 일치하는지 확인
  //두번째 아규먼트는 콜백함수이다. 처음은 에러 그다음 받아온 데이터 에러가 맞는지 확인

  user.comparePassword(req.body.password, (err, isMatch) =>{
    if(!isMatch){
      return res.json({loginSuccess :false, message: "비밀번호가 틀렸습니다."})
    }

    //세번째 비밀번호가 맞았다면 토큰생성하기
    user.genrateToken((err, user) => {
      if(err){
        return res.status(400).send(err);
      } 
      //토큰을 저장한다. 어디에? 쿠키, 로컬스토리지, 세션
      //쿠키에 저장하겠다
      //쿠키에 저장하려면 cokie-parser라이브러리를 설치
      res.cookie("x_auth", user.token)
      .status(200)
      .json({loginSuccess: true, userId: user._id});

    })
  })

})
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})