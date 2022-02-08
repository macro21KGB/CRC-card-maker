import './main.css'
import Box from '../Box/index';
import InputBox from '../InputBox/index';
import { useEffect, useRef, useState } from 'react';
import useStore from '../../store';

/**
 * 
 * @param {{ card:{id:string, collab: string[], resp:string[], name:string} , deleteCard:Function, }} params 
 * @returns 
 */
const CRCCard = ({ card, index }) => {

  const [nameOfTheClass, setNameOfTheClass] = useState(card.name);
  const [forceUpdate, setForceUpdate] = useState(false);
  const cardRef = useRef(null);

  const addNewFieldToCard = useStore(state => state.addNewFieldToCard);
  const updateName = useStore(state => state.updateName);
  const deleteCard = useStore(state => state.deleteCard);

  const handleSave = (message, toResponsabilita) => {
    //Storage
    addNewFieldToCard(card.id, message, toResponsabilita);
    setForceUpdate(!forceUpdate);
  }


  useEffect(() => {
    updateName(nameOfTheClass, card.id);
  }, [nameOfTheClass]);

  const handleDeleteCard = () => {

    deleteCard(card.id);
  }


  return (
    <div ref={cardRef} className="CRCCard">
      <div onClick={handleDeleteCard} className='deleteBtn'>X</div>
      <input className='nameOfTheClass' type="text" value={nameOfTheClass} onChange={(e) => { setNameOfTheClass(e.target.value) }} />
      <div className="sections">
        <div className="responsabilita">
          {
            card.resp.map((item, index) => {
              return (<Box key={index} message={item} index={index} idCard={card.id} toResponsabilita={true} />)
            })
          }
          <InputBox saveCard={handleSave} toResponsabilites={true} />
        </div>
        <div className="collaboratori">
          {card.collab.map((item, index) => {
            return (<Box key={index} message={item} index={index} idCard={card.id} toResponsabilita={false} deleteFieldLocally={(indexOfField) => deleteFieldLocally(indexOfField, false)} />)
          })
          }
          <InputBox saveCard={handleSave} toResponsabilites={false} />
        </div>
      </div>
    </div>
  )

}

export default CRCCard;
