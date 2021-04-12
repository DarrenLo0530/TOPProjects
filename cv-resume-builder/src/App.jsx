import React from 'react';
import './App.css';
import OtherInfo from './components/OtherInfo';
import PersonalInfo from './components/PersonalInfo';

function App() {
  return (
    <div className="content">
      <header className="site-header">
        <a href="/"><h1>CV Builder</h1></a>
      </header>
      <div id="resume-width">
        <div id="resume-container">
          <section id="resume">
            <div className="left">
              <PersonalInfo />
            </div>
            <div className="right">
              <OtherInfo />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default App;
