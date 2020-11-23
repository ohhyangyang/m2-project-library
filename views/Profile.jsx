const React = require("react");
const Layout = require("./Layout");

function Profile (props) {
    return (<Layout title="Profile">
        <h1>Hi, username</h1>
        <div id="profileSection">
            <img id="profilePicture" src="/images/default_user_image.png"></img>
            <p>number</p>
            <p>number</p>
            <p>likes</p>
        </div>
        <div id="profileInfo">
            <p>username</p>
            <p>description</p>
        </div>
        <div id="confirmationSection"> 
        <div id="messagesUnseen">
        <p>The following books have been approved for borrowing</p>
            {props.messagesUnseen?
            (props.messagesUnseen.map((message,i) => {
            return (<li key={i}>
                
            {message.content}
            <a href={`/private/profile/message/${message._id}/${i}`}>I got it</a>
            </li>
            );
        }))
        :null}
        </div>
        </div>

        <div id="alert"><p>User wants to borrow this book</p><p>Do you want to lend this book?</p>
        </div>
        <div id="requestSection">
        
        <div>{props.booksOwnedbyTheUser? (props.booksOwnedbyTheUser.map((book,i) => {
            return (<li key={i}>
                <img 
                src={book.imageURL}
                className="image-cover"
                />
            {book.title} {book.author}
        <label>Do I want to lend this book:</label>
        <form action={`/private/profile/${props.session.username}/${book._id}`} method="POST">
        <input type="radio" id="yes" name="statusBorrowed" value="yes" />
        <label for="yes">Yes</label>
        <input type="radio" id="no" name="statusBorrowed" value="no" />
        <label for="no">No</label>
        <button className="account-button" type="submit">Submit</button>
        </form>
            </li>
            );
        }))
        :null}</div>
        <div id="userLibrary">
        <p>Your library</p>
        {props.userLibrary.map((book,i) => {
            return (<li key={i}>
                <img 
                src={book.imageURL}
                className="image-cover"
                />
            {book.title} {book.author}
            </li>
            );
        })}
        </div>
  
        </div>

    </Layout>)
}

module.exports = Profile; 
