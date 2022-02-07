import { useEffect, useState } from "react";
import Box from "../Box";
import './main.css';


/**
 * 
 * @param {{saveCard: Function, toResponsabilites: boolean}} params 
 * @returns 
 */
const InputBox = ({ saveCard, toResponsabilites }) => {

    const [input, setInput] = useState("");

    /**
     * 
     * @param {Event} e 
     * @returns 
     */
    const handleSubmit = (e) => {
        e.preventDefault();
        if (input === "") return;
        saveCard(input, toResponsabilites);
        setInput("")
    }


    return (
        <div className="InputBox">
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder={`Aggiungi ${toResponsabilites ? 'Responsabilità' : 'Collaboratori'}`} onInput={(e) => setInput(e.target.value)} value={input} />
                <input type="submit" value="+" />
            </form>
        </div>
    );
}

export default InputBox;