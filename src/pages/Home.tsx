import React from 'react';
import { act1, act2, act3, act4, act5, act6 } from '../data/acts';

const acts = [
  { titulo: 'Ato 1', dados: act1 },
  { titulo: 'Ato 2', dados: act2 },
  { titulo: 'Ato 3', dados: act3 },
  { titulo: 'Ato 4', dados: act4 },
  { titulo: 'Ato 5', dados: act5 },
  { titulo: 'Ato 6', dados: act6 }
];

const Home = () => {
  return (
    <div style={{ display: 'flex' }}>
      <aside className="sidebar">
        <h1>ZenoExileLeveling</h1>
        <nav>
          <ul>
            {acts.map((act, index) => (
              <li key={index}><a href={`#ato${index+1}`}>{act.titulo}</a></li>
            ))}
          </ul>
        </nav>
      </aside>
      <main className="content">
        {acts.map((act, index) => (
          <section key={index} id={`ato${index+1}`}>
            <h2>{act.titulo}</h2>
            {act.dados.map((zone, idx) => (
              <div key={idx} className="zone">
                <h3>{zone.nome}</h3>
                <p><strong>Objetivo:</strong> {zone.objetivo}</p>
              </div>
            ))}
          </section>
        ))}
      </main>
    </div>
  );
};

export default Home;
