const React = require("react");
const Layout = require("./Layout");

function Signup(props) {
  return (
    <Layout title="Signup">
      <form action="/auth/signup" method="POST">
        <label>Username:</label>
        <input type="text" name="username" />
        <br />
        <label>Email:</label>
        <input type="text" name="email" />
        <br />
        <label>Password:</label>
        <input type="text" name="password" />
        <br />
        <label>Repeat password:</label>
        <input type="text" name="repeatPassword" />

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
