module.exports = function generateTemplate(studentName, course, instructorName, completionDate) {
  return `
    <html>
      <head>
        <style>
          body {
            font-family: 'Georgia', serif;
            background: #fdfdfd;
            padding: 50px;
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .certificate {
            border: 10px solid #4a5568;
            padding: 40px 60px;
            max-width: 800px;
            background: white;
            box-shadow: 0 0 20px rgba(0,0,0,0.1);
            text-align: center;
          }

          .certificate h1 {
            font-size: 2.5rem;
            color: #2d3748;
            margin-bottom: 10px;
          }

          .certificate h2 {
            font-size: 1.8rem;
            margin: 10px 0;
          }

          .certificate h3 {
            font-size: 1.4rem;
            margin: 5px 0;
            color: #4a5568;
          }

          .details {
            margin-top: 30px;
            font-size: 1rem;
            color: #555;
          }

          .footer {
            margin-top: 50px;
            font-size: 0.9rem;
            color: #777;
          }

          .signature {
            margin-top: 40px;
            font-size: 1rem;
            text-align: right;
            padding-right: 40px;
            color: #2d3748;
          }
        </style>
      </head>
      <body>
        <div class="certificate">
          <h1>Certificate of Completion</h1>
          <p>This certificate is proudly presented to</p>
          <h2>${studentName}</h2>
          <p>for successfully completing the course</p>
          <h3>"${course.title}"</h3>

          <div class="details">
            <p><strong>Instructor:</strong> ${instructorName}</p>
            <p><strong>Duration:</strong> ${course.duration}</p>
            <p><strong>Level:</strong> ${course.level?.name || 'N/A'}</p>
            <p><strong>Date of Completion:</strong> ${completionDate}</p>
          </div>

          <div class="footer">
            Issued by taleemotarbiya.com
          </div>
        </div>
      </body>
    </html>
  `;
}
