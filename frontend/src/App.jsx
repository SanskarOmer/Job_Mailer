import React, { useState } from "react";

export default function App() {
  const [recruiterEmail, setRecruiterEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState(null);

const sendEmail = async () => {
  setMessage(null);
  if (!recruiterEmail || !/\S+@\S+\.\S+/.test(recruiterEmail)) {
    setMessage({ type: "error", text: "Please enter a valid email." });
    return;
  }

  setSending(true);
  try {
    const res = await fetch("http://localhost:5000/api/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ recruiterEmail }),
    });

    let data = {};
    try {
      data = await res.json(); // ✅ catch invalid JSON
    } catch {
      throw new Error("Server returned invalid response");
    }

    if (!res.ok) throw new Error(data.message || "Failed to send email");

    setMessage({ type: "success", text: data.message });
    setRecruiterEmail("");
  } catch (err) {
    setMessage({ type: "error", text: err.message });
  } finally {
    setSending(false);
  }
};

  return (
    <div className="container">
      <div className="card">
        <h1>Job Application Mailer</h1>
        <p className="muted">Sends your polished application email + resume to a recruiter</p>

        <label>Recruiter Email</label>
        <input
          type="email"
          value={recruiterEmail}
          onChange={(e) => setRecruiterEmail(e.target.value)}
          placeholder="recruiter@example.com"
        />

        <button onClick={sendEmail} disabled={sending}>
          {sending ? "Sending..." : "Send Application"}
        </button>

        {message && (
          <div className={`notice ${message.type === "error" ? "error" : "success"}`}>
            {message.text}
          </div>
        )}

        <hr />
        <small className="muted">Subject: Application for Entry-Level Developer Roles | Sanskar Omer</small>
      </div>
    </div>
  );
}
