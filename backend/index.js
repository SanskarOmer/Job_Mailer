import express from "express";
import nodemailer from "nodemailer";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { composeEmail } from "./emailTemplate.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// load env
const {
  SMTP_HOST,
  SMTP_PORT,
  SMTP_USER,
  SMTP_PASS,
  FROM_NAME,
  FROM_EMAIL,
  FRONTEND_URL
} = process.env;

if (!SMTP_USER || !SMTP_PASS) {
  console.warn("SMTP_USER or SMTP_PASS not set. Check .env");
}

const transporter = nodemailer.createTransport({
  host: SMTP_HOST || "smtp.gmail.com",
  port: parseInt(SMTP_PORT || "465", 10),
  secure: true,
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS
  }
});

// test transporter on startup
transporter.verify().then(() => {
  console.log("Mailer ready");
}).catch((err) => {
  console.error("Mailer verification failed:", err.message || err);
});

const app = express();
app.use(express.json());
app.use(cors({
  origin: FRONTEND_URL || "http://localhost:3000"
}));

// endpoint to send email
app.post("/api/send-email", async (req, res) => {
  const { recruiterEmail } = req.body;

  if (!recruiterEmail) {
    return res
      .status(400)
      .json({ success: false, message: "Recruiter email is required" });
  }

  try {
    const { subject, text } = composeEmail();
    const resumePath = path.join(__dirname, "resume", "Sanskar_Omer_Resume.pdf");

    const info = await transporter.sendMail({
      from: `"${process.env.FROM_NAME}" <${process.env.FROM_EMAIL}>`,
      to: recruiterEmail,
      subject,
      text,
      attachments: [
        {
          filename: "Sanskar_Omer_Resume.pdf",
          path: resumePath,
        },
      ],
    });

    return res.json({
      success: true,
      message: "Email sent successfully!",
      id: info.messageId,
    });
  } catch (err) {
    console.error("Email send error:", err.message);
    // ✅ Always return JSON, even on error
    return res.status(500).json({
      success: false,
      message:
        "Failed to send email. Check SMTP credentials / Gmail App Password.",
      error: err.message,
    });
  }
});


// simple health check
app.get("/api/health", (req, res) => res.json({ ok: true }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend listening on ${PORT}`));
