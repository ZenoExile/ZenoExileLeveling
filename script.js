// script.js

const objectives = [
  "Fale com Neyam para receber sua arma",
  "Mate os Corrompidos na Praia",
  "Derrote o chefe da área costeira",
  "Retorne para Neyam",
  "Acesse o Campo do Caçador",
  "Complete a missão da Caverna Oculta",
  "Derrote o mini-chefe do Ato 1",
  "Chegue ao acampamento do Ato 2"
];

const checklist = document.getElementById('checklist');

// Carrega do localStorage
const savedState = JSON.parse(localStorage.getItem('poe2_checklist_state')) || {};

objectives.forEach((text, index) => {
  const li = document.createElement('li');
  li.textContent = text;
  if (savedState[index]) li.classList.add('checked');

  li.addEventListener('click', () => {
    li.classList.toggle('checked');
    savedState[index] = li.classList.contains('checked');
    localStorage.setItem('poe2_checklist_state', JSON.stringify(savedState));
  });

  checklist.appendChild(li);
});
