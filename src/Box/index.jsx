import { useState } from 'react';
import './main.css';

const Box = ({ message, index, updateBox }) => {

    const [messageBox, setMessageBox] = useState(message);

    const handleChange = (updatedValue) => {
        updateBox(updatedValue, index);
        setMessageBox(updatedValue);
    }

    return (
        <div className="box">
            <input type="text" value={messageBox} onChange={(e) => { handleChange(e.target.value) }} />
        </div>
    );
}

export default Box;