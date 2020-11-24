const { PromiseProvider } = require("mongoose");
const React = require("react");
const Layout = require("./Layout");

function Profile(props) {
  return (
    <Layout title="Profile" isLoggedIn={props.userIsLoggedIn} username={props.username} >
      <div id="profileSection">
  
        <img id="profilepicture" src={props.visitedUser.imageURL?(props.visitedUser.imageURL):(props.session.imageURL)}/>
        <h3>{props.visitedUser.username?(props.visitedUser.username):(props.session.username)}</h3>
        <p>
          {props.userLibrary.length <= 1
            ? `${props.userLibrary.length} book`
            : `${props.userLibrary.length} books`}
        </p>
        <p>
        {props.borrowedLibrary.length <= 1
            ? `${props.borrowedLibrary.length} borrowed book`
            : `${props.borrowedLibrary.length} borrowed books`}  
        </p>
        <p>{props.visitedUser.username?(props.visitedUser.username):(props.session.username)}</p>
        <p>{props.visitedUser.description ? props.visitedUser.description : props.session.description}</p>
        
        <a href="/private/edit-profile">{(!props.visitedUser.imageURL)?"EDIT PROFILE":null}</a>
        <br />
        <a href="/books/add">{(!props.visitedUser.imageURL)?"ADD BOOK":null}</a>
      </div>
       
        <div id="approvedBookRequests">
          <p>{props.messagesUnseen && props.messagesUnseen.length >= 1 ? "The following books have been approved for borrowing" : null}</p>
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

      <div id="booksRequestedFromUsers">
      <p>{props.booksOwnedbyTheUser && props.booksOwnedbyTheUser.length >= 1 ? "Do you want to lend this book?" : null}</p>
        <div>
          {props.booksOwnedbyTheUser
            ? props.booksOwnedbyTheUser.map((book, i) => {
                return (
                  <p key={i}>
                    <img src={book.imageURL} className="image-cover" />
                    {book.title} {book.author}
                    <label>Do I want to lend this book:</label>
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
                      <label for="yes">Yes</label>
                      <input
                        type="radio"
                        id="no"
                        name="statusBorrowed"
                        value="no"
                      />
                      <label for="no">No</label>
                      <button className="account-button" type="submit">
                        Submit
                      </button>
                    </form>
                  </p>
                );
              })
            : null}
        </div>


        <div id="userLibrary">
          <p>{props.userLibrary ? "Your library" : null}</p>
          {props.userLibrary.map((book, i) => {
            return (
              <p key={i}>
                <img src={book.imageURL} className="image-cover" />
                <p>{book.title}</p>
                <p>{book.author}</p>
                <a href={`/books/delete/${book._id}`}>DELETE BOOK</a>
              </p>
              
            );
          })}
        </div>

        

        <div id="borrowedBooks">
          <p>{props.borrowedLibrary.length > 1 ? "Your borrowed library" : null}</p>
          {props.borrowedLibrary.map((book, i) => {
            return (
              <p key={i}>
                <img src={book.imageURL} className="image-cover" />
                {book.title} {book.author}
              </p>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}

module.exports = Profile;


