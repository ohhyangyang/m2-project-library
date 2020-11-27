const React = require("react");
const Layout = require("./Layout");

function About(props) {
  return (
    <Layout title="About" isLoggedIn={props.userIsLoggedIn}>
      <div id="about-wrapper">
        <h2>About Us</h2>
        <div id="about-logos">
          <img src="/images/users.svg" />
          <img src="/images/exchange.svg" />
          <img src="/images/books.svg" />
        </div>

        <p>
          <strong>X-Book</strong> is an exchange platform for books. Once you sign up, it enables
          you to upload your library of books, make them accessible for other
          users to borrow or lend then.
        </p>
        <p>
          Our faith is to build up a platform based on trust and goodwill, at
          the profile page will show all the history of every user. Any user can
          complain or report other bad-behaved users, our X-Book team will
          consider to warn or block them if it’s necessary.
        </p>
      </div>
    </Layout>
  );
}

module.exports = About;
