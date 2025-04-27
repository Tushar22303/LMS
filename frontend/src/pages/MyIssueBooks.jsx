import React, { useEffect, useState } from "react";
import Sidebar from "../components/common/Sidebar";
import "../styles/MyIssueBooks.css";
import AdminHeader from "./AdminHeader";
import { FaSearch } from "react-icons/fa";
import axios from "axios";
import ToastNotifications from "../components/common/ToastNotifications";
import { BASE_URL } from "../App";

const MyIssueBooks = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [issuedBooks, setIssuedBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);

  const userID = localStorage.getItem("user_id");

  // Fetch the Issued Books from the Backend
  useEffect(() => {
    const fetchIssuedBooks = async () => {
      try {
        const res = await axios.get(BASE_URL + `/my-issue-books/${userID}`);
        console.log("Fetched books: ", res.data);
        setIssuedBooks(res.data);
        setLoading(false);
      } catch (error) {
        console.log("Error fetching issued books:", error);
        setLoading(false);
      }
    };
    fetchIssuedBooks();
  }, [userID]);

  // Filter Books based on search term
  const filteredBooks = issuedBooks.filter((book) =>
    [book.title, book.author, book.subject, book.category]
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  // Return Book API
  const handleReturn = async (book) => {
    const confirmMessage = window.confirm(
      `Are you sure you want to return the book : ${book.title}`
    );

    if (!confirmMessage) return;

    try {
      const username = localStorage.getItem("name");

      await axios.post(BASE_URL + "/return-book", {
        book_id: book.book_id,
        user_name: username,
        title: book.title,
        author: book.author,
        category: book.category,
        subject: book.subject,
        issueDate: book.issueDate,
        returnDate: book.returnDate,
      });
      setToast({ message: "Book returned successfully", type: "success" });

      setIssuedBooks((prev_book) =>
        prev_book.filter((b) => b.book_id !== book.book_id)
      );
    } catch (error) {
      setToast({ message: "Failed to return the book", type: "error" });
    }
  };

  return (
    <>
      <div className="my-issue-books-layout">
        <Sidebar role="user" />

        {/* Show Toast Notification */}
        {toast && (
          <ToastNotifications
            message={toast.message}
            type={toast.type}
            duration={2000}
            onClose={() => setToast(null)} // Hide after duration
          />
        )}

        <div className="my-issue-books-main">
          <AdminHeader />

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <h2 className="my-issue-title">📚 My Issued Books</h2>

            {/* 🔍 Search Input */}
            <div className="search-bar">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search by title, author, subject..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {loading ? (
            <p>Loading books...</p>
          ) : filteredBooks.length > 0 ? (
            <div className="book-cards-container">
              {filteredBooks.map((book) => (
                <div className="book-card" key={book.book_id}>
                  <div className="book-card-header">
                    <h3>{book.title}</h3>
                    <span className="book-id">{book.book_id}</span>
                  </div>
                  <p>
                    <strong>Author:</strong> {book.author}
                  </p>
                  <p>
                    <strong>Subject:</strong> {book.subject}
                  </p>
                  <p>
                    <strong>Category:</strong> {book.category}
                  </p>
                  <p>
                    <strong>Issued:</strong> {book.issueDate}
                  </p>
                  <p>
                    <strong>Return by:</strong> {book.returnDate}
                  </p>
                  <button
                    className="return-btn"
                    onClick={() => handleReturn(book)}
                  >
                    Return
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-books-text">No books found for your search.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default MyIssueBooks;
