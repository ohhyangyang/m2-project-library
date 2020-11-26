const React = require("react");
const Layout = require("./Layout");
const Card = require("./components/Card");

function Home(props) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title> {props.title ? props.title : "X-Book"} </title>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css"
          integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2"
          crossOrigin="anonymous"
        ></link>
        <link rel="stylesheet" href="/stylesheets/style.css" />
      </head>
      <body id="splashscreen-background">

        <img id="xbook-logo" src="/images/XBook-logo-complete.svg" />
        <p>Exchange your books with other readers</p>

        <div id="splashscreen-container">
        <img
          id="splashimage"
          src="https://res.cloudinary.com/daj2fsogl/image/upload/v1606380574/book-x-images/book_splash_screen_ifyezq.gif"
        />

          <div>
            <a class="btn" href="/auth/login" role="button">
              LOG IN
            </a>
          </div>
          <div>
            <a class="btn" href="/auth/signup" role="button">
              SIGN UP
            </a>
          </div>
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
