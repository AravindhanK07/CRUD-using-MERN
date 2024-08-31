import React, { useEffect, useState } from "react";

const RetrieveRecord = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3001/retrieve-records")
      .then((response) => response.json())
      .then((data) => {
        setRecords(data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching records:", error);
        setError("Error fetching records");
        setLoading(false);
      });
  }, []);

  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    maxWidth: "600px",
    margin: "0 auto",
  };

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px",
  };

  const thStyle = {
    border: "1px solid #ddd",
    padding: "8px",
    backgroundColor: "#f2f2f2",
    textAlign: "left",
  };

  const tdStyle = {
    border: "1px solid #ddd",
    padding: "8px",
    textAlign: "left",
  };

  const headingStyle = {
    marginBottom: "20px",
  };

  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>Retrieve Records</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>ID</th>
              <th style={thStyle}>Name</th>
              <th style={thStyle}>Age</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record) => (
              <tr key={record.id}>
                <td style={tdStyle}>{record.id}</td>
                <td style={tdStyle}>{record.name}</td>
                <td style={tdStyle}>{record.age}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default RetrieveRecord;
