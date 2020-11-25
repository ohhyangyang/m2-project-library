const React = require("react");
const { update } = require("../models/Book.model");
const Layout = require("./Layout");

function UpdateProfile(props) {
  return (
    <Layout title="Update Profile" isLoggedIn={props.userIsLoggedIn}>
      <form
        action="/private/edit-profile"
        method="POST"
        encType="multipart/form-data"
        id="update-profile-form"
      >
      <h2>UPDATE PROFILE</h2>
        <div class="form-group">
          <label>Username:</label>
          <input
            class="form-control"
            type="text"
            name="username"
            defaultValue={props.foundUser.username}
          />
        </div>

        <div class="form-group">
          <label>Description:</label>
          <input
            class="form-control"
            type="text"
            name="description"
            defaultValue={props.foundUser.description}
          />
        </div>

        <label>Update your photo</label>
        <div class="custom-file">
          
          <label class="custom-file-label">Choose file...</label>
          <input type="file" class="custom-file-input" name="userimage" />
        </div>

        <button  class="btn btn-primary" type="submit">
          SUBMIT
        </button>
        {props.errorMessage ? <div>{props.errorMessage}</div> : null}
      </form>
    </Layout>
  );
}

module.exports = UpdateProfile;
