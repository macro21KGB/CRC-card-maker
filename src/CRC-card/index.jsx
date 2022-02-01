import './main.css'
import Box from '../Box/index';
import InputBox from '../InputBox';
import { useState } from 'react';
import { saveToLocalStorage } from '../utils';
import { nanoid } from 'nanoid';


/**
 * 
 * @param {{id: string, name: string, resp: string[], collab: string[], deleteCard:Function}} params 
 * @returns 
 */
const CRCCard = ({ id, name = "Default Class Name", resp, collab, deleteCard }) => {

  const [listOfResponsabilites, setListOfResponsabilites] = useState(resp);
  const [listOfCollaborators, setListOfCollaborators] = useState(collab);


  /**
   * 
   * @param {string} message 
   * @param {boolean} toResponsabilita 
   */
  const saveCard = (message, toResponsabilita) => {
    if (toResponsabilita)
      setListOfResponsabilites([...listOfResponsabilites, message]);
    else
      setListOfCollaborators([...listOfCollaborators, message]);

    saveToLocalStorage('CRC-card', {
      id: id,
      name,
      resp: listOfResponsabilites,
      collab: listOfCollaborators
    });
  }

  /**
   * 
   * @param {number} id 
   */


  return (
    <div className="CRCCard">
      <div onClick={() => deleteCard(id)} className='deleteBtn'>X</div>
      <h5>{name}</h5>
      <div className="sections">
        <div className="responsabilita">
          {listOfResponsabilites.map((item, index) => {
            return (<Box key={index} message={item} />)
          })
          }
          <InputBox saveCard={saveCard} toResponsabilites={true} />
        </div>
        <div className="collaboratori">
          {listOfCollaborators.map((item, index) => {
            return (<Box key={index} message={item} />)
          })
          }
          <InputBox saveCard={saveCard} toResponsabilites={false} />
        </div>
      </div>
    </div>
  )

}

export default CRCCard;
