var express = require('express');
var router = express.Router();
const emailval='suhailwt12@gmail.com'
const pass='12345'
router.use((req, res, next) => {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.header('Expires', '-1');
  res.header('Pragma', 'no-cache');
  next();
});
/* GET home page. */
router.get('/', (req, res) => {
  const data = req.session.authenticated
    ? { authenticated: true }
    : { authenticated: false };
 res.render('index', data);
 console.log(data)
});


router.post('/', (req, res) => {
  let {email,password} = req.body; 
  if(email==emailval&&password==pass){
    req.session.authenticated = true;
    req.session.save(() => {
      const data = req.session.authenticated
        ? { authenticated: true }
        : { authenticated: false };
      res.render('index', data);
      console.log(data);
    });
  }
else{
  if(email!=emailval&&password!=pass){
    res.render('login', { errorMessage: 'please check your email and password.' });
  }
  else if(email!=emailval){
    res.render('login', { errorMessage: 'Incorrect email. Please try again.' });
  }
  else if(password!=pass){
    res.render('login', { errorMessage: 'Incorrect password. Please try again.' });
  }
}
});
router.get('/login', (req, res) => {
  if(req.session.authenticated){

        res.redirect('/')
  }else{
  res.render('login');
  }
});
router.get('/logout', (req, res) => {
  req.session.authenticated = false;
  req.session.save(() => {
    res.redirect('/')
  });
});

module.exports = router;
