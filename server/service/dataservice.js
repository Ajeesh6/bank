const jwt = require('jsonwebtoken')
const db = require('./db')

//  userDetails= {
//     1000: { acno: 1000, username: "anu", password: "abc123", balance: 0, transaction: [] },
//     1001: { acno: 1001, username: "amal", password: "abc123", balance: 0, transaction: [] },
//     1003: { acno: 1003, username: "arun", password: "abc123", balance: 0, transaction: [] },
//     1004: { acno: 1004, username: "akil", password: "abc123", balance: 0, transaction: [] }
//   }




register = (uname, acno, pasw) => {

  // if (acno in userDetails) {
  return db.User.findOne({ acno }).then(user => {
    if (user) {
      return {
        status: false,
        message: 'user already present',
        statusCode: 401
      }
    }
    else {
      //create new user object in db
      const newuser = new db.User({
        acno,
        username: uname,
        password: pasw,
        balance: 0,
        transaction: []
      })

      //save in db
      newuser.save()

      return {
        status: true,
        message: 'register success',
        statusCode: 200
      }
    }
  })

}


login = (acno, pasw) => {

  // if (acno in userDetails) {
  return db.User.findOne({ acno, password: pasw }).then(user => {
    if (user) {

      currentUser = user.username

      currentAcno = acno

      const token = jwt.sign({ currentAcno }, "supersecretkey123")



      return {
        status: true,
        message: 'login success',
        statusCode: 200,
        currentUser,
        currentAcno,
        token

      }

    }
    else {
      return {
        status: false,
        message: 'incurrect account number or password',
        statusCode: 401
      }
    }
  })



}


deposite = (acnum, password, amount) => {

  var amnt = parseInt(amount)

  return db.User.findOne({ acno: acnum, password, }).then(user => {
    if (user) {

      user.balance += amnt
      user.transaction.push({ Type: "CREDIT", amount: amnt })

      user.save()

      return {
        status: true,
        message: `${amnt} is credited to your ac and balance is ${user.balance}`,
        statusCode: 200
      }

    }
    else {
      return {
        status: false,
        message: 'incurrect account number or password',
        statusCode: 401
      }
    }
  })


}


withdraw = (acnum, password, amount) => {

  var amnt = parseInt(amount)


  return db.User.findOne({ acno: acnum, password }).then(user => {
    if (user) {
      if (amnt <= user.balance) {

        user.balance -= amnt


        user.transaction.push({ Type: "DEBIT", amount: amnt })

        user.save()



        return {
          status: true,
          message: `${amnt} is debited from your ac and balance is ${user.balance}`,
          statusCode: 200
        }

      }
      else {
        return {
          status: false,
          message: 'insufficient balance',
          statusCode: 401
        }
      }
    }
    else {

      return {
        status: false,
        message: 'incurrect account number or password ',
        statusCode: 401
      }
    }

  })


}

getTransaction = (acno) => {

  return db.User.findOne({acno}).then(user=>{

    if(user){
    return {
      status: true,
      statusCode: 200,
      transaction: user.transaction
    }
  }
  })

  



}

deleteAcc = (acno)=>{
  return db.User.deleteOne({acno}).then(user=>{
    if(user){
      return{
        status: true,
        statusCode: 200,
        message:'account deleted'
      }
    }
    else{
      return{
        status:false,
        statusCode:401,
        message:'user not exist'
      }
    }
  })
}

module.exports = {
  register, login, deposite, withdraw, getTransaction ,deleteAcc
}