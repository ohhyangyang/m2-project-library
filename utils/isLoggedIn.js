function isLoggedIn (req, res, next) {
    // If the request came with an authenticated cookie
    if (req.session.currentUser) {
      console.log('GOOD TO GO');
      next();
    }
    else {
      res.redirect('/auth/login')
    }
  }
  module.exports = isLoggedIn;
  