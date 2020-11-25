const React = require("react");
const { update } = require("../models/Book.model");
const Layout = require("./Layout");

function UpdateProfile(props) {
    return(<Layout title="Update Profile" isLoggedIn = {props.userIsLoggedIn}>
        <form action="/private/edit-profile" method="POST" encType="multipart/form-data">
        <div class="form-group">
        <label for="exampleInputEmail1">Username</label>
        <input type="text" name="username" defaultValue={props.foundUser.username} class="form-control" id="exampleInputusername" aria-describedby="emailHelp"/>
        </div>

        <div class="form-group">
        <label for="exampleInputEmail1">Description</label>
        <input type="text" name="description" defaultValue={props.foundUser.description} class="form-control" id="exampleInputusername" aria-describedby="emailHelp"/>
        </div>

        <label>Image</label>
        <div class="custom-file">
          <input
            type="file"
            name="userimage"
            class="custom-file-input"
            id="customFile"
          />
          <label class="custom-file-label" for="customFile">
            Choose file
          </label>
          </div>

          <button type="submit" class="btn btn-primary">UPDATE PROFILE</button>
          {props.errorMessage ? <div>{props.errorMessage}</div> : null}
          </form>
        
        
    </Layout>)
}

module.exports = UpdateProfile