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
    let currentArray = getFromLocalStorage(key) || [];

    //if the value is already in the array, update it
    const index = currentArray.findIndex(item => item.id === value.id);
   evoLog("index: "+ index);
    if (index > -1) {
        currentArray[index] = value;
    } else {
        currentArray.push({ id: nanoid(10), ...value });
    }

    localStorage.setItem(key, JSON.stringify(currentArray));

}


/**
 * 
 * @param {string} key 
 * @param {string} id 
 */
export const deleteFromLocalStorage = (key, id) => {
    let currentArray = getFromLocalStorage(key) || [];
    const index = currentArray.findIndex(item => item.id === id);
    if (index > -1) {
        currentArray.splice(index, 1);
    }
    localStorage.setItem(key, JSON.stringify(currentArray));
}

export const getFromLocalStorage = (key) => {
    return JSON.parse(localStorage.getItem(key)) || [];
}
