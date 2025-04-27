import React, { useEffect, useState } from "react";
import "../styles/IssueBooks.css";
import Sidebar from "../components/common/Sidebar";
import AdminHeader from "./AdminHeader";
import axios from "axios";
import ToastNotifications from "../components/common/ToastNotifications";
import { BASE_URL } from "../App";

const IssueBooks = () => {
  const [users, setUsers] = useState([]);
  const [books, setBooks] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedBook, setSelectedBook] = useState("");
  const [issueDate, setIssueDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [toast, setToast] = useState(null);

  // Fetch the Books and Users from Backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userRes, bookRes] = await Promise.all([
          axios.get(BASE_URL + "/users"),
          axios.get(BASE_URL + "/books"),
        ]);
        setBooks(bookRes.data);
        setUsers(userRes.data);
      } catch (error) {
        setToast({
          message: `Error fetching data : ${error.message}`,
          type: "error",
        });
      }
    };

    fetchData();
  }, []);

  // Reset Form
  const resetForm = () => {
    setSelectedUser("");
    setSelectedBook("");
    setIssueDate("");
    setReturnDate("");
  };

  // Issue the Book to the user
  const handleIssue = async () => {
    if (!selectedUser || !selectedBook || !issueDate || !returnDate) {
      setToast({ message: "Please fill all fields", type: "error" });
      return;
    }

    if (returnDate <= issueDate) {
      setToast({
        message: "Return Date cannot be past than issue Date",
        type: "error",
      });
      return;
    }

    try {
      const selectUserObj = users.find((u) => u._id === selectedUser);
      const selectBookObj = books.find((b) => b._id === selectedBook);

      const issuePayLoad = {
        user_id: selectedUser,
        name: selectUserObj?.name || "",
        book_id: selectedBook,
        title: selectBookObj?.title || "",
        issueDate,
        returnDate,
      };

      const res = await axios.post(BASE_URL + "/issue-books", issuePayLoad);
      if (res.status === 201) {
        setToast({ message: "Book Issued Successfully", type: "success" });

        resetForm();
      }
    } catch (error) {
      setToast({
        message: `Error Issuing Books : ${
          error.res?.data?.error || error.message
        }`,
        type: "error",
      });
    }
  };

  // Helper to get user/book names
  // const getUserIndexCode = (id) => {
  //   const index = users.findIndex((u) => u._id === id);
  //   return index !== -1 ? `U-${String(index + 1).padStart(3, "0")}` : "---";
  // };
  // const getBookIndexCode = (id) => {
  //   const index = books.findIndex((b) => b._id === id);
  //   return index !== -1 ? `B-${String(index + 1).padStart(3, "0")}` : "---";
  // };

  return (
    <>
      <div className="issue-books-layout">
        <Sidebar role="admin" />

        {/* Show Toast Notification */}
        {toast && (
          <ToastNotifications
            message={toast.message}
            type={toast.type}
            duration={2000}
            onClose={() => setToast(null)} // Hide after duration
          />
        )}

        <div className="issue-books-main">
          <AdminHeader />

          <h2 className="issue-books-title">📖 Issue Books</h2>

          <div className="issue-form-card">
            <div className="form-group">
              <label>Select User:</label>
              <select
                value={selectedUser}
                onChange={(e) => setSelectedUser(e.target.value)}
              >
                <option value="">-- Select User --</option>
                {users.map((user, index) => (
                  <option key={user._id} value={user._id}>
                    {`U-${String(index + 1).padStart(3, "0")} - ${user.name} (${
                      user.email
                    })`}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Select Book:</label>
              <select
                value={selectedBook}
                onChange={(e) => setSelectedBook(e.target.value)}
              >
                <option value="">-- Select Book --</option>
                {books.map((book, index) => (
                  <option key={book._id} value={book._id}>
                    {`B-${String(index + 1).padStart(3, "0")} - ${
                      book.title
                    } by ${book.author}`}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Issue Date:</label>
              <input
                type="date"
                value={issueDate}
                onChange={(e) => setIssueDate(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Return Date:</label>
              <input
                type="date"
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
              />
            </div>

            <button className="issue-btn" onClick={handleIssue}>
              Issue Book
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default IssueBooks;
