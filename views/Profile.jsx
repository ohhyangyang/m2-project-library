const React = require("react");
const Layout = require("./Layout");

function Profile (props) {
    return (<Layout title="Profile" isLoggedIn = {props.userIsLoggedIn}>
        <h1>Hi, username</h1>
        <div id="profileSection">
            <img id="profilePicture" src="/images/profile_avatar.png"></img>
            <p>number</p>
            <p>number</p>
            <p>likes</p>
        </div>
        <div id="profileInfo">
            <p>username</p>
            <p>description</p>
        </div>
        <div id="booksSection">

        </div>
    </Layout>)
}

module.exports = Profile; 
