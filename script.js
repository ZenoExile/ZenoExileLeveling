async function loadData() {
  const res = await fetch('data/acts.json');
  const acts = await res.json();
  renderActs(acts);
}

function renderActs(acts) {
  const container = document.getElementById('acts-container');
  container.innerHTML = '';

  acts.forEach((act, actIndex) => {
    const actDiv = document.createElement('div');
    actDiv.className = 'act';

    const title = document.createElement('h3');
    title.textContent = `Ato ${actIndex + 1}`;
    actDiv.appendChild(title);

    act.objectives.forEach((obj, objIndex) => {
      const taskDiv = document.createElement('div');
      taskDiv.className = 'task';

      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.id = `act${actIndex}-obj${objIndex}`;
      checkbox.checked = isChecked(checkbox.id);
      checkbox.addEventListener('change', () => {
        toggleTask(checkbox.id, checkbox.checked);
        taskDiv.classList.toggle('completed', checkbox.checked);
      });

      const label = document.createElement('label');
      label.htmlFor = checkbox.id;
      label.textContent = obj;

      if (checkbox.checked) {
        taskDiv.classList.add('completed');
      }

      taskDiv.appendChild(checkbox);
      taskDiv.appendChild(label);
      actDiv.appendChild(taskDiv);
    });

    container.appendChild(actDiv);
  });
}

function isChecked(id) {
  return localStorage.getItem(id) === 'true';
}

function toggleTask(id, checked) {
  localStorage.setItem(id, checked);
}

loadData();