const React = require("react");
const Layout = require("./Layout");

function UpdateBook (props){
    return(<Layout title="Update the Book">
        <h1>Update Book</h1>
        <form action="/books/edit" method="POST">
        <label>Title:</label>
        <input type="text" name="title" />
        <br />
        <label>Author:</label>
        <input type="text" name="author" />
        <br />
        <button className="account-button" type="submit">
          UPDATE BOOK
        </button>
        {props.errorMessage ? <div>{props.errorMessage}</div> : null}
      </form>
    </Layout>)

}

module.exports = UpdateBook; 