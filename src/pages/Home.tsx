import React from 'react';
import { act1 } from '../data/acts';

const Home = () => {
  return (
    <div style={{ display: 'flex' }}>
      <aside className="sidebar">
        <h1>ZenoExileLeveling</h1>
        <nav>
          <ul>
            <li><a href="#">Ato 1</a></li>
            <li><a href="#">Ato 2</a></li>
          </ul>
        </nav>
      </aside>
      <main className="content">
        <h2>Ato 1</h2>
        {act1.map((zone, index) => (
          <div key={index} className="zone">
            <h3>{zone.nome}</h3>
            <p><strong>Objetivo:</strong> {zone.objetivo}</p>
          </div>
        ))}
      </main>
    </div>
  );
};

export default Home;
