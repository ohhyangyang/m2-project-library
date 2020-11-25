const { PromiseProvider } = require("mongoose");
const React = require("react");
const Layout = require("./Layout");

function Profile(props) {
  return (
    <Layout
      title="Profile"
      isLoggedIn={props.userIsLoggedIn}
      username={props.username}
    >
      <div id="profileSection">
        <div>
          <img
            id="profilepicture"
            src={
              props.visitedUser.imageURL
                ? props.visitedUser.imageURL
                : props.session.imageURL
            }
          />
          {/*{props.visitedUser.username?(props.visitedUser.username):(props.session.username)}*/}
        </div>
        <div>
          {props.userLibrary.length <= 1
            ? `${props.userLibrary.length} book`
            : `${props.userLibrary.length} books`}
        </div>
        <div>
          {props.borrowedLibrary.length <= 1
            ? `${props.borrowedLibrary.length} borrowed book`
            : `${props.borrowedLibrary.length} borrowed books`}
        </div>
      </div>
      <div id="profileInfo">
        <p>
          {props.visitedUser.username
            ? props.visitedUser.username
            : props.session.username}{" "}
        </p>{" "}
        <p>
          📚📚📚
          {props.visitedUser.description
            ? props.visitedUser.description
            : props.session.description}
        </p>
      </div>
      <div id="profilebuttons">
        <a href="/private/edit-profile" class="btn btn-info">
          {!props.visitedUser.imageURL ? "EDIT PROFILE" : null}
        </a>
        <br />
        <a href="/books/add" class="btn btn-info">
          {!props.visitedUser.imageURL ? "ADD BOOK" : null}
        </a>
      </div>

      <p>
        {props.messagesUnseen && props.messagesUnseen.length >= 1
          ? "The following books have been approved for borrowing"
          : null}
      </p>
      <div className="user-library container">
        {props.messagesUnseen
          ? props.messagesUnseen.map((message, i) => {
              return (
                <li key={i}>
                  {message.content}
                  <a href={`/private/profile/message/${message._id}/${i}`}>
                    I got it
                  </a>
                </li>
              );
            })
          : null}
      </div>

      <p>
        {props.booksOwnedbyTheUser && props.booksOwnedbyTheUser.length >= 1
          ? "Open requests from other users:"
          : null}
      </p>
      <div className="user-library container">
        <div>
          {props.booksOwnedbyTheUser
            ? props.booksOwnedbyTheUser.map((book, i) => {
                return (
                  <div key={i}>
                    <img src={book.imageURL} className="image-cover" />
                    <div>
                      {book.title}
                      <br /> {book.author}
                    </div>
                    <p>Do you want to lend this book?</p>
                    <form
                      action={`/private/profile/${props.session.username}/${book._id}`}
                      method="POST"
                    >
                      <input
                        type="radio"
                        id="yes"
                        name="statusBorrowed"
                        value="yes"
                      />
                      <label for="yes">
                        Yes
                        <input
                          type="radio"
                          id="no"
                          name="statusBorrowed"
                          value="no"
                        />
                      </label>
                      <label for="no">No</label>
                      <br />
                      <button className="btn" type="submit">
                        Submit
                      </button>
                    </form>
                  </div>
                );
              })
            : null}
        </div>
      </div>

      <p>{props.userLibrary ? "Your library" : null}</p>
      <div className="user-library container">
        {props.userLibrary.map((book, i) => {
          return (
            <div key={i}>
              <img src={book.imageURL} className="image-cover" />
              <p>{book.title}</p>
              <p>{book.author}</p>
              <a href={`/books/delete/${book._id}`}>
                <img className="delete-icon" src="/images/recycle-bin.png" />
                DELETE BOOK
              </a>
            </div>
          );
        })}
      </div>

      <p>
          {props.borrowedLibrary.length > 1 ? "Your borrowed library" : null}
        </p>
      <div className="user-library container">
        {props.borrowedLibrary.map((book, i) => {
          return (
            <div key={i}>
              <img src={book.imageURL} className="image-cover" />
              <p>{book.title}</p>
              <p>{book.author}</p>
            </div>
          );
        })}
      </div>
    </Layout>
  );
}

module.exports = Profile;
