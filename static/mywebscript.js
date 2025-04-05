let RunSentimentAnalysis = () => {
    let textToAnalyze = document.getElementById("textToAnalyze").value;

    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            try {
                // Parse the JSON response from the API
                let emotions = JSON.parse(xhttp.responseText);

                // Calculate negativity as the sum of negative emotions
                let negativity = (emotions.anger || 0) + 
                                 (emotions.disgust || 0) + 
                                 (emotions.fear || 0) + 
                                 (emotions.sadness || 0);

                // Display negativity score
                document.getElementById("system_response").innerHTML =
                    "Negativity Score: " + negativity.toFixed(2);
            } catch (e) {
                // Handle parsing errors or unexpected response formats
                document.getElementById("system_response").innerHTML =
                    "Error parsing response: " + e.message;
            }
        }
    };

    // Encode text and send the GET request
    xhttp.open("GET", "emotionDetector?textToAnalyze=" + encodeURIComponent(textToAnalyze), true);
    xhttp.send();
}
