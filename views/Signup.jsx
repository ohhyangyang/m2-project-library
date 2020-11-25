const React = require("react");
const Layout = require("./Layout");

function Signup(props) {
  return (
    <Layout title="Signup" isLoggedIn = {props.userIsLoggedIn}>
    <form action="/auth/signup" method="POST" id="signup-form">
    <h2>SIGN UP HERE</h2>
  <div class="form-group">
    <label for="exampleInputEmail1">Username</label>
    <input type="text" name="username" class="form-control" id="exampleInputusername" aria-describedby="emailHelp"/>
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1">Email</label>
    <input type="text" name="email" class="form-control" id="exampleInputemail" />
  </div>
  <div class="form-group">
    <label for="exampleInputEmail1">Password</label>
    <input type="password" name="password" class="form-control" id="exampleInputusername" aria-describedby="emailHelp"/>
    <small id="passwordHelpBlock" class="form-text text-muted">
  Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji.
</small>
  </div>
  <div class="form-group">
    <label for="exampleInputEmail1">Repeat Password</label>
    <input type="password" name="repeatPassword" class="form-control" id="exampleInputusername" aria-describedby="emailHelp"/>
  </div>

  {props.errorMessage ? <div className="error-message">{props.errorMessage}</div> : null}
  <button type="submit" class="btn btn-primary">SIGN UP</button>

  
</form>  
      
    </Layout>
  );
}

module.exports = Signup;
