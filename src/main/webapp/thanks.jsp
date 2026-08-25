<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!doctype html>
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
        flex: 0 0 160px; /* Giữ độ rộng nhãn cố định để thẳng hàng */
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
        <span>${user.firstName}</span>
    </div>
    <div class="result-row">
        <label>Last Name:</label>
        <span>${user.lastName}</span>
    </div>
    <div class="result-row">
        <label>Email:</label>
        <span>${user.email}</span>
    </div>
    <div class="result-row">
        <label>Date of Birth:</label>
        <span>${user.dob}</span>
    </div>
    <div class="result-row">
        <label>Heard about us from:</label>
        <span>${user.hearAbout}</span>
    </div>
    <div class="result-row">
        <label>Contact me by:</label>
        <span>${user.contactBy}</span>
    </div>
    <div class="result-row">
        <label>Announcements:</label>
        <span>${user.announcements}</span>
    </div>
    <br>
    <button type="button" class="submit-btn" onclick="window.location.href='index.html';">Return to Survey</button>
</main>
</body>
</html>
