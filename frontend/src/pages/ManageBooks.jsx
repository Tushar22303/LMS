import React, { useEffect, useState } from "react";
import "../styles/ManageBooks.css";
import Sidebar from "../components/common/Sidebar";
import { IoAdd } from "react-icons/io5";
import AdminHeader from "./AdminHeader";
import { FaEdit, FaSearch } from "react-icons/fa";
import Modal from "../components/common/Modal";
import { MdDeleteForever } from "react-icons/md";
import axios from "axios";
import ToastNotifications from "../components/common/ToastNotifications";
import ClipLoader from "react-spinners/ClipLoader";
import { BASE_URL } from "../App";

const ManageBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [selectedBook, setSelectedBook] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    isbn: "",
    category: "",
    subject: "",
    genre: "",
  });
  const [toast, setToast] = useState(null);

  // Fetch the Book API from Backend
  useEffect(() => {
    axios
      .get(BASE_URL + "/books")
      .then((res) => {
        setBooks(res.data);
        setLoading(false);
      })
      .catch((error) => {
        const message =
          error.response?.data?.error || "Failed to Fetch the Book";
        setToast({ message, type: "error" });
        setLoading(false);
      });
  });

  // API for Adding the book
  const handleAddBook = async (e) => {
    e.preventDefault();

    // Basic Validation
    if (
      !formData.title ||
      !formData.author ||
      !formData.isbn ||
      !formData.category ||
      !formData.subject ||
      !formData.genre
    ) {
      setToast({ message: "All fields are required!", type: "error" });
      return;
    }

    try {
      const res = await axios.post(BASE_URL + "/books", formData);
      setBooks([...books, res.data]);
      setToast({ message: "Book Added Successfully", type: "success" });
      closeModal();
    } catch (error) {
      console.log("Add Book Error : ", error);
    }
  };

  // API for update the book
  useEffect(() => {
    if (modalType === "edit" && selectedBook) {
      setFormData({
        title: selectedBook.title,
        author: selectedBook.author,
        isbn: selectedBook.isbn,
        category: selectedBook.category,
        subject: selectedBook.subject,
        genre: selectedBook.genre,
      });
    }
  }, [modalType, selectedBook]);

  const handleBookUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        BASE_URL + `/books/${selectedBook._id}`,
        formData
      );

      setBooks((prevBooks) =>
        prevBooks.map((book) =>
          book._id === selectedBook._id ? res.data : book
        )
      );

      setToast({ message: "Book Updated Successfully", type: "success" });
      closeModal();
    } catch (error) {
      setToast({ message: "Book not found", type: "error" });
    }
  };

  // Open Modal
  const openModal = (type) => {
    setModalType(type);
    setShowModal(true);

    if (type === "add") {
      // Reset the field when adding the book
      setFormData({
        title: "",
        author: "",
        isbn: "",
        category: "",
        subject: "",
        genre: "",
      });
      setSelectedBook(null); // Also clear selected book
    }
  };

  // Close Modal
  const closeModal = () => {
    setShowModal(false);
    setModalType("");
    setSelectedBook(null);
  };

  // Delete Book
  const handleDeleteBook = async (bookId, bookTitle) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete '${bookTitle}'?`
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(BASE_URL + `/books/${bookId}`);
      setBooks(books.filter((book) => book._id !== bookId));
      setToast({ message: "Book Deleted Successfully", type: "success" });
    } catch (error) {
      setToast({ message: `Delete Error : ${error}`, type: "error" });
    }
  };

  // Search Books API
  const handleSearchBook = async () => {
    if (!searchQuery.trim()) return;

    try {
      const res = await axios.get(
        BASE_URL + `/books/search?query=${searchQuery}`
      );
      setFilteredBooks(res.data);
      closeModal();
    } catch (error) {
      setToast({ message: "Search Failed", type: "error" });
    }
  };

  const renderModalContent = () => {
    if (modalType === "add") {
      return (
        <form className="modal-form" onSubmit={handleAddBook}>
          <div>
            <input
              type="text"
              placeholder="Enter Title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Enter Author"
              value={formData.author}
              onChange={(e) =>
                setFormData({ ...formData, author: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Enter ISBN"
              value={formData.isbn}
              onChange={(e) =>
                setFormData({ ...formData, isbn: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Enter Category"
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Enter Subject"
              value={formData.subject}
              onChange={(e) =>
                setFormData({ ...formData, subject: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Enter Genre"
              value={formData.genre}
              onChange={(e) =>
                setFormData({ ...formData, genre: e.target.value })
              }
            />
          </div>
          {/* Add more fields as needed */}
          <button type="submit" className="modal-submit-btn">
            Add
          </button>
        </form>
      );
    } else if (modalType === "search") {
      return (
        <div className="modal-search">
          <input
            type="text"
            placeholder="Search books by genre, author, or category..."
            className="modal-search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            className="search-book-btn"
            style={{ marginTop: "5px" }}
            type="button"
            onClick={handleSearchBook}
          >
            Search
          </button>
        </div>
      );
    } else if (modalType === "edit") {
      return (
        <form className="modal-edit-form" onSubmit={handleBookUpdate}>
          <div className="form-row">
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder="Title"
            />
          </div>

          <div className="form-row">
            <label htmlFor="author">Author:</label>
            <input
              type="text"
              id="author"
              value={formData.author}
              onChange={(e) =>
                setFormData({ ...formData, author: e.target.value })
              }
              placeholder="Author"
            />
          </div>

          <div className="form-row">
            <label htmlFor="isbn">ISBN:</label>
            <input
              type="text"
              id="isbn"
              value={formData.isbn}
              onChange={(e) =>
                setFormData({ ...formData, isbn: e.target.value })
              }
              placeholder="ISBN"
            />
          </div>

          <div className="form-row">
            <label htmlFor="category">Category:</label>
            <input
              type="text"
              id="category"
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              placeholder="Category"
            />
          </div>

          <div className="form-row">
            <label htmlFor="subject">Subject:</label>
            <input
              type="text"
              id="subject"
              value={formData.subject}
              onChange={(e) =>
                setFormData({ ...formData, subject: e.target.value })
              }
              placeholder="Subject"
            />
          </div>

          <div className="form-row">
            <label htmlFor="genre">Genre:</label>
            <input
              type="text"
              id="genre"
              value={formData.genre}
              onChange={(e) =>
                setFormData({ ...formData, genre: e.target.value })
              }
              placeholder="Genre"
            />
          </div>

          <button type="submit" className="modal-submit-btn">
            Update
          </button>
        </form>
      );
    }
  };

  return (
    <>
      <div className="manage-books-layout">
        {/* Sidebar */}
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

        {/* Main Content */}
        <div className="manage-books-main">
          {/* Header now imported */}
          <AdminHeader />

          {/* Title and Add Button */}
          <div className="manage-books-topbar">
            <h2 className="manage-books-title">📚 Manage Books</h2>
            <div>
              <button
                className="search-book-btn"
                onClick={() => openModal("search")}
              >
                <FaSearch /> Search Book
              </button>

              {filteredBooks.length > 0 && (
                <button
                  className="clear-search-btn"
                  onClick={() => {
                    setFilteredBooks([]);
                    setSearchQuery("");
                    setLoading(true);
                    axios
                      .get(BASE_URL + "/books")
                      .then((res) => {
                        setBooks(res.data);
                        setLoading(false);
                      })
                      .catch((error) => {
                        const message =
                          error.response?.data?.error ||
                          "Failed to Fetch the Book";
                        setToast({ message, type: "error" });
                        setLoading(false);
                      });
                  }}
                >
                  Clear Search
                </button>
              )}

              <button className="add-book-btn" onClick={() => openModal("add")}>
                <IoAdd /> Add New Book
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="books-table-container">
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
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="8" style={{ textAlign: "center" }}>
                      <ClipLoader size={50} color="#4F46E5" />
                    </td>
                  </tr>
                ) : (filteredBooks.length > 0 ? filteredBooks : books).length >
                  0 ? (
                  (filteredBooks.length > 0 ? filteredBooks : books).map(
                    (book) => (
                      <tr key={book._id}>
                        <td>{book.book_id}</td>
                        <td className="book-title">{book.title}</td>
                        <td>{book.author}</td>
                        <td>{book.isbn}</td>
                        <td>{book.category}</td>
                        <td>{book.subject}</td>
                        <td>{book.genre}</td>
                        <td>
                          <button
                            className="edit-btn"
                            onClick={() => {
                              setSelectedBook(book);
                              openModal("edit");
                            }}
                          >
                            <FaEdit />
                          </button>
                          <button
                            className="delete-btn"
                            onClick={() =>
                              handleDeleteBook(book._id, book.title)
                            }
                          >
                            <MdDeleteForever />
                          </button>
                        </td>
                      </tr>
                    )
                  )
                ) : (
                  <tr>
                    <td colSpan="8" style={{ textAlign: "center" }}>
                      No books found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <Modal
            show={showModal}
            onClose={closeModal}
            title={
              modalType === "add"
                ? "Add New Book"
                : modalType === "search"
                ? "Search Books"
                : modalType === "edit"
                ? "Edit Book"
                : "Modal title" // Default title, in case modalType is not recognized
            }
          >
            {renderModalContent()}
          </Modal>
        </div>
      </div>
    </>
  );
};

export default ManageBooks;
