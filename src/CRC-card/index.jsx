import './main.css'
import Box from '../Box/index';
import InputBox from '../InputBox';
import { useEffect, useState } from 'react';
import { saveToLocalStorage } from '../utils';
import evolog from 'evolog';


/**
 * 
 * @param {{id: string, name: string, resp: string[], collab: string[], deleteCard:Function, saveCard: Function, deleteBox:Function}} params 
 * @returns 
 */
const CRCCard = ({ id, name = "Default Class Name", resp, collab, deleteCard, saveCard, saveName, updateField, deleteBox }) => {

  const [listOfResponsabilites, setListOfResponsabilites] = useState([]);
  const [listOfCollaborators, setListOfCollaborators] = useState([]);
  const [nameOfTheClass, setNameOfTheClass] = useState(name);

  /**
   * 
   * @param {string} message 
   * @param {boolean} toResponsabilita 
   */

  useEffect(() => {
    setListOfResponsabilites(resp || []);
    setListOfCollaborators(collab || []);

  }, []);


  const handleSave = (message, toResponsabilita) => {
    saveCard(message, toResponsabilita, id);
    console.log("SAVING");

    if (toResponsabilita == true) {
      setListOfResponsabilites([...listOfResponsabilites, message]);
    }
    else {
      setListOfCollaborators([...listOfCollaborators, message]);
    }
  }

  const handleName = (name) => {
    saveName(name, id);
    setNameOfTheClass(name);
  }

  const handleUpdate = (value, index, toResponsabilita) => {
    updateField(value, index, toResponsabilita, id);
  }

  const handleBoxDelete = (INindex, toResponsabilita) => {
    if (toResponsabilita) {
      setListOfResponsabilites(listOfResponsabilites.filter((_, index) => index !== INindex));
    }
    else {
      setListOfCollaborators(listOfCollaborators.filter((_, index) => index !== INindex));
    }

    deleteBox(INindex, toResponsabilita, id);

  }


  return (
    <div className="CRCCard">
      <div onClick={() => deleteCard(id)} className='deleteBtn'>X</div>
      <input className='nameOfTheClass' type="text" value={nameOfTheClass} onChange={(e) => { handleName(e.target.value) }} />
      <div className="sections">
        <div className="responsabilita">
          {
            listOfResponsabilites.map((item, index) => {
              return (<Box key={index} message={item} index={index} updateBox={handleUpdate} deleteBox={handleBoxDelete} toResponsabilita={true} />)
            })
          }
          <InputBox saveCard={handleSave} toResponsabilites={true} />
        </div>
        <div className="collaboratori">
          {listOfCollaborators.map((item, index) => {
            return (<Box key={index} message={item} index={index} updateBox={handleUpdate} deleteBox={handleBoxDelete} toResponsabilita={false} />)
          })
          }
          <InputBox saveCard={handleSave} toResponsabilites={false} />
        </div>
      </div>
    </div>
  )

}

export default CRCCard;
