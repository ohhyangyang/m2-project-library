const React = require("react");
const { update } = require("../models/Book.model");
const Layout = require("./Layout");

function UpdateProfile(props) {
    return(<Layout title="Update Profile" isLoggedIn = {props.userIsLoggedIn}>
        <form action="/private/edit-profile" method="POST" encType="multipart/form-data">
        <label>Username:</label>
        <input type="text" name="username" defaultValue={props.foundUser.username} />
        <br />
        <label>Description:</label>
        <input type="text" name="description" defaultValue={props.foundUser.description} />
        <br />
        <label>Image:</label>
        <input type="file" name="userimage"/>
        <br />
        <button className="account-button" type="submit">
          UPDATE PROFILE
        </button>
        {props.errorMessage ? <div>{props.errorMessage}</div> : null}
      </form>
    </Layout>)
}

module.exports = UpdateProfile