import { useEffect, useRef, useState } from 'react';
import './main.css';

const Modal = ({ originalValue, closeModal, updateValue, deleteBox }) => {

    const [value, setValue] = useState(originalValue);
    const tarea = useRef(null);


    const handleSave = () => {
        updateValue(value);
        closeModal();
    }

    const handleDelete = () => {
        deleteBox();
        console.log("DELETE MODAL")
        closeModal();
    }

    return (
        <div className="modal">
            <textarea ref={tarea} value={value} onChange={(e) => { setValue(e.target.value) }} cols={40} rows={10} ></textarea>
            <button className='saveBtn' onClick={handleSave}>Save</button>
            <button className='deleteBtnItem' onClick={handleDelete}>Delete Item</button>
        </div>
    );

}
export default Modal;