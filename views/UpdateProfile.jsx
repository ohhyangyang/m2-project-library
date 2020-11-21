const React = require("react");
const { update } = require("../models/Book.model");
const Layout = require("./Layout");

function UpdateProfile(props) {
    return(<Layout title="Update Profile" isLoggedIn = {props.userIsLoggedIn}>
        <form action="/private/edit-profile" method="POST">
        <label>Username:</label>
        <input type="text" name="username" />
        <br />
        <label>Description:</label>
        <input type="text" name="description" />
        <br />
        <label>Password:</label>
        <input type="password" name="password" />
        <br />
        <button className="account-button" type="submit">
          UPDATE PROFILE
        </button>
        {props.errorMessage ? <div>{props.errorMessage}</div> : null}
      </form>
    </Layout>)
}

module.exports = UpdateProfile