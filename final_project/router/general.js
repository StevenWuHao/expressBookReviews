const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  const username = req.body.username;
    const password = req.body.password;
    // Check if both username and password are provided
    if (username && password) {
        // Check if the user does not already exist
        if (!isValid(username)) {
            // Add the new user to the users array
            users.push({"username": username, "password": password});
            return res.status(200).json({message: "User successfully registered. Now you can login"});
        } else {
            return res.status(404).json({message: "User already exists!"});
        }
    }
    // Return error if username or password is missing
    return res.status(404).json({message: "Unable to register user."});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  return res.status(200).json({books});
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  let isbn = req.params.isbn;
  
  let filter_book;
  for (let i in books) {
    if (i == isbn) {
        filter_book = books[i];
    }
  }

  return res.status(200).json(filter_book);
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  let author = req.params.author;
  
  let filter_book = new Array();
  for (let i in books) {
    if (books[i].author === author) {
        filter_book.push(books[i]);
    }
  }

  return res.status(200).json({filter_book});
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  let title = req.params.title;
  
  let filter_book = new Array();
  for (let i in books) {
    if (books[i].title === title) {
        filter_book.push(books[i]);
    }
  }

  return res.status(200).json({filter_book});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  let isbn = req.params.isbn;

  let review;
  for (let i in books) {
    if (i == isbn) {
        review = books[i].review;
    }
  }

  return res.status(200).json({review});
});

module.exports.general = public_users;
