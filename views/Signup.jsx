const React = require("react");
const Layout = require("./Layout");

function Signup(props) {
  return (
    <Layout title="Signup" isLoggedIn = {props.userIsLoggedIn}>
      <form action="/auth/signup" method="POST">
        <label>Username:</label>
        <input type="text" name="username" />
        <br />
        <label>Email:</label>
        <input type="text" name="email" />
        <br />
        <label>Password:</label>
        <input type="password" name="password" />
        <br />
        <label>Repeat password:</label>
        <input type="password" name="repeatPassword" />
        <br />
        <button className="account-button" type="submit">
          SIGN UP
        </button>
        
        {props.errorMessage ? <div>{props.errorMessage}</div> : null}
      </form>
    </Layout>
  );
}

module.exports = Signup;
