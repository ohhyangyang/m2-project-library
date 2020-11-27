const React = require("react");
const Layout = require("./Layout");

function AddBook(props) {
  return (
    <Layout title="Add Book" isLoggedIn={props.userIsLoggedIn} username={props.username}>
      
      <form id="add-book-form" action="/books/add" method="POST" encType="multipart/form-data">
      <h2>Add a book</h2>
        <div class="form-group">
          <label for="exampleInputEmail1">Title</label>
          <input
            type="text"
            name="title"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
        </div>
        <div class="form-group">
          <label for="exampleInputEmail1">Author</label>
          <input
            type="text"
            name="author"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
        </div>
        <div class="form-group">
          <label for="exampleInputEmail1">Rating (1~5)</label>
          <input
            type="number"
            name="rating"
            max="5"
            min="0"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
        </div>
        <label  for="exampleInputEmail1">Category</label>
        <select name="category" class="custom-select">
          <option selected>Open to select category</option>
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
        <label className="different-label">Choose book cover</label>
        <div class="custom-file">
          <input
            type="file"
            name="bookcoverimage"
            class="custom-file-input"
            id="customFile"
          />
          <label class="custom-file-label" for="customFile">
            Choose file
          </label>
        </div>
        <label className="different-label">Gift</label>
        <div class="custom-control custom-radio">
          <input
            type="radio"
            id="yes"
            name="gift"
            value="yes"
            class="custom-control-input"
          />
          <label class="custom-control-label" for="yes">
            Yes
          </label>
        </div>
        <div class="custom-control custom-radio">
          <input
            type="radio"
            id="no"
            name="gift"
            value="no"
            class="custom-control-input"
          />
          <label class="custom-control-label" for="no">
            No
          </label>
        </div>

        <button type="submit" class="btn btn-primary">
          ADD BOOK
        </button>
        {props.errorMessage ? <div>{props.errorMessage}</div> : null}
        </form>
        
    </Layout>
  );
}

module.exports = AddBook;
