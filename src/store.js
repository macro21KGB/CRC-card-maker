import create from 'zustand'
import { saveToLocalStorage } from './utils';

const useStore = create((set, get) => ({
    cards: [],
    addCards: (newCards) => {
        set(_ => ({
            cards: newCards
        }))
        saveToLocalStorage('CRC-cards', newCards);
    },
    getCardsFromLocalStorage: () => {
        set(_ => ({
            cards: JSON.parse(localStorage.getItem('CRC-cards')) || []
        }))
    },

    /**
     * 
     * @param {string} cardId 
     * @param {string} newField 
     * @param {boolean} toResp 
     */
    addNewFieldToCard: (cardId, newField, toResp) => {
        const newCards = get().cards;
        const cardIndex = newCards.findIndex(card => card.id === cardId);

        if (toResp) {
            newCards[cardIndex].resp.push(newField);
        }
        else {
            newCards[cardIndex].collab.push(newField);
        }
        set(_ => ({
            cards: newCards
        }))

        saveToLocalStorage('CRC-cards', newCards);
    },
    updateName: (newName, id) => {
        set(state => ({
            cards: state.cards.map(card => {
                if (card.id === id) {
                    card.name = newName;
                }
                return card;
            })
        }));
        saveToLocalStorage('CRC-cards', get().cards);
    },
    updateField: (newField, idCard, fieldIndex, toResp) => {
        const newCards = get().cards;
        const cardIndex = newCards.findIndex(card => card.id === idCard);

        if (toResp) {
            newCards[cardIndex].resp[fieldIndex] = newField;
        }
        else {
            newCards[cardIndex].collab[fieldIndex] = newField;
        }
        set(_ => ({
            cards: newCards
        }))

        saveToLocalStorage('CRC-cards', newCards);

    },
    deleteField: (idCard, fieldIndex, toResp) => {
        const newCards = get().cards;
        const cardIndex = newCards.findIndex(card => card.id === idCard);

        if (toResp) {
            newCards[cardIndex].resp.splice(fieldIndex, 1);
        }
        else {
            newCards[cardIndex].collab.splice(fieldIndex, 1);
        }

        set(_ => ({
            cards: newCards
        }))
        saveToLocalStorage('CRC-cards', newCards);
    },
    deleteCard: (idCard) => {
        set(state => ({
            cards: state.cards.filter(card => card.id !== idCard)
        }));
        saveToLocalStorage('CRC-cards', get().cards);
    },
}))

export default useStore;