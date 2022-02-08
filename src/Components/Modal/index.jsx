import { useState } from 'react';
import useStore from '../../store';
import './main.css';


const Modal = ({ originalValue, closeModal, index, idCard, toResponsabilita, deleteFieldLocally }) => {

    const [value, setValue] = useState(originalValue);
    const updateField = useStore(state => state.updateField);
    const deleteField = useStore(state => state.deleteField);


    const handleSave = () => {
        updateField(value, idCard, index, toResponsabilita);
        closeModal(value);
    }

    const handleDelete = () => {
        deleteField(idCard, index, toResponsabilita);
        deleteFieldLocally(index);
        closeModal();
    }

    return (
        <div className="modal">
            <textarea value={value} onChange={(e) => { setValue(e.target.value) }} cols={40} rows={10} ></textarea>
            <button className='saveBtn' onClick={handleSave}>Save</button>
            <button className='deleteBtnItem' onClick={handleDelete}>Delete Item</button>
        </div>
    );

}
export default Modal;