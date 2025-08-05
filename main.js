const form = document.querySelector("form");
const resultDiv = document.getElementById("result");
const loading = document.getElementById("loading");
const success = document.getElementById("success");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  const name = formData.get("name");
  const age = formData.get("age");
  const interest = formData.get("interest");
  const type = formData.get("type"); // job or business

  // Show loading animation
  resultDiv.innerHTML = "";
  success.style.display = "none";
  loading.style.display = "block";

  try {
    const response = await fetch("https://hubi-proxy.onrender.com/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        age,
        interest,
        type
      })
    });

    const data = await response.json();
    loading.style.display = "none";
    success.style.display = "block";
    resultDiv.innerHTML = `<p>${data.reply}</p>`;
  } catch (error) {
    loading.style.display = "none";
    resultDiv.innerHTML = `<p>❌ Error getting response from AI. Please try again.</p>`;
    console.error("Error:", error);
  }
});
