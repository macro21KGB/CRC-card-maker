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
  }, []);


  const addCard = () => {
    setCards([
      ...cards,
      {
        id: nanoid(10),
        name: 'Default',
        resp: [],
        collab: []
      }
    ]);
    saveToLocalStorage('CRC-cards', cards);
  }

  const deleteCard = (id) => {
    const newCards = cards.filter(card => card.id !== id);
    deleteFromLocalStorage('CRC-cards', id);
    setCards(newCards);
  }

  const saveName = (name, id) => {
    const index = cards.findIndex(card => card.id === id);
    const newCards = [...cards];

    newCards[index].name = name;

    setCards(newCards);
    saveToLocalStorage('CRC-cards', newCards);
  }

  const saveCard = (message, toResponsabilita, id) => {
    const index = cards.findIndex(card => card.id === id);
    const newCards = [...cards];

    if (toResponsabilita) {
      newCards[index].resp = [...newCards[index].resp, message];
    }
    else {
      newCards[index].collab = [...newCards[index].collab, message];
    }


    setCards(newCards);
    saveToLocalStorage('CRC-cards', newCards);

  }

  return (
    <div className="App">
      <button className='addCard' onClick={addCard}>AddCard</button>
      <div className='cards'>
        {cards.map((card, index) => {
          return (<CRCCard key={index} name={card.name} resp={card.resp} id={card.id} collab={card.collab} deleteCard={deleteCard} saveCard={saveCard} saveName={saveName} />)
        })}

      </div>
    </div>
  )
}

export default App
