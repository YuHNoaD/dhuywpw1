const http = require('http');
const fs = require('fs');
const path = require('path');
const querystring = require('querystring');

const PORT = process.env.PORT || 8080;
const DATA_FILE = path.join(__dirname, 'data', 'email_list.txt');

function saveUser(firstName, lastName, email, dob, hearAbout, announcements, contactBy) {
    const dir = path.dirname(DATA_FILE);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
    const line = `${firstName},${lastName},${email},${dob},${hearAbout},${announcements},${contactBy}\n`;
    fs.appendFileSync(DATA_FILE, line, 'utf-8');
}

const server = http.createServer((req, res) => {
    console.log(`${req.method} ${req.url}`);

    const parsedUrl = new URL(req.url, `http://localhost:${PORT}`);
    const pathname = parsedUrl.pathname;

    if (pathname === '/' || pathname === '/index.html') {
        const filePath = path.join(__dirname, 'src', 'main', 'webapp', 'index.html');
        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.writeHead(500);
                return res.end('Error loading index.html');
            }
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end(data);
        });
        return;
    }

    if (pathname === '/styles/main.css') {
        const filePath = path.join(__dirname, 'src', 'main', 'webapp', 'styles', 'main.css');
        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.writeHead(500);
                return res.end('Error loading main.css');
            }
            res.writeHead(200, { 'Content-Type': 'text/css; charset=utf-8' });
            res.end(data);
        });
        return;
    }

    if (pathname === '/emailList') {
        let bodyStr = '';
        req.on('data', chunk => {
            bodyStr += chunk.toString();
        });

        req.on('end', () => {
            const params = querystring.parse(bodyStr);
            const action = parsedUrl.searchParams.get('action') || params.action || 'join';

            if (action === 'join') {
                res.writeHead(302, { 'Location': '/index.html' });
                return res.end();
            }

            if (action === 'add') {
                const firstName = params.firstName || '';
                const lastName = params.lastName || '';
                const email = params.email || '';
                const dob = params.dob || '';
                const hearAbout = params.hearAbout || '';
                const announcements = Array.isArray(params.announcements) ? params.announcements.join(', ') : (params.announcements || 'None');
                const contactBy = params.contactBy || '';

                if (email) {
                    saveUser(firstName, lastName, email, dob, hearAbout, announcements, contactBy);
                }

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

                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                return res.end(html);
            }

            res.writeHead(302, { 'Location': '/index.html' });
            return res.end();
        });
        return;
    }

    res.writeHead(404);
    res.end('Not Found');
});

server.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
