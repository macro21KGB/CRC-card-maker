import { useEffect, useState } from 'react';
import './App.css'
import CRCCard from './CRC-card'
import { getFromLocalStorage, saveToLocalStorage, deleteFromLocalStorage } from './utils';
import { nanoid } from 'nanoid';
import evoLog from 'evolog';

function App() {


  const [cards, setCards] = useState([]);

  useEffect(() => {
    const cardsFromLocalStorage = getFromLocalStorage('CRC-cards');
    setCards(cardsFromLocalStorage);
    evoLog("SETUP")
    evoLog(JSON.stringify(cardsFromLocalStorage))
  }, []);
   

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
    saveToLocalStorage('CRC-cards', cards);
  }

  const deleteCard = (id) => {
    const newCards = cards.filter(card => card.id !== id);
    evoLog("DELETE")
    deleteFromLocalStorage('CRC-card', id);
    setCards(newCards);
    evoLog("\n\n\nDeleted card: " + id);
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
