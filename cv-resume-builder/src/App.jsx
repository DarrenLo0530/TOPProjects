import React from 'react';
import './App.css';
import OtherInfo from './components/OtherInfo';
import PersonalInfo from './components/PersonalInfo';

function App() {
  return (
    <div className="content">
      <header className="site-header">
        <h1>CV Builder</h1>
      </header>
      <div id="resume-container">
        <section id="resume">
          <div className="left-bar">
            <PersonalInfo />
          </div>
          <div>
            <OtherInfo />
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;
