import React from 'react';
import Grid from './components/grid/Grid.js';
import './App.scss';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <span>B.H. Custom Logo</span>
        <div className="background"></div>
        <div className="bar">
            <h1 className="header">B.H. Custom</h1>
        </div>
      </header>

      <p className="description">
        Lorem ipsum dolor amet tote bag banjo vegan yuccie iPhone +1 vinyl sriracha. Taxidermy mlkshk whatever fashion axe deep v meditation plaid. Beard trust fund paleo ugh irony. Kickstarter slow-carb +1, tilde cold-pressed post-ironic drinking vinegar iceland.
      </p>

      <Grid />
    </div>
  );
}

export default App;
