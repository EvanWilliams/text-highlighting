import React from 'react';
import Highlight from './Highlight'
import './App.css';


let string = 'You will deliver new technology with an adorable puppy. Perfect!'
let highlights = [
  {
    startOffset: 4,
    endOffset: 20,
    color:'#d9f593',
    priority: 0,
  },{
    startOffset: 17,
    endOffset: 31,
    color:'#e8e8e8',
    priority: 1,
  },{
    startOffset: 38,
    endOffset: 55,
    color:'#bbd5ec',
    priority: 2,
  },{
    startOffset: 41,
    endOffset: 48,
    color:'#d9f593',
    priority: 0,
  },{
    startOffset: 56,
    endOffset: 63,
    color:'#ECCF98',
    priority: 3,
  }
];

let colorMap = {
  100:'#ffffff'//no highlight
  //more could be predefined
}

let highlightArray = initializeList(string.length);

function initializeList(stringLength){
  let array = []
  for( let i = 0; i<stringLength; i++){
    array.push(100); //100 signifies emptiness
  }
  return array;
}

function ApplyHighlights(highlights) {
  //sort list of highlights for mock API response
  highlights =  highlights.sort((a, b) => a.priority - b.priority); 

  highlights.forEach( el => {
    addHighlightLayer(el.startOffset,el.endOffset,el.priority,el.color);
  })

  function addHighlightLayer(min,max,priority,color){
    if(!colorMap[priority]){
      colorMap[priority] = color;
      //colorMap to maintain a list of colors with coresponding priorities
    }
    for( let i = min; i <= max; i++ ){
      if( highlightArray[i] > priority){
        highlightArray[i] = priority;
      }
    }
  }

  let result = []

  function createChunks(array){
    let minIndex;
    let priority;
    for (let i = 0; i < array.length; i++){
      if(i === 0){
        minIndex = i;
        priority = array[i];
      }
      else if(priority !== array[i]){
        //found a new priority
        result.push({"minIndex":minIndex,"maxIndex":i-1,"priority":priority, "color": colorMap[priority]});
        //push object using minIndex,and the i iterator then set minIndex and priority for new substring at same index
        minIndex = i-1;
        priority = array[i];
      }
    }
    //Last substring is implied
    result.push({"minIndex":minIndex,"maxIndex":string.length,"priority":priority, "color": colorMap[priority]});
    return result;
  }

  return createChunks(highlightArray);
} 

function App() {
  return (
    <div className="App">
      <Highlight highlights={ApplyHighlights(highlights)} string={string}/>
    </div>
  );
}

export default App;
