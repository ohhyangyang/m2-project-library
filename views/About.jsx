const React = require("react");
const Layout = require("./Layout");

function About (props){
    return(<Layout title="About" isLoggedIn = {props.userIsLoggedIn} username={props.username}>
        <h2>About</h2>
        <p>X-Book is an exchange platform for books. Once you sign up, it enables you to upload your library of books, make them accessible for other users to borrow or lend then. Our faith is to build up a platform based on trust and goodwill, at the profile page will show all the history of every user
Any user can complain or report other bad-behaved users, and the platform will consider to warn or block them if it’s necessary.</p>

    </Layout>)

}

module.exports = About; 