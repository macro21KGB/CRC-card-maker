import { useEffect, useState } from 'react';
import './App.css'
import CRCCard from './Components/CRC-card/index'
import { nanoid } from 'nanoid';
import evoLog from 'evolog'
import useStore from './store';

function App() {


  const cards = useStore(state => state.cards);
  const addNewCards = useStore(state => state.addCards);
  const getCardsFromLocalStorage = useStore(state => state.getCardsFromLocalStorage);

  const [showImportWindow, setShowImportWindow] = useState(false);
  const [importJSON, setImportJSON] = useState('');


  useEffect(() => {
    getCardsFromLocalStorage();
  }, []);


  const getJSONDataFromLocalStorage = () => {
    // get the data and paste it into the clipboard
    const data = JSON.stringify(cards);

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
    try {

      const data = JSON.parse(importJSON);
      if (typeof data !== "object") throw new Error("JSON is not an array");
      if (!data.collab || !data.resp) throw new Error('Invalid JSON');

      addNewCards(data);
    }
    catch (e) {
      evoLog(e, {
        bandColor: 'red',
        backgroundColor: 'black',
        duration: 5000
      });
    }
  }
  const addCard = () => {
    addNewCards([
      ...cards,
      {
        id: nanoid(10),
        name: 'Default',
        resp: [],
        collab: []
      }
    ])
  }

  return (
    <div className="App">
      <div className="buttons">
        <button className='addCard' onClick={addCard}>Add a card</button>
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
      <br />
      <br />
      <div className='cards'>
        {cards.map((card, index) => {
          return (<CRCCard key={card.id} index={index} card={card} />)
        })}
      </div>
    </div>
  )
}

export default App
