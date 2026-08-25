const querystring = require('querystring');

module.exports = async (req, res) => {
    let body = {};
    if (req.method === 'POST') {
        let buffers = [];
        for await (const chunk of req) {
            buffers.push(chunk);
        }
        const rawBody = Buffer.concat(buffers).toString('utf-8');
        body = querystring.parse(rawBody);
    }

    const action = req.query.action || body.action || 'join';

    if (action === 'join') {
        res.writeHead(302, { Location: '/index.html' });
        res.end();
        return;
    }

    if (action === 'add') {
        const firstName = body.firstName || '';
        const lastName = body.lastName || '';
        const email = body.email || '';
        const dob = body.dob || '';
        const hearAbout = body.hearAbout || '';
        const announcements = Array.isArray(body.announcements) ? body.announcements.join(', ') : (body.announcements || 'None');
        const contactBy = body.contactBy || '';

        const html = `<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Murach Survey - Thanks</title>
    <link rel="stylesheet" href="styles/main.css" type="text/css"/>
</head>
<body>
<main class="survey-container">
    <header>
        <img src="images/logo.png" alt="Murach Logo" class="logo">
        <h1>Thanks for completing our survey</h1>
        <p class="intro-text">Here is the information that you entered:</p>
    </header>

    <div class="result-display">
        <p><strong>First Name:</strong> ${firstName}</p>
        <p><strong>Last Name:</strong> ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Date of Birth:</strong> ${dob}</p>
        <p><strong>How you heard about us:</strong> ${hearAbout}</p>
        <p><strong>Announcements:</strong> ${announcements}</p>
        <p><strong>Contact method:</strong> ${contactBy}</p>
    </div>

    <p>To submit another survey, click on the Return button shown below.</p>

    <form action="emailList" method="get">
        <input type="hidden" name="action" value="join">
        <button type="submit" class="submit-btn">Return</button>
    </form>
</main>
</body>
</html>`;

        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.status(200).send(html);
        return;
    }

    res.writeHead(302, { Location: '/index.html' });
    res.end();
};
