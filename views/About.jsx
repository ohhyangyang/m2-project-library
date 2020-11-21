const React = require("react");
const Layout = require("./Layout");

function About (props){
    return(<Layout title="About" isLoggedIn = {props.userIsLoggedIn}>
        <h2>About</h2>
    </Layout>)

}

module.exports = About; 