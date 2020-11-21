const React = require("react");
const Layout = require("./Layout");

function Library (props){
    return(<Layout title="Library">
        <h2>Library</h2>
        <p>Check out different categories</p>
        <div class="horizontal-scroll">
        <ul class="hs">
            <li class="item">
                <div id="firstCard"><h5 class="card-title">Fiction</h5><p>Lorem ipsum dolor sit amet, consectetur 
                adipisici elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim 
                ad minim veniam, quis nostrud exercitation </p></div>
            </li>
            <li class="item start">
            <div id="secondCard"><h5 class="card-title">Drama</h5><p>Lorem ipsum dolor sit amet, consectetur 
                adipisici elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim 
                ad minim veniam, quis nostrud exercitation </p></div>
            </li>
            <li class="item">
            <div id="secondCard"><h5 class="card-title">Comics</h5><p>Lorem ipsum dolor sit amet, consectetur 
                adipisici elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim 
                ad minim veniam, quis nostrud exercitation </p></div>
            </li>
            <li class="item last">
            <div id="thirdCard"><h5 class="card-title">Science Fiction</h5><p>Lorem ipsum dolor sit amet, consectetur 
                adipisici elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim 
                ad minim veniam, quis nostrud exercitation </p></div>
            </li>
          <li class="item last">
          <div id="fourthCard"><h5 class="card-title">Science Fiction</h5><p>Lorem ipsum dolor sit amet, consectetur 
                adipisici elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim 
                ad minim veniam, quis nostrud exercitation </p></div>
            </li>
          <li class="item last">
          <div id="fifthCard"><h5 class="card-title">Others</h5><p>Lorem ipsum dolor sit amet, consectetur 
                adipisici elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim 
                ad minim veniam, quis nostrud exercitation </p></div>
            </li>
        </ul>

        <div> {props.books.map((Book) => {
            return (
            <p className="book-title">
                <a 
                href={`/books/edit?bookid=${Book._id}`}
                className="edit-button"
                >
                </a>
                <a href={`/books/details/${Book._id}`} > {Book.title}</a>
            </p>
            );
        })}</div>
    </div>
    </Layout>)

}

module.exports = Library; 

