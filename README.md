# XBook - M2 Project - Yang & Juliane

![](https://images.unsplash.com/photo-1549675584-91f19337af3d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2252&q=80)

## Description

Bookexchange: a platform that enables users to upload their books and borrow them from other users. 

## User Stories

404 - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault

500 - As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault

homepage - shows the user different books based on criterias (such as location) and different users (users that offer the most books); show some numbers as in amont of users already signed up and number of books available, how many books have been exchanged already 

signup - the page where the user can sign up to the book exchange platform 

login - the page where the user can log in to his/her profile

profile page - shows the profile (username, photo) of the user with the books he/she is offering and the exchanged books + log out function 

books - shows the "library" with the books (information displayed, reviews & co.) offered and already exchanged, filter options (categories), you can borrow the books there 

users - shows users with the amount of books offered and borrowed 

add books - user can add additional books 

edit & delele book

edit user - user can change his/her profile and upload/remove/change books

## Server Routes (Back-end)

| Method   | Route                                               | Description                                                  | Request-Body                                |
| -------- | --------------------------------------------------- | ------------------------------------------------------------ | ------------------------------------------- |
| `GET`    | `/`                                                 | Main page route. Renders the `Home` page                     |                                             |
| `GET`    | `/about`                                            | Renders the `About` page                                     |                                             |
| `GET`    | `/error`                                            | Renders the `Error` page                                     |                                             |
| `GET`    | `/auth/login`                                       | Renders the `Login` page                                     |                                             |
| `POST`   | `/auth/login`                                       | Sends the login form information to the server               | users:{username, password}                  |
| `GET`    | `/auth/signup`                                      | Renders the `Signup` page                                    |                                             |
| `POST`   | `/auth/signup`                                      | Sends the signup form information to the server              | users:{username, password, email}           |
| `GET`    | `/auth/logout`                                      | Logges user out and redirect to the `Home` page              |                                             |
| `GET`    | `/books/library`                                    | Renders the `library` page                                   |                                             |
| `GET`    | `/books/library/category/:category`                 | Gets the category params and renders the `library` page      |                                             |
| `GET`    | `/books/library/:bookId`                            | Gets the the borrowed book id and rerenders the `library` page |                                             |
| `POST`   | `/books/add`                                        | Renders `UpdateBook` page                                    | books:{ title, rating, author, imageURL}    |
| `DELETE` | `/books/delete`                                     | EDIT & DELETE BOOK?                                          |                                             |
| `GET`    | `/private/profile/:username`                        | Renders user's `Profile` page                                |                                             |
| `GET`    | `/private/profile/:username/:bookid`                | Confirm the borrow request from the borrower                 |                                             |
| `GET`    | `/private/profile/message/:messageid/:messageindex` | Confirm the response from the owner                          |                                             |
| `GET`    | `/private/edit-profile`                             | Renders the `UpdateProfile` page                             |                                             |
| `POST`   | `/private/edit-profile`                             | Sends the updated user info to the server                    | users:{username, password, email, imageURL} |
|          |                                                     |                                                              |                                             |



## Model

### User model 

```js
{
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true},
    password:{type: String, required:true},
    imageURL:{type: String, default:"/images/default_user_image.png"},
    description: {type: String, maxLength: 280},
    booksLiked: [{type:Schema.Types.ObjectId, ref:"Book"}],
    booksOffered:  [{type:Schema.Types.ObjectId, ref:"Book"}],
    message: [{content: String, 
        status: {type: String, enum: ["unseen", "seen"]},
        bookId: {type: Schema.Types.ObjectId, ref:"Book"},
    }]
},
{
    timestamps:{
        createdAt:"created_at",
        updatedAt:"updated_at"
    }
}
```



### Books model

```js
{
    title: { type: String, required: true },
    author: { type: String, required: true },
    rating: { type: Number, max:5 },
    imageURL: { type: String },
    status: { type: String, enum: ["available", "pending", "borrowed"] },
    gift: { type: Boolean },
    category: {
      type: String,
      enum: [
        "Fantasy",
        "Adventure",
        "Romance",
        "Contemporary",
        "Mystery",
        "Horror",
        "Thriller",
        "Paranormal",
        "Fiction",
        "Science Fiction",
        "Memoir",
        "Cooking",
        "Art",
        "Personal",
        "Development",
        "Motivational",
        "Health",
        "History",
        "Travel",
        "Guide",
        "Relationships",
        "Humor",
        "Children",
        "Comic",
        "Other" 
      ],
    },
    comments: [
      {
        comment: { type: Schema.Types.ObjectId, ref: "Comment" }
      },
    ],
    owner: { type: Schema.Types.ObjectId, ref: "User" },
    borrower: { type: Schema.Types.ObjectId, ref: "User" },
    booksLikes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
```



## Backlog

- return the book option
- Message/Chat option for users
- Responsive 

## Links

 Trello: https://trello.com/invite/b/ASaSELkh/eac8f4d97c46f8ea8a80268b09434ac4/m2-yang-juliane

## Git

Repo: https://github.com/ohhyangyang/m2-project-library

Deploy: https://x-book.herokuapp.com/

## Slides

Presentation: https://docs.google.com/presentation/d/185aydu5xmMaryGu4VVv83Mhnf-X5iDGsjmLf5X9Jjps/edit#slide=id.gad4c381f73_0_7
