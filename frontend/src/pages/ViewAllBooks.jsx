import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/common/Sidebar";
import AdminHeader from "../pages/AdminHeader";
import "../styles/ViewAllBooks.css";
import ToastNotifications from "../components/common/ToastNotifications";
import { BASE_URL } from "../App";

const ViewAllBooks = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [toast, setToast] = useState(null);

  const userEmail = localStorage.getItem("email");
  const user_name = localStorage.getItem("name");

  useEffect(() => {
    fetchBooks();
  }, []);

  // Fetch all the books API
  const fetchBooks = async () => {
    try {
      const response = await axios.get(BASE_URL + "/books");
      setBooks(response.data);
    } catch (error) {
      setToast({ message: `Error Fetching Books : ${error}`, type: "error" });
    }
  };

  // Handle request book API
  const handleRequestBooks = async (book) => {
    try {
      const res = await axios.post(BASE_URL + "/request-book", {
        book_id: book.book_id,
        title: book.title,
        subject: book.subject,
        name: user_name,
        email: userEmail,
      });

      // ✅ Show success toast only if 200/201
      if (res.status === 201) {
        setToast({ message: res.data.message, type: "success" });
      } else {
        setToast({ message: "Unexpected response", type: "error" });
      }
    } catch (error) {
      const errMsg = error.response?.data?.message || "Error requesting book";
      setToast({ message: errMsg, type: "error" });
    }
  };

  // Filter and search books
  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="viewall-layout">
        <Sidebar role="user" />

        {/* Toast Notification */}
        {toast && (
          <ToastNotifications
            message={toast.message}
            type={toast.type}
            duration={3000}
            onClose={() => setToast(null)}
          />
        )}

        <div className="viewall-main">
          <AdminHeader />

          <div className="viewall-header">
            <h2>Available Books</h2>
            <input
              type="text"
              placeholder="Search by title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="books-table-wrapper">
            <table className="books-table">
              <thead>
                <tr>
                  <th>Book ID</th>
                  <th>Title</th>
                  <th>Author</th>
                  <th>ISBN</th>
                  <th>Category</th>
                  <th>Subject</th>
                  <th>Genre</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredBooks.length > 0 ? (
                  filteredBooks.map((book) => (
                    <tr key={book._id}>
                      <td>{book.book_id || "N/A"}</td>
                      <td>{book.title}</td>
                      <td>{book.author}</td>
                      <td>{book.isbn}</td>
                      <td>{book.category}</td>
                      <td>{book.subject}</td>
                      <td>{book.genre}</td>
                      <td>
                        <button
                          className="request-btn"
                          onClick={() => handleRequestBooks(book)}
                        >
                          Request
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" className="no-books">
                      No books found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewAllBooks;
