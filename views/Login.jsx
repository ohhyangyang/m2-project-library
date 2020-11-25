const React = require("react");
const Layout = require("./Layout");

function Login(props) {
  return (
    <Layout title="Login" isLoggedIn = {props.userIsLoggedIn}>
      <form action="/auth/login" method="POST">
  <div class="form-group">
    <label for="exampleInputEmail1">Username</label>
    <input type="text" name="username" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1">Password</label>
    <input type="password" name="password" class="form-control" id="exampleInputPassword1" />
  </div>
  
  <button type="submit" class="btn btn-primary">LOG IN</button>
  {props.errorMessage ? <div>{props.errorMessage}</div> : null}
</form>  
<p>Don't have an account?<a href="/auth/signup">Sign up</a></p>
</Layout>
  );
}

module.exports = Login;
