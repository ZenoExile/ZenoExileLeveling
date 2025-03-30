
document.addEventListener("DOMContentLoaded", () => {
    const selector = document.getElementById("routeSelector");
    const listContainer = document.getElementById("levelingList");

    const saveProgress = (route, completed) => {
        localStorage.setItem("zeno_progress_" + route, JSON.stringify(completed));
    };

    const loadProgress = (route) => {
        const saved = localStorage.getItem("zeno_progress_" + route);
        return saved ? JSON.parse(saved) : [];
    };

    fetch("data.json")
        .then(res => res.json())
        .then(data => {
            Object.keys(data).forEach(route => {
                const option = document.createElement("option");
                option.value = route;
                option.textContent = route;
                selector.appendChild(option);
            });

            selector.addEventListener("change", () => {
                const route = selector.value;
                const steps = data[route];
                const completedSteps = loadProgress(route);

                listContainer.innerHTML = "";
                steps.forEach((step, index) => {
                    const div = document.createElement("div");
                    div.className = "step";
                    if (completedSteps.includes(index)) div.classList.add("completed");
                    div.textContent = step;
                    div.addEventListener("click", () => {
                        div.classList.toggle("completed");
                        const updatedCompleted = [...listContainer.querySelectorAll(".step.completed")].map((el, i) => [...listContainer.children].indexOf(el));
                        saveProgress(route, updatedCompleted);
                    });
                    listContainer.appendChild(div);
                });
            });

            // Trigger change to load first route
            selector.dispatchEvent(new Event("change"));
        });
});
