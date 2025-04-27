import React, { useEffect, useState } from "react";
import "../styles/ViewHistory.css";
import Sidebar from "../components/common/Sidebar";
import AdminHeader from "./AdminHeader";
import { FaDownload } from "react-icons/fa";
import axios from "axios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { BASE_URL } from "../App";

const ViewHistory = () => {
  const [historyData, setHistoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [books, setBooks] = useState([]);
  const [users, setUsers] = useState([]);

  const userMap = {};
  users.forEach((user, index) => {
    userMap[user._id] = `U-${String(index + 1).padStart(3, "0")}`;
  });

  const bookMap = {};
  books.forEach((book, index) => {
    bookMap[book._id] = `B-${String(index + 1).padStart(3, "0")}`;
  });

  // Fetch the History API
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [historyRes, usersRes, booksRes] = await Promise.all([
          axios.get(BASE_URL + "/history"),
          axios.get(BASE_URL + "/users"),
          axios.get(BASE_URL + "/books"),
        ]);

        setHistoryData(historyRes.data);
        setUsers(usersRes.data);
        setBooks(booksRes.data);
      } catch (err) {
        console.error("Error fetching data", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  // Generate the PDF
  const generatePDF = () => {
    const doc = new jsPDF();
    const date = new Date().toISOString().split("T")[0];

    // Add a title
    doc.setFontSize(16);
    doc.text(`Book Issue History Report - ${date}`, 14, 20);
    doc.setFontSize(11);
    doc.setTextColor(100);
    doc.text(`Generated on: ${date}`, 14, 30);

    const tableColumn = [
      "User ID",
      "Name",
      "Book ID",
      "Title",
      "Issue Date",
      "Return Date",
      "Status",
    ];

    const tableRows = historyData.map((entry) => [
      userMap[entry.user_id] || "---",
      entry.name,
      bookMap[entry.book_id] || "---",
      entry.title,
      entry.issueDate,
      entry.returnDate || "--",
      entry.status.charAt(0).toUpperCase() + entry.status.slice(1),
    ]);

    // Use autoTable plugin
    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 30,
      styles: { fontSize: 9 },
    });

    doc.save(`Book_History_Report_${date}_${Date.now()}.pdf`);
  };

  return (
    <>
      <div className="view-history-layout">
        <Sidebar role="admin" />

        <div className="view-history-main">
          <AdminHeader />

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h2 className="history-title">📜 Book Issue History</h2>
            <button
              type="button"
              className="download-btn"
              onClick={generatePDF}
            >
              <FaDownload />
            </button>
          </div>

          {loading ? (
            <p>Loading history...</p>
          ) : (
            <div className="history-table-container">
              <table className="history-table">
                <thead>
                  <tr>
                    <th>User ID</th>
                    <th>Name</th>
                    <th>Book ID</th>
                    <th>Title</th>
                    <th>Issue Date</th>
                    <th>Return Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {historyData.map((entry, index) => (
                    <tr key={index}>
                      <td>{userMap[entry.user_id] || "---"}</td>
                      <td>{entry.name}</td>
                      <td>{bookMap[entry.book_id] || "---"}</td>
                      {/* <td>{entry.book_id}</td> */}
                      <td>{entry.title}</td>
                      <td>{entry.issueDate}</td>
                      <td>{entry.returnDate || "--"}</td>
                      <td>
                        <span
                          className={`status-badge ${
                            entry.status === "returned"
                              ? "status-returned"
                              : "status-issued"
                          }`}
                        >
                          {entry.status.charAt(0).toUpperCase() +
                            entry.status.slice(1)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ViewHistory;
