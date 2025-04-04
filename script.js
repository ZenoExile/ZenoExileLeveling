# Corrigindo erro: reescrever o conteúdo atualizado diretamente

updated_script = """// script.js

const acts = {
  "Ato 1": [
    "Mate o Miller Inchado e entre na cidade",
    "Entregue as missões e vá para Clearfell",
    "Mate Beira do Rotten Pack. Ela está ao norte/nordeste do ponto de passagem. Recompensa: 10% Cold Res.",
    "Encontre a entrada para The Greilwood",
    "Complete a missão com NPC da missão. Geralmente central.",
    "Encontre a entrada para The Grim Tangle, pegue o ponto de passagem e volte para The Greilwood",
    "Encontre a entrada para The Red Vale e siga em frente.",
    "Encontre os três obeliscos e pegue os três itens de missão.",
    "Depois de pegar o terceiro, vá para a cidade e fale com Renly para adquirir os Runed Spikes. Vá para The Greilwood.",
    "Invoque e fale com Una.",
    "Estafeie a árvore com seus espinhos rúnicos e depois fale com Una.",
    "Volte para a cidade, fale com os NPCs e depois siga para The Grim Tangle pelo ponto de passagem para The Greilwood.",
    "Encontre a entrada para o Cemetery of The Eternals. O chefe Druid pode ser pulado.",
    "Encontre o Mausoléu do Pretor e mate o chefe lá.",
    "Encontre o Túmulo do Consorte e mate o chefe lá dentro.",
    "Fale com Lachlan, abra o portão e mate-o. 😈",
    "Entre em Campos de Caça",
    "Encontre e mate The Crowbell. Recompensa: dois pontos de habilidade.",
    "Encontre e entre em Ogham Farmlands.",
    "Encontre o alcaide de Una. Geralmente no redor do centro da zona. Recompensa: 2 pontos de habilidade.",
    "Encontre e mate Vargl The Feral Mutt no Crop Circle. Deixa cair uma gema de habilidade de nível 4.",
    "Vá entre os campos paralelos para Ogham Village e WP de volta para Hunting Grounds.",
    "Encontre e insira Freython.",
    "Faça todos os 4 trials, matando The King in the Mists no final. Recompensa: 30 espíritos.",
    "TP de volta à cidade e ponto de referência para Ogham Village.",
    "Se for seu primeiro personagem de liga: Encontre ferramentas de ferraria.",
    "Encontre e mate o Carrasco",
    "Vá para as muralhas da mansão",
    "Encontre a entrada para Ogham Manor. Ela sempre fica na direção oposta do ponto de passagem depois que você entra na zona.",
    "Encontre e mate Candlemass, o Rito Vivo",
    "Encontre o elevador e derrote o chefe, vá até ele e volte para a cidade",
    "Se for seu primeiro personagem de liga: Fale com Renly para entregar as ferramentas de ferraria",
    "Fale com o Encapuzado para ir para o ato 2"
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
"""

# Gravar script atualizado
with open(os.path.join(base_path, "script.js"), "w") as f:
    f.write(updated_script)

# Recriar o zip
zip_path_final = "/mnt/data/zenoexile_checklist_site_ato1_expandido.zip"
with ZipFile(zip_path_final, "w") as zipf:
    for root, _, files in os.walk(base_path):
        for file in files:
            filepath = os.path.join(root, file)
            zipf.write(filepath, os.path.relpath(filepath, base_path))

zip_path_final
