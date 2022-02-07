import { useEffect, useState } from 'react';
import './App.css'
import CRCCard from './CRC-card'
import { getFromLocalStorage, saveToLocalStorage, deleteFromLocalStorage } from './utils';
import { nanoid } from 'nanoid';
import evoLog from 'evolog';

function App() {


  const [cards, setCards] = useState([]);
  const [showImportWindow, setShowImportWindow] = useState(false);
  const [importJSON, setImportJSON] = useState('');


  useEffect(() => {
    const cardsFromLocalStorage = getFromLocalStorage('CRC-cards');
    setCards(cardsFromLocalStorage);
  }, []);

  const getJSONDataFromLocalStorage = () => {
    // get the data and paste it into the clipboard
    const data = JSON.stringify(cards);
    evoLog(data, { duration: 10000 });

    const date = new Date();
    const [hour, minutes, seconds] = [date.getHours(), date.getMinutes(), date.getSeconds()];

    // create a temporary element
    const tmp = document.createElement('a');
    tmp.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(data));
    tmp.setAttribute('download', `data-${hour}:${minutes}:${seconds}.json`);
    tmp.click();

    tmp.remove();

  }

  const importJSONDataToLocalStorage = () => {
    setShowImportWindow(false);
    const data = JSON.parse(importJSON);
    saveToLocalStorage('CRC-cards', data);
    setCards(data);
    window.location.reload();
  }


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





  const updateField = (value, INindex, toResponsabilita, id) => {

    console.log(value, INindex, toResponsabilita, id);

    const index = cards.findIndex(card => card.id === id);
    const newCards = [...cards];

    if (toResponsabilita === true) {
      newCards[index].resp[INindex] = value;
    }
    else {
      newCards[index].collab[INindex] = value;
    }

    setCards(newCards);
    saveToLocalStorage('CRC-cards', newCards);
  }





  const deleteBox = (INindex, toResponsabilita, id) => {
    const index = cards.findIndex(card => card.id === id);
    const newCards = [...cards];
    // newCards[index][toResponsabilita ? 'resp' : 'collab'].splice(INindex, 1);
    newCards[index][toResponsabilita ? 'resp' : 'collab'].splice(INindex, 1);


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
      <div className="buttons">
        <button className='addCard' onClick={addCard}>AddCard</button>
        <button className='exportCards' onClick={getJSONDataFromLocalStorage}>EXPORT</button>
        <button className='exportCards' onClick={() => { setShowImportWindow(!showImportWindow) }}>IMPORT</button>
        {showImportWindow && (

          <div className='importWindow'>
            <textarea cols={40} rows={10} value={importJSON} onChange={(e) => setImportJSON(e.target.value)}></textarea>
            <button className='importBtn' onClick={importJSONDataToLocalStorage}>Confirm</button>
          </div>
        )
        }
      </div>
      <div className='cards'>
        {cards.map((card, index) => {
          return (<CRCCard key={index} name={card.name} resp={card.resp} id={card.id} collab={card.collab} deleteCard={deleteCard} saveCard={saveCard} updateField={updateField} saveName={saveName} deleteBox={deleteBox} />)
        })}

      </div>
    </div>
  )
}

export default App
