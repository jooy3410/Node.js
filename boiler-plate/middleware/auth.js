const { User } = require("../models/User");


let auth = (req, res, next) => {

    //인증처리를 하는곳
    //순서
    // 1. 클라이언트 쿠키에서 토큰을 가져온다.
    let token = req.cookies.x_auth;
    // 2. 토큰을 복호화 한후 유저를 찾는다.

    User.findByToken(token, (err, user) =>{
        if(err) throw  err;
        if(!user) return res.json({ isAuth: false, error: true})
        //req에 token과 user를 넣어주는이유
        //넣어줌으로써 index.js에서 req.user,req,token을 쓰면 바로사용할 수 있어서 쓴다.
        req.token = token;
        req.user = user;
        //역할을 다했으면 다음단계로 넘어갈수있게 next();를 마지막에 써준다.
        next();
    })

    // 3. 유저가 있으면 인증 okay
    // 4. 유저가 없으면 인증 no
}

module.exports = { auth };