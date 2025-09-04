export function composeEmail() {
  const subject = "Application for Entry-Level Developer Roles | Sanskar Omer";

  const text = `Dear Hiring Team,

I am Sanskar Omer, currently pursuing a B.Tech in Computer Science (2022–2026) from Dr. APJ Abdul Kalam Technical University. With a strong foundation in Java, Python, JavaScript, React, MySQL, and MongoDB, I have applied my skills through projects such as an AI-powered Image Enhancer and a Task Assigner web application.

In addition to academics, I have gained practical exposure through freelance design and development projects, as well as national-level competitions including the Smart India Hackathon. These experiences have strengthened my technical expertise, problem-solving abilities, and teamwork skills.

I am eager to contribute to a dynamic organization and would be grateful if you could consider me for any suitable opportunities where my skills and enthusiasm can add value.

Thank you for your time and consideration.

Best regards,
Sanskar Omer
📞 +91 7310069062
✉️ sanskaromer7@gmail.com
`;

  // You can also return HTML if you prefer to send HTML emails
  const html = `<p>Dear Hiring Team,</p>
<p>I am <strong>Sanskar Omer</strong>, currently pursuing a <strong>B.Tech in Computer Science (2022–2026)</strong> from <strong>Dr. APJ Abdul Kalam Technical University</strong>. With a strong foundation in <strong>Java, Python, JavaScript, React, MySQL, and MongoDB</strong>, I have applied my skills through projects such as an <strong>AI-powered Image Enhancer</strong> and a <strong>Task Assigner web application</strong>.</p>
<p>In addition to academics, I have gained practical exposure through freelance design and development projects, as well as national-level competitions including the <strong>Smart India Hackathon</strong>. These experiences have strengthened my technical expertise, problem-solving abilities, and teamwork skills.</p>
<p>I am eager to contribute to a dynamic organization and would be grateful if you could consider me for any <strong>suitable opportunities</strong> where my skills and enthusiasm can add value.</p>
<p>Thank you for your time and consideration.</p>
<p>Best regards,<br/><strong>Sanskar Omer</strong><br/>📞 +91 7310069062<br/>✉️ sanskaromer7@gmail.com</p>`;

  return { subject, text, html };
}
