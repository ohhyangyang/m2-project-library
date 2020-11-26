const React = require("react");
const Layout = require("./Layout");

function Library(props) {
  return (
    <Layout
      title="Library"
      isLoggedIn={props.userIsLoggedIn}
      username={props.username}
    >
      <div id="library-bg-wrapper">
        <div id="title-wrapper">
          {/* <h2>Library</h2> */}
          {/* <p>BROWSE AND BORROW BOOKS IN THIS LIBRARY</p> */}
        </div>

        <div id="horizontal-scroll">
          <ul class="hs">
            <li class="item">
              <div id="firstCard">
                <a href="/books/library" class="card-title">
                  All
                </a>
              </div>
            </li>
            <li class="item start">
              <div id="secondCard">
                <a href="/books/library/category/Fantasy" class="card-title">
                  Fantasy
                </a>
              </div>
            </li>
            <li class="item">
              <div id="secondCard">
                <a href="/books/library/category/Adventure" class="card-title">
                  Adventure
                </a>
              </div>
            </li>
            <li class="item last">
              <div id="thirdCard">
                <a href="/books/library/category/Romance" class="card-title">
                  Romance
                </a>
              </div>
            </li>
            <li class="item last">
              <div id="fourthCard">
                <a
                  href="/books/library/category/Contemporary"
                  class="card-title"
                >
                  Contemporary
                </a>
              </div>
            </li>
            <li class="item last">
              <div id="fifthCard">
                <a href="/books/library/category/Mystery" class="card-title">
                  Mystery
                </a>
              </div>
            </li>
            <li class="item">
              <div id="firstCard">
                <a href="/books/library/category/Horror" class="card-title">
                  Horror
                </a>
              </div>
            </li>
            <li class="item">
              <div>
                <a href="/books/library/category/Thriller" class="card-title">
                  Thriller
                </a>
              </div>
            </li>
            <li class="item">
              <div>
                <a href="/books/library/category/Paranormal" class="card-title">
                  Paranormal
                </a>
              </div>
            </li>
            <li class="item">
              <div>
                <a href="/books/library/category/Fiction" class="card-title">
                  Fiction
                </a>
              </div>
            </li>
            <li class="item">
              <div>
                <a
                  href="/books/library/category/Science Fiction"
                  class="card-title"
                >
                  ScienceFiction
                </a>
              </div>
            </li>
            <li class="item">
              <div>
                <a href="/books/library/category/Memoir" class="card-title">
                  Memoir
                </a>
              </div>
            </li>
            <li class="item">
              <div>
                <a href="/books/library/category/Cooking" class="card-title">
                  Cooking
                </a>
              </div>
            </li>
            <li class="item">
              <div>
                <a href="/books/library/category/Art" class="card-title">
                  Art
                </a>
              </div>
            </li>
            <li class="item">
              <div>
                <a href="/books/library/category/Personal" class="card-title">
                  Personal
                </a>
              </div>
            </li>
            <li class="item">
              <div>
                <a
                  href="/books/library/category/Development"
                  class="card-title"
                >
                  Development
                </a>
              </div>
            </li>
            <li class="item">
              <div>
                <a
                  href="/books/library/category/Motivational"
                  class="card-title"
                >
                  Motivational
                </a>
              </div>
            </li>
            <li class="item">
              <div>
                <a href="/books/library/category/Health" class="card-title">
                  Health
                </a>
              </div>
            </li>
            <li class="item">
              <div>
                <a href="/books/library/category/History" class="card-title">
                  History
                </a>
              </div>
            </li>
            <li class="item">
              <div>
                <a href="/books/library/category/Travel" class="card-title">
                  Travel
                </a>
              </div>
            </li>
            <li class="item">
              <div>
                <a href="/books/library/category/Guide" class="card-title">
                  Guide
                </a>
              </div>
            </li>
            <li class="item">
              <div>
                <a
                  href="/books/library/category/Relationships"
                  class="card-title"
                >
                  Relationships
                </a>
              </div>
            </li>
            <li class="item">
              <div>
                <a href="/books/library/category/Humor" class="card-title">
                  Humor
                </a>
              </div>
            </li>
            <li class="item">
              <div>
                <a href="/books/library/category/Children" class="card-title">
                  Children
                </a>
              </div>
            </li>
            <li class="item">
              <div>
                <a href="/books/library/category/Comic" class="card-title">
                  Comic
                </a>
              </div>
            </li>
            <li class="item">
              <div>
                <a href="/books/library/category/Other" class="card-title">
                  Other
                </a>
              </div>
            </li>
          </ul>
        </div>
        <div id="library-books">
          {props.categoryBooks
            ? props.categoryBooks.map((Book) => {
                return (
                  <div className="book">
                  {console.log("Book",Book)}
                    <img src={Book.imageURL} className="image-cover" />
                    <div className="title-author-rating-wrapper">
                    <p className="book-title">{Book.title}</p>
                    <div className="author-rating-wrapper">
                    <p className="book-author"> {Book.author}</p>
                    <p className="book-rating">{`${Book.rating}/5`}</p>
                    </div>
                    </div>

                    <a className="book-visit" href={`/private/profile/${Book.owner.username}`}>
                      {`Visit ${Book.owner.username}'s profile`}
                    </a>
                    <a className="book-borrow" href={`/books/library/${Book._id}`}>
                      BORROW
                    </a>
                    
                  </div>
                );
              })
            : props.userLibrary.map((Book) => {
                return (
                  <div className="book">
                  
                    <img src={Book.imageURL} className="image-cover" />
                    <div className="title-author-rating-wrapper">
                    <p className="book-title">{Book.title}</p>
                    <div className="author-rating-wrapper">
                    <p className="book-author"> {Book.author}</p>
                    <p className="book-rating">{`${Book.rating}/5`}</p>
                    </div>
                    </div>
                    <a className="book-visit" href={`/private/profile/${Book.owner.username}`}>
                      {`Visit ${Book.owner.username}'s profile`}
                    </a>
                    <a
                      className="book-borrow"
                      href={
                        Book.status == "available"
                          ? `/books/library/${Book._id}`
                          : "javascript:;"
                      }
                    >
                      {Book.status == "available" ? "BORROW" : "TAKEN"}
                    </a>
                    
                  </div>
                );
              })}
        </div>
      </div>
    </Layout>
  );
}

module.exports = Library;
