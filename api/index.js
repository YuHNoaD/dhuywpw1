const fs = require('fs');
const path = require('path');
const querystring = require('querystring');

module.exports = (req, res) => {
    let bodyStr = '';
    req.on('data', chunk => { bodyStr += chunk.toString(); });
    req.on('end', () => {
        const params = querystring.parse(bodyStr);
        const firstName = params.firstName || 'Joel';
        const lastName = params.lastName || 'Murach';
        const email = params.email || 'joel@murach.com';

        let thanksPath = path.join(process.cwd(), 'src', 'main', 'webapp', 'thanks.jsp');
        if (!fs.existsSync(thanksPath)) thanksPath = path.join(process.cwd(), 'thanks.jsp');
        if (!fs.existsSync(thanksPath)) thanksPath = path.join(process.cwd(), 'src', 'main', 'webapp', 'thanks.html');

        if (fs.existsSync(thanksPath)) {
            let html = fs.readFileSync(thanksPath, 'utf8');
            html = html.replace(/<%@ page.*%>/gi, '');
            html = html.replace(/\$\{user\.firstName\}/g, firstName);
            html = html.replace(/\$\{user\.lastName\}/g, lastName);
            html = html.replace(/\$\{user\.email\}/g, email);
            html = html.replace(/\$\{firstName\}/g, firstName);
            html = html.replace(/\$\{lastName\}/g, lastName);
            html = html.replace(/\$\{email\}/g, email);

            res.setHeader('Content-Type', 'text/html; charset=utf-8');
            return res.status(200).send(html);
        }

        res.status(200).send('Submitted');
    });
};
