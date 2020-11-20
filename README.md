# M2 Project - Yang & Juliane



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

| Method | Route                     | Description                                                  | Request-Body                                          |
| ------ | ------------------------- | ------------------------------------------------------------ | ----------------------------------------------------- |
| `GET`  | `/`                       | Main page route. Renders the homepage                        |                                                       |
| `GET`  | `/auth/login`             | Renders the login form view                                  |                                                       |
| `GET`  | `/auth/signup`            | Renders the signup form view                                 |                                                       |
| `POST` | `/auth/login`             | Sends the login form data to the server (action to homepage) | users: {username, password}                           |
| `POST` | `/auth/signup`            | Sends the sign up form information to the server (action to homepage) | users:{username, password}                            |
| `GET`  | `/private/profile`        | Private route. if cookie ID received, render the profile page with the user info and add edit buttons. If an owner ID received, render the profile page with the book owner info. |                                                       |
| `GET`  | `/private/edit-profile`   | Private route. Renders the edit-profile form                 |                                                       |
| `POST` | `/private/edit-profile`   | Private route. Sends the changes for the profile to the the server and updates the DB (action to user profile) | users: {email, password, userinfo, [imageUrl]}        |
| `GET`  | `/auth/logout`            | Private route. Redirect to the home page                     |                                                       |
|        |                           |                                                              |                                                       |
| `GET`  | `/private/add-book`       | Private route. Renders the add-book form                     |                                                       |
| `POST` | `/private/add-book`       | Private route. Adds info of a new book to the database (redirect to user profile) | users: {name, authors, description, borrowed, userID} |
|        |                           | EDIT & DELETE BOOK?                                          |                                                       |
| `GET`  | `/books/library`          | Renders the view with the collection of books                |                                                       |
| `GET`  | `/books/library/:bookid`  | If it's public route. When borrow button clicked, alert for signup. (action to library page with an alert message). If the user is authenticated, update the status of book to Borrowed (false). (action to library page) | books:{status}                                        |
| `GET`  | `/books/library/:ownerid` | If it's public route. When visit owner button clicked, alert for signup. (redirect to library page with an alert message). If the user is authenticated, get the owner info of the book and redirect to the owner profile. (action to book owner profile) | users: {email, password, userinfo, [imageUrl]}        |
|        |                           |                                                              |                                                       |
|        |                           |                                                              |                                                       |
|        |                           |                                                              |                                                       |



## Model

### User model 

```js
{username: {type: String, required: true, unique: true},
email: {type: String, required: true},
password:{type: String, required:true},
imageURL:{type: String},
description: {type: String, maxLength: 280}},
booksLiked: [{type.Schema.Types.ObjectId, ref:"Book"}],
booksOffered:  [{type.Schema.Types.ObjectId, ref:"Book"}]
booksBorrowed [{type.Schema.Types.ObjectId, ref:"Book"}]}
```



### Books model

```js
{title: {type:String, required:true},
author:{type:String, required:true},
rating:{type:Number},
imageURL:{type:String},
status: {type:String, enum: "available", "pending","borrowed"},
gift: {type: Boolean},
owner: {{type: Schema.Types.ObjectId,  ref: "User"}},
borrower: {{type: Schema.Types.ObjectId, ref: "User"}},
booksLikes: [{type:Schema.Types.ObjectId, ref:"User"}],
comments: [
{
comment: {type: String, maxLength:100},
user: {type: Schema.Types.ObjectId, ref: "User"}
}]
}
```



## Backlog

- return the book option
- Message/Chat option for users
- Responsive 
- Animations --> https://floresprats.com/books/

## Links

 Trello: https://trello.com/invite/b/ASaSELkh/eac8f4d97c46f8ea8a80268b09434ac4/m2-yang-juliane

## Git

WIP

## Slides

WIP
