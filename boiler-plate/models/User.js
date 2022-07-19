const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const  saltRounds  =  10 ; 

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true,
        minlength: 5
    },
    password: {
        type: String,
        trim: true,
    },
    role: {
        type: Number,
        default: 0
    },
    image: String,
    token: {
        type: String
    },
    tokenExp: {
        type: Number
    }
})

//mongoose메서드를 활용하여 save(저장하기 전에 무엇을 할지 정할 수 있다.)
userSchema.pre('save', function(next){

    let user = this;

    //비밀번호만 변경시 동작한다. isModified로 인하여
    if(user.isModified('password')){

    //비밀번호를 암호화 한다.
    //bcrypt에서 제공하는 salt를 이용해서 암호화 한다.
    //saltRounds는 salt가 몇글자인지 나타내는 것이다. 지금은 10자리인 것
    //이것을 이용해서 암호화 한다.
    //salt를 만들때 saltrounds를 사용해서 만든다.
    bcrypt.genSalt(saltRounds, function(err, salt) {
        if(err){
            //err가 밯생하면 /join의 err로 이동해서 err 처리를 해준다.
            return next(err)
        }
        //salt를 제대로 생성했다면
        // myPlaintextPassword를 body에 담겨있는 password정보를 가져와야한다.
        // 그래서 user를 선언해주고 그안에 있는 password로 바꿔준다.
        bcrypt.hash(user.password, salt, function(err, hash) {
            if(err){
                return next(err)
            }
            user.password = hash
            next()
        });
    });
    //비밀번호를 바꾸는게 아니라 다른것을 바꿀때에는 next로해줘야 바로 index.js의 user.save로 나갈 수 있다.
    }else {
        //next()가 없기 때문에 계속 머물게 된다.
        next()
    }

})

//스키마
const User = mongoose.model('User', userSchema)

//다른곳에서도 쓸 수 있게 exports해준다
module.exports = { User }