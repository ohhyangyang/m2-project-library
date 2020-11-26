const React = require("react");
const { update } = require("../models/Book.model");
const Layout = require("./Layout");

function UpdateProfile(props) {
  return (
    <Layout
      title="Update Profile"
      isLoggedIn={props.userIsLoggedIn}
      username={props.username}
    >
      {console.log("testing", props.userIsLoggedIn)}
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
            className="form-control"
            type="text"
            name="description"
            defaultValue={props.foundUser.description}
          />
        </div>

        <label>Update your photo</label>
        <div className="custom-file">
          <input type="file" 
          class="custom-file-input" 
          name="userimage"
          id="customFile" />
        
        <label className="custom-file-label" for="customFile">
        Choose profile image
        </label>
        </div>
        <button class="btn btn-primary" type="submit">
          SUBMIT
        </button>
        {props.errorMessage ? <div>{props.errorMessage}</div> : null}
      </form>
    </Layout>
  );
}

module.exports = UpdateProfile;
