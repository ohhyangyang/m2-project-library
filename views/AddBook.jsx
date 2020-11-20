const React = require("react");
const Layout = require("./Layout");

function AddBook (props){
    return(<Layout>
        <h1>AddBook</h1>
        <form action="/books/add" method="POST">
        <label>Title:</label>
        <input type="text" name="title" />
        <br />
        <label>Author:</label>
        <input type="text" name="author" />
        <br />
        <button className="account-button" type="submit">
          Edit Book
        </button>
        {props.errorMessage ? <div>{props.errorMessage}</div> : null}
      </form>
    </Layout>)
}

module.exports = AddBook; 