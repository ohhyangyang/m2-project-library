const React = require("react");
const Layout = require("./Layout");

function Signup(props) {
  return (
    <Layout title="Signup" isLoggedIn = {props.userIsLoggedIn}>
      <form action="/auth/signup" method="POST">
        <label>Username:</label>
        <input type="text" name="username" placeholder="username" />
        <br />
        <label>Email:</label>
        <input type="text" name="email" placeholder="email" />
        <br />
        <label>Password:</label>
        <input type="password" name="password" placeholder="password"/>
        <br />
        <label>Repeat password:</label>
        <input type="password" name="repeatPassword" placeholder="repeatPassword" />
        <br />
        <button className="btn" type="submit">
          SIGN UP
        </button>
        
        {props.errorMessage ? <div>{props.errorMessage}</div> : null}
      </form>
    </Layout>
  );
}

module.exports = Signup;
