const React = require("react");
const Layout = require("./Layout");

function Login(props) {
  return (
    <Layout title="Login" isLoggedIn = {props.userIsLoggedIn}>
      <form action="/auth/login" method="POST">
        <label>Username:</label>
        <input type="text" name="username" placeholder="username" />
        <br />
        <label>Password:</label>
        <input type="password" name="password" placeholder="password"/>

        <br />
        <button className="btn" type="submit">
          LOG IN
        </button>
        {props.errorMessage ? <div>{props.errorMessage}</div> : null}
      </form>
      <p>
        Don't have an account?<a href="/auth/signup">Sign up</a>
      </p>
    </Layout>
  );
}

module.exports = Login;
