document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".operation-btn").forEach(button => {
        button.addEventListener("click", () => {
            let num1 = parseFloat(document.getElementById("num1").value);
            let num2 = parseFloat(document.getElementById("num2").value);
            let operation = button.getAttribute("data-op");

            if (isNaN(num1) || isNaN(num2)) {
                document.getElementById("result").innerText = "Please enter valid numbers";
                return;
            }

            fetch("/calculate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ num1, num2, operation })
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Server error: " + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                document.getElementById("result").innerText = data.result; 
            })
            .catch(error => {
                console.error("Error:", error);
                document.getElementById("result").innerText = "Error processing request";
            });
        });
    });
});
