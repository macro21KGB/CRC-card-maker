import { useState } from 'react';
import './App.css'
import CRCCard from './CRC-card'
import { getFromLocalStorage, saveToLocalStorage, deleteFromLocalStorage } from './utils';
import { nanoid } from 'nanoid';

function App() {


  const [cards, setCards] = useState(getFromLocalStorage('CRC-card') || []);

  const addCard = () => {
    setCards([
      ...cards,
      {
        id: nanoid(),
        name: 'Default',
        resp: [],
        collab: []
      }
    ]);
    saveToLocalStorage('CRC-card', cards);
  }

  const deleteCard = (id) => {
    const newCards = cards.filter(card => card.id !== id);
    console.log(id);
    deleteFromLocalStorage('CRC-card', id);
    setCards(newCards);
    console.log("DELETE")
  }

  return (
    <div className="App">
      <button onClick={addCard}>AddCard</button>
      {cards.map((card, index) => {
        return (<CRCCard key={index} {...card} deleteCard={deleteCard} />)
      })}
    </div>
  )
}

export default App
