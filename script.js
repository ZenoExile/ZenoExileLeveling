
document.addEventListener("DOMContentLoaded", () => {
    fetch("data.json")
        .then(response => response.json())
        .then(data => {
            const selector = document.getElementById("campaignSelector");
            const contentDiv = document.getElementById("levelingContent");

            Object.keys(data).forEach(campaign => {
                const option = document.createElement("option");
                option.value = campaign;
                option.textContent = campaign;
                selector.appendChild(option);
            });

            selector.addEventListener("change", () => {
                const selected = selector.value;
                const steps = data[selected];
                contentDiv.innerHTML = steps.map(step => `<p>${step}</p>`).join("");
            });
        });
});
