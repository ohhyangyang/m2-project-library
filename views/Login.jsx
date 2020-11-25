const React = require("react");
const Layout = require("./Layout");

function Login(props) {
  return (
    <Layout title="Login" isLoggedIn = {props.userIsLoggedIn}>
      <form action="/auth/login" method="POST" id="login-form">
      <h2>HELLO AGAIN!</h2>
      <p className="book">📚 </p>
  <div class="form-group">
    <label for="exampleInputEmail1">Username</label>
    <input type="text" name="username" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1">Password</label>
    <input type="password" name="password" class="form-control" id="exampleInputPassword1" />
  </div>
  {props.errorMessage ? <div className="error-message">{props.errorMessage}</div> : null}
  <button type="submit" class="btn btn-primary">LOG IN</button>
  

  <p className="signup-here">NEW AROUND HERE? <a href="/auth/signup">SIGN UP</a></p>
  
</form>  

</Layout>
  );
}

module.exports = Login;
