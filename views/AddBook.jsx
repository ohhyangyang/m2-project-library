const React = require("react");
const Layout = require("./Layout");

function AddBook (props){
    return(<Layout title="Add Book" isLoggedIn = {props.userIsLoggedIn}>
        <h1>Add a book</h1>
        <form action="/books/add" method="POST">
        <label>Title:</label>
        <input type="text" name="title" />
        <br />
        <label>Author:</label>
        <input type="text" name="author" />
        <br />
        <label>Category:</label>
        <select name="category" id="categories">
        <option value="Fantasy">Fantasy</option>
        <option value="Adventure">Adventure</option>
        <option value="Romance">Romance</option>
        <option value="Contemporary">Contemporary</option>
        <option value="Mystery">Mystery</option>
        <option value="Horror">Horror</option>
        <option value="Thriller">Thriller</option>
        <option value="Paranormal">Paranormal</option>
        <option value="Fiction">Fiction</option>
        <option value="Science Fiction">Science Fiction</option>
        <option value="Memoir">Memoir</option>
        <option value="Cooking">Cooking</option>
        <option value="Art">Art</option>
        <option value="Self-help/Personal">Self-help/Personal</option>
        <option value="Development">Development</option>
        <option value="Motivational">Motivational</option>
        <option value="Health">Health</option>
        <option value="History">History</option>
        <option value="Travel">Travel</option>
        <option value="Guide/How-to">Guide</option>
        <option value="Families/Relationships">Families</option>
        <option value="Humor">Humor</option>
        <option value="Children">Children</option>
        <option value="Comics">Comic</option>
        <option value="Other">Other</option>
        </select>
        <br />
        <label>Gift:</label>
        <input type="radio" id="yes" name="gift" value="yes" />
        <label for="yes">Yes</label>
        <input type="radio" id="no" name="gift" value="no" />
        <label for="no">No</label>
        <br />
        <button className="account-button" type="submit">
          Add Book
        </button>
        {props.errorMessage ? <div>{props.errorMessage}</div> : null}
      </form>
    </Layout>)
}

module.exports = AddBook; 