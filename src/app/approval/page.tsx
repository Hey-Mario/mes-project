"use client"; 

import { useState } from "react";

const ApprovalPage = () => {
  const [amount, setAmount] = useState("");
  const [result, setResult] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const response = await fetch("/api/approval", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: parseFloat(amount) }),
    });

    const data = await response.json();
    setResult(data.result);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Approval Request</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Amount:
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              min="0"
            />
          </label>
        </div>
        <button type="submit">Submit for Approval</button>
      </form>
      {result && (
        <div>
          <h2>Result</h2>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
};

export default ApprovalPage;
