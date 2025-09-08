<?php
//check if the form was submitted using the post method
if ($_SERVER["REQUEST_METHOD"]=="POST") {

    //1.Collect form data and sanitize it for security
    $name = htmlspecialchars($_POST['name']);
    $company = htmlspecialchars($_POST['company']);
    $email = htmlspecialchars($_POST['email']);
    $phone = htmlspecialchars($_POST['phone']);
    $employees = htmlspecialchars($_POST['employees']);
    $service = htmlspecialchars($_POST['service']);
    $message = htmlspecialchars($_POST['message']);

    //2.Set up the recipient email address and email details
    $to = "msebathoma@moagipayrollservices.co.za";
    $subject = "New Contact Form Submission From " . $name;

    //Create the email body
    $body = "You have received a new message from your website contact form.\n\n";
    $body .= "Full Name: " . $name . "\n";
    $body .= "Company: " . $company . "\n";
    $body .= "Email: " . $email . "\n";
    $body .= "Phone: " . $phone . "\n";
    $body .= "Number of Employees: " . $employees . "\n";
    $body .= "Services of interest: " . $service . "\n\n";
    $body .= "How can we help: " . $message . "\n";

    //Create the email headers
    $headers = "from: " . $email . "\r\n";
    $headers = "Reply-to " . $email . "r\n\";
    $headers = "Content-type: text/plain; charset=UTF-8\r\n";

    //3. Send the email and provide feedback to the user
    if (mail($to, $subject, $body, $headers)) {
    // Email sent successfully
    // Redirect the user to a "thank you" page
    header("Location: thank_you.html");
    exit;
    }else{
        //Email failed to send
        echo "Oops! Something went wrong, and we couldn't send your message. Please try again Later.";
    }

}else{
        // if someone tries to access the PHP file directly, redirect them away
    header("location:index.html");
    exit;
}
?>