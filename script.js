
document.addEventListener("DOMContentLoaded", () => {
  const routeSelector = document.getElementById("routeSelector");
  const stepsContainer = document.getElementById("stepsContainer");

  function loadProgress(route) {
    const data = localStorage.getItem("zeno_steps_" + route);
    return data ? JSON.parse(data) : [];
  }

  function saveProgress(route, completedSteps) {
    localStorage.setItem("zeno_steps_" + route, JSON.stringify(completedSteps));
  }

  function renderSteps(route, steps) {
    const completedSteps = loadProgress(route);
    stepsContainer.innerHTML = "";

    steps.forEach((step, index) => {
      const div = document.createElement("div");
      div.className = "step";
      div.textContent = step;
      if (completedSteps.includes(index)) div.classList.add("completed");

      div.addEventListener("click", () => {
        div.classList.toggle("completed");
        const newCompleted = [...stepsContainer.children]
          .map((el, idx) => el.classList.contains("completed") ? idx : -1)
          .filter(idx => idx !== -1);
        saveProgress(route, newCompleted);
      });

      stepsContainer.appendChild(div);
    });
  }

  fetch("data.json")
    .then(res => res.json())
    .then(data => {
      Object.keys(data).forEach(route => {
        const option = document.createElement("option");
        option.value = route;
        option.textContent = route;
        routeSelector.appendChild(option);
      });

      routeSelector.addEventListener("change", () => {
        const selectedRoute = routeSelector.value;
        renderSteps(selectedRoute, data[selectedRoute]);
      });

      routeSelector.dispatchEvent(new Event("change"));
    });
});
