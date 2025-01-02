<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $phone = htmlspecialchars($_POST['phone']);
    $location = htmlspecialchars($_POST['location']);
    $experience = htmlspecialchars($_POST['experience']);

    $to = "manager@example.com"; // प्रबंधक का ईमेल पता
    $subject = "नई टीम सदस्य आवेदन: $name";
    $message = "
    <html>
    <head>
        <title>नई टीम सदस्य आवेदन</title>
    </head>
    <body>
        <p><strong>पूरा नाम:</strong> $name</p>
        <p><strong>ईमेल पता:</strong> $email</p>
        <p><strong>फोन नंबर:</strong> $phone</p>
        <p><strong>स्थान:</strong> $location</p>
        <p><strong>अनुभव:</strong> $experience</p>
    </body>
    </html>
    ";

    // ईमेल हेडर सेटिंग्स
    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8" . "\r\n";
    $headers .= "From: $email" . "\r\n";

    // ईमेल भेजें
    if (mail($to, $subject, $message, $headers)) {
        echo "धन्यवाद! आपकी जानकारी सफलतापूर्वक भेज दी गई है।";
    } else {
        echo "क्षमा करें, कुछ गलत हो गया। कृपया बाद में प्रयास करें।";
    }
}
