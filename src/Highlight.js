import React from 'react';
import './App.css';

const App = ({highlights,string}) => {
  return (
    <div className="luminatedText">
      {highlights.map(el => {
        return(<span style={{backgroundColor: el.color}}>{string.substring(el.minIndex, el.maxIndex)}</span>)
      })}
    </div>
  );
}

export default App;
