const React = require("react");
const Layout = require("./Layout");
const Card = require("./components/Card");

function Home(props) {
  return (
    <Layout title="Home Page" isLoggedIn = {props.userIsLoggedIn} 
    user = {props.session.username}>
    {/* {console.log("Home Boolean",props.userIsLoggedIn)} */}
      <div id="header-section"><h1>Books</h1>
      <p>Discover books</p>
      </div>

      {/*<Card
        text="smaller component example"
        image="https://i.imgur.com/OH7dtc0.png"
      />
      <Card
        text="second example of component use"
        image="https://i.imgur.com/dHdzhWn.png"
      />*/}
      
    </Layout>
  );
}

module.exports = Home;
