const React = require("react");
const Layout = require("./Layout");

function Profile (props) {
    return (<Layout title="Profile">
        <h1>Hi, username</h1>
        <div id="profileSection">
            <img id="profilePicture" src="/images/profile_avatar.png"></img>
            <p>number</p>
            <p>number</p>
            <p>likes</p>
        </div>
        <div id="profileInfo">
            <p>username</p>
            <p>description</p>
        </div>
        {}
        <div id="alert"><p>User wants to borrow this book</p><p>Do you want to lend this book?</p>
        </div>
        <div id="booksSection">
        <div>{props.booksOwnedbyTheUser.map((book,i) => {
            return (<li key={i}>
                <img 
                src={book.imageURL}
                className="image-cover"
                />
            {book.title} {book.author}
            </li>
            );
        })}</div>
        </div>
    </Layout>)
}

module.exports = Profile; 
