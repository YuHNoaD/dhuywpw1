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

    if (pathname === '/images/logo.png') {
        const filePath = path.join(__dirname, 'src', 'main', 'webapp', 'images', 'logo.png');
        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.writeHead(404);
                return res.end('Logo Not Found');
            }
            res.writeHead(200, { 'Content-Type': 'image/png' });
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

                const html = `<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Murach's Java Servlets and JSP</title>
    <link rel="stylesheet" href="styles/main.css" type="text/css"/>
    <style>
    .result-row {
        display: flex;
        margin-bottom: 12px;
        font-size: 15px;
        align-items: baseline;
    }
    .result-row label {
        flex: 0 0 160px;
        font-weight: bold;
        color: var(--primary-teal, #007c8a);
    }
    .result-row span {
        flex: 1;
        color: #333;
    }
    .announcement-list {
        margin: 0;
        padding-left: 20px;
    }
    </style>
</head>
<body>
<main class="survey-container">
    <header style="text-align: center; margin-bottom: 1.5em;">
        <img src="images/logo.png" alt="Murach Logo" class="logo" style="max-width: 120px; border-radius: 6px;">
    </header>
    <h1>Thanks for joining our email list</h1>
    <p class="intro-text" style="margin-bottom: 1.5em;">Here is the information that you entered:</p>

    <div class="result-row">
        <label>First Name:</label>
        <span>${firstName}</span>
    </div>
    <div class="result-row">
        <label>Last Name:</label>
        <span>${lastName}</span>
    </div>
    <div class="result-row">
        <label>Email:</label>
        <span>${email}</span>
    </div>
    <div class="result-row">
        <label>Date of Birth:</label>
        <span>${dob}</span>
    </div>
    <div class="result-row">
        <label>Heard about us from:</label>
        <span>${hearAbout}</span>
    </div>
    <div class="result-row">
        <label>Contact me by:</label>
        <span>${contactBy}</span>
    </div>
    <div class="result-row">
        <label>Announcements:</label>
        <span>${announcements}</span>
    </div>
    <br>
    <button type="button" class="submit-btn" onclick="window.location.href='index.html';">Return to Survey</button>
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
