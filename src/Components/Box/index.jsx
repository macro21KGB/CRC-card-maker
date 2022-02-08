import { useRef, useState } from 'react';
import './main.css';
import Modal from '../Modal/index';
import useStore from '../../store';


/**
 * 
 * @param {{message:string,index:number, idCard:string, toResponsabilita:boolean, deleteFieldLocally:Function}} params 
 * @returns 
 */
const Box = ({ message, index, idCard, toResponsabilita }) => {


    const [showModal, setShowModal] = useState(false);
    const [value, setValue] = useState(message);
    const box = useRef(null);

    const closeModal = (newValue) => {
        setShowModal(false);
        if (newValue) {
            setValue(newValue);
        }
    }

    const deleteFieldLocally = () => {
        box.current.style = 'display:none';
    }

    return (
        <>
            <div ref={box} className="box" onClick={() => setShowModal(!showModal)}>
                {value}
            </div>
            {showModal && <Modal originalValue={value} toResponsabilita={toResponsabilita} closeModal={closeModal} index={index} idCard={idCard} deleteFieldLocally={deleteFieldLocally} />}
        </>
    );
}

export default Box;