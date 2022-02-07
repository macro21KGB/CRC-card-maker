import { useState } from 'react';
import './main.css';
import Modal from '../Modal/index';


/**
 * 
 * @param {{message:string,index:number, updateBox:Function,deleteBox:Function,toResponsabilita:boolean}} params 
 * @returns 
 */
const Box = ({ message, index, updateBox, deleteBox, toResponsabilita }) => {

    const [messageBox, setMessageBox] = useState(message);
    const [showModal, setShowModal] = useState(false);

    const handleChange = (updatedValue) => {
        setShowModal(!showModal)
    }

    const updateValue = (value) => {
        updateBox(value, index, toResponsabilita);
        setMessageBox(value);
    }

    const handleDeleteBox = () => {
        console.log("DELETE BOX")
        deleteBox(index, toResponsabilita);
    }

    const closeModal = () => setShowModal(false);

    return (
        <>
            <div className="box" onClick={handleChange}>
                {messageBox}
            </div>
            {showModal && <Modal originalValue={messageBox} closeModal={closeModal} updateValue={updateValue} deleteBox={handleDeleteBox} />}
        </>
    );
}

export default Box;