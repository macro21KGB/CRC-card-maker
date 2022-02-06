import evoLog from "evolog";
import { nanoid } from "nanoid";


/**
 * 
 * @param {string} key 
 * @param {{
 *     id: string,
 *     name: string,
 *     resp: string[],
 *     collab: string[]
 *   }} value 
 */
export const saveToLocalStorage = (key, value) => {

    localStorage.setItem(key, JSON.stringify(value));

}


/**
 * 
 * @param {string} key 
 * @param {string} id 
 */
export const deleteFromLocalStorage = (key, id) => {
    let currentArray = getFromLocalStorage(key) || [];
    const index = currentArray.findIndex(item => item.id === id);
    evoLog(index);
    evoLog(currentArray[0].id);
    if (index > -1) {

        currentArray.splice(index, 1);
    }
    localStorage.setItem(key, JSON.stringify(currentArray));
}

/**
 * 
 * @param {string} key 
 * @returns {Object} cards
 */
export const getFromLocalStorage = (key) => {
    return JSON.parse(localStorage.getItem(key)) || [];
}
