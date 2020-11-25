const React = require("react");
const Layout = require("./Layout");
const Card = require("./components/Card");

function Home(props) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
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
    <div id="splashscreen">
      <h1>X Book</h1>
      <p>Exchange, borrow and read</p>
      <img src= "https://res.cloudinary.com/daj2fsogl/image/upload/v1606229899/book-x-images/book_splash_nbjabk.gif" />
      <br />
      <br />
      <a class="btn btn-info" href="/auth/login" role="button">LOG IN</a>

<br />
<a class="btn btn-info" href="/auth/signup" role="button">SIGN UP</a>
    </div>
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

module.exports = Home;
