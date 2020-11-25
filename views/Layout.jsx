const React = require("react");
const isLoggedIn = require("../utils/isLoggedIn");

function Layout(props) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title> {props.title ? props.title : "My App"} </title>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css"
          integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2"
          crossOrigin="anonymous"
        ></link>
        <link rel="stylesheet" href="/stylesheets/style.css" />
      </head>

      <body>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="#">
            <img src="" />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <a className="nav-link" href="/books/library">
                Library
              </a>
              <a className="nav-link" href={props.isLoggedIn ? `/private/profile/${props.username}` : "/auth/signup"}>
                {props.isLoggedIn ? "Profile" : "Signup"}
                {console.log("isLoggedIn",props.isLoggedIn)}
                {/* <span className="sr-only">(current)</span>   active to make <a> link bolder*/}
              </a>
              <a className="nav-link" href={props.isLoggedIn ? "/auth/logout" : "/auth/login"}>
                {props.isLoggedIn ? "Logout" : "Login"}
              </a>

              <a className="nav-link" href="/about">
                About
              </a>
            </div>
          </div>
        </nav>
        {props.children}

        <footer>
          <div className="footer-wrapper">
            <img src="" />
            <a>About</a>
          </div>
        </footer>
        <script
          src="https://code.jquery.com/jquery-3.5.1.slim.min.js"
          integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj"
          crossOrigin="anonymous"
        ></script>
        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-ho+j7jyWK8fNQe+A12Hb8AhRq26LrZ/JpcUGGOn+Y7RsweNrtN/tE3MoK7ZeZDyx"
          crossOrigin="anonymous"
        ></script>
      </body>
    </html>
  );
}

module.exports = Layout;
