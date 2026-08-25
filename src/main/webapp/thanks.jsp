<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
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
        <p><strong>First Name:</strong> ${user.firstName}</p>
        <p><strong>Last Name:</strong> ${user.lastName}</p>
        <p><strong>Email:</strong> ${user.email}</p>
        <p><strong>Date of Birth:</strong> ${user.dob}</p>
        <p><strong>How you heard about us:</strong> ${user.hearAbout}</p>
        <p><strong>Announcements:</strong> ${user.announcements}</p>
        <p><strong>Contact method:</strong> ${user.contactBy}</p>
    </div>

    <p>To submit another survey, click on the Return button shown below.</p>

    <form action="emailList" method="get">
        <input type="hidden" name="action" value="join">
        <button type="submit" class="submit-btn">Return</button>
    </form>
</main>
</body>
</html>
