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
            ? <div><div className="number">{props.userLibrary.length}</div> Book</div>
            : <div><div className="number">{props.userLibrary.length}</div> Books</div>}
        </div>
        <div>
          {props.borrowedLibrary.length <= 1
            ? <div><div className="number" >{props.borrowedLibrary.length} </div> Book borrowed</div>
            : <div><div className="number">{props.borrowedLibrary.length} </div> Books borrowed</div>}
        </div>
      </div>
      <div id="profileInfo">
        <div>
          {props.visitedUser.username
            ? props.visitedUser.username
            : props.session.username}
        </div>
        <div>
          📚📚📚
          {props.visitedUser.description
            ? props.visitedUser.description
            : props.session.description}
        </div>
      </div>
      <div id="profilebuttons-container" class="row">
        <div class="col-xs-6 linkprofile">
          
            {!props.visitedUser.imageURL ? <a href="/private/edit-profile" class="btn btn-info">Edit profile</a> : null}
          
        </div>
        <div class="col-xs-6 linkprofile">
          
            {!props.visitedUser.imageURL ? <a href="/books/add" class="btn btn-info ">Add book</a> : null}
          
        </div>
      </div>
      <div class="headlineprofile">
        {props.messagesUnseen && props.messagesUnseen.length >= 1
          ? "The following books have been approved for borrowing"
          : null}
      </div>
      <div className="user-library container">
        {props.messagesUnseen
          ? props.messagesUnseen.map((message, i) => {
              return (
                <li class="request-info" key={i}>
                  {message.content}
                  <a href={`/private/profile/message/${message._id}/${i}`}>
                    I got it
                  </a>
                </li>
              );
            })
          : null}
      </div>
      <div className="user-library container alert alert-secondary" role="alert">
        <div>
        {/*<div class="headlineprofile">
        {props.booksOwnedbyTheUser && props.booksOwnedbyTheUser.length >= 1
          ? "Open requests from other users"
          : null}
      </div>*/}
          {props.booksOwnedbyTheUser
            ? props.booksOwnedbyTheUser.map((book, i) => {
                return (
                  <div key={i}>
                  <div>Do you want to lend this book?</div>
                  <div class="book-info container">
                  <div class="cover-small"><img src={book.imageURL} className="image-cover-small" /></div>
                  <div>{`"${book.title}"`} <br/>by <strong>{book.author}</strong></div>
                  </div>
                  <div class="container confirmationbox">
                    <form
                      action={`/private/profile/${props.session.username}/${book._id}`}
                      method="POST"
                    ><div>
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
                      </div>
                      <div>
                      <button id="confirmrequest" type="submit">
                        Send
                      </button>
                      </div>
                    </form>
                    </div>
                    </div>
                );
              })
            : null}
        </div>
      </div>
      <div class="headlineprofile">
      {props.userLibrary.length >= 1 ? "Book library" : "You have not added any books. Upload books now"}</div>
      <div className="user-library container">
        {props.userLibrary.map((book, i) => {
          return (
            <div key={i}>
            <div class="book-info container">
            <div class="cover-small"><img src={book.imageURL} className="image-cover-small" /></div>
            <div>{`"${book.title}"`} <br/>by <strong>{book.author}</strong>,{book.category},Rating:{book.rating}</div>
            </div>
              <div class="container delete-book"> 
              <a href={`/books/delete/${book._id}`}>
                <img className="delete-icon" src="/images/recycle-bin.png" />
                Remove book
              </a>             
              </div>
              <hr></hr>
            </div>
          );
        })}
      </div>
      <div class="headlineprofile">
        {props.borrowedLibrary.length >=1 ? "Your borrowed books" : null}
      </div>
  
      <div className="user-library container">
        {props.borrowedLibrary.map((book, i) => {
          return (
            <div key={i}>
            <div class="book-info container">
                  <div class="cover-small"><img src={book.imageURL} className="image-cover-small" /></div>
                  <div>{`"${book.title}"`} <br/>by <strong>{book.author}</strong></div>
            </div>
              <hr></hr>
            </div>
          );
        })}
      </div>
    </Layout>
  );
}
module.exports = Profile;