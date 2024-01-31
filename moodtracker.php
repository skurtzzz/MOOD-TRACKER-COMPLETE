<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {

    if (isset($_POST["event-feeling"], $_POST["event-time-from"], $_POST["event-time-to"], $_POST["event-date"])) {
        // Database connection parameters
        $servername = "localhost";
        $username = "root";
        $password = "";
        $dbname = "diary";

        // Create connection
        $conn = new mysqli($servername, $username, $password, $dbname);

        // Check connection
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }

        // Extract form data
        $eventFeeling = $_POST["event-feeling"];
        $eventTimeFrom = $_POST["event-time-from"];
        $eventTimeTo = $_POST["event-time-to"];
        $formattedDate = $_POST["event-date"];

        // Validate the form data (you may add more validation)
        if (empty($eventFeeling) || empty($eventTimeFrom) || empty($eventTimeTo) || empty($formattedDate)) {
            echo "Error: Please fill in all the fields.";
            exit;
        }

        // Prepare and execute SQL query to insert data into the database
        $sql = $conn->prepare("INSERT INTO mood_events (Mood_Date, Mood_Start, Mood_End, Mood_Type) VALUES (?, ?, ?, ?)");
        $sql->bind_param("ssss", $formattedDate, $eventTimeFrom, $eventTimeTo, $eventFeeling);

        if ($sql->execute()) {
            echo "Event added successfully!";
            echo "Selected Mood: " . $eventFeeling;
        } else {
            echo "Error: " . $sql->error;
        }

        $sql->close();
        $conn->close();
    }
}
?>
