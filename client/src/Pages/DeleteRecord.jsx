import React, { useState } from "react";

const DeleteRecord = () => {
  const [id, setId] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:3001/delete-record/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        setMessage("Record deleted successfully");
        setId("");
      })
      .catch((error) => {
        console.error("Error:", error);
        setMessage("Error deleting record");
      });
  };

  const formStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    maxWidth: "400px",
    margin: "0 auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    backgroundColor: "#f9f9f9",
  };

  const inputStyle = {
    margin: "10px 0",
    padding: "10px",
    width: "100%",
    boxSizing: "border-box",
  };

  const buttonStyle = {
    padding: "10px 20px",
    backgroundColor: "#f44336",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  };

  const headingStyle = {
    marginBottom: "20px",
  };

  const messageStyle = {
    marginTop: "20px",
    color: message.includes("successfully") ? "green" : "red",
  };

  return (
    <div style={formStyle}>
      <h2 style={headingStyle}>Delete Record</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
          style={inputStyle}
          required
        />
        <button type="submit" style={buttonStyle}>
          Delete
        </button>
      </form>
      {message && <p style={messageStyle}>{message}</p>}
    </div>
  );
};

export default DeleteRecord;
