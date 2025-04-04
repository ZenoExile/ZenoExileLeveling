// script.js

const acts = {
  "Ato 1": [
    "Fale com Neyam para receber sua arma",
    "Mate os Corrompidos na Praia",
    "Derrote o chefe da área costeira",
    "Retorne para Neyam",
    "Acesse o Campo do Caçador",
    "Complete a missão da Caverna Oculta",
    "Derrote o mini-chefe do Ato 1",
    "Chegue ao acampamento do Ato 2"
  ],
  "Ato 2": [
    "Receba missão com Einar",
    "Complete o Ritual da Fera",
    "Derrote o chefe do Cânion",
    "Liberte a passagem para a floresta"
  ],
  "Ato 3": [
    "Chegue ao Templo do Sol",
    "Ajude Helena na cripta",
    "Destrave o teleporte central",
    "Derrote o chefe solar"
  ],
  "Ato 4": [
    "Explore os Pântanos",
    "Recupere o artefato sagrado",
    "Libere a passagem subterrânea",
    "Derrote o chefe das sombras"
  ],
  "Ato 5": [
    "Fale com o comandante da resistência",
    "Destrua os totens corruptos",
    "Sobreviva à emboscada",
    "Derrote o chefe do desfiladeiro"
  ],
  "Ato 6": [
    "Reconecte os Waypoints",
    "Purifique os santuários",
    "Derrote o Arconte Final",
    "Complete a jornada da campanha"
  ]
};

const checklistContainer = document.getElementById('checklist');
checklistContainer.innerHTML = "";

Object.entries(acts).forEach(([act, objectives]) => {
  const section = document.createElement('section');
  const h2 = document.createElement('h2');
  h2.textContent = act;
  section.appendChild(h2);

  const ul = document.createElement('ul');
  ul.className = 'checklist';

  const savedState = JSON.parse(localStorage.getItem('poe2_checklist_state_' + act)) || {};

  objectives.forEach((text, index) => {
    const li = document.createElement('li');
    li.textContent = text;
    if (savedState[index]) li.classList.add('checked');

    li.addEventListener('click', () => {
      li.classList.toggle('checked');
      savedState[index] = li.classList.contains('checked');
      localStorage.setItem('poe2_checklist_state_' + act, JSON.stringify(savedState));
    });

    ul.appendChild(li);
  });

  section.appendChild(ul);
  checklistContainer.appendChild(section);
});
